import { useEffect, useMemo, useRef, useState } from 'react';
import { init, Geolocation, setInterval, Location, setDesiredAccuracy } from 'react-native-amap-geolocation';
import { View, PermissionsAndroid, Image, StatusBar, Platform, ActivityIndicator, StyleSheet, Text, Pressable, SafeAreaView, useWindowDimensions } from 'react-native';

/**
 * 
 * @param {*} start => boolean
 * @param {*} configs => {
 *      hasPermission:boolean
 *      usePermission:boolean
 *      interval: number
 *      accuracy: number
 *      key: string
 *      onSdkInitialized: () => void
 * }
 */
function isNil(object) {
    return object == undefined || object == null
}
function safeObjectGet(object, key, defaultValue){
    if (isNil(object)) return defaultValue
    if (isNil(object[key])) return defaultValue
    return object[key]
}
export async function checkAndRequestPermission(){
    return Promise.all([
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            .then(granted => {
                if (!granted) throw new Error("fine location permission missed")
            }),
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
            .then(granted => {
                if (!granted) throw new Error("coarse location permission missed")
            })
    ]).then(rs => {
        return true
    }).catch(e => {
        return PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]).then(re => {
            return (re['android.permission.ACCESS_FINE_LOCATION'] == 'granted' && re['android.permission.ACCESS_COARSE_LOCATION'] == 'granted')
        }).catch(e => {
            return false
        })
    })
}
function useGeoLocation(start, configs) {

    const usePermission = useMemo(() => safeObjectGet(configs, 'usePermission', true), [configs])
    const hasPermission = useMemo(() => safeObjectGet(configs, 'hasPermission', false), [configs])
    const apikey = useMemo(() => safeObjectGet(configs, 'key', ''), [configs])
    const interval = useMemo(() => safeObjectGet(configs, 'interval', 1000), [configs])
    const accuracy = useMemo(() => safeObjectGet(configs, 'accuracy', 1), [configs])
    const [permissionGranted, setPermissionGranted] = useState(hasPermission)
    const [sdkInitialized, setSdkInitialized] = useState(false)
    const errorValue = useRef(null)
    const [error, _setError] = useState(null)
    const setError = (v) => {
        _setError(v)
        errorValue.current = v
    }
    const [location, setLocation] = useState(null)

    /**
     * init sdk
     */
    useEffect(() => {
        if (apikey != '') {
            init(apikey).then(v => {
                setSdkInitialized(true)
                if(typeof configs == 'object' && !isNil(configs.onSdkInitialized)){
                    configs.onSdkInitialized()
                }
            }).catch(e => {
                setError(e)
            })
        }
    }, [])

    /**
     * auto request location-permission when the property usePermission is 'true'
     */
    async function getPermission() {
        let p = await checkAndRequestPermission()
        setPermissionGranted(p)
    }
    useEffect(() => {
        if (usePermission) {
            getPermission()
        }
    }, [usePermission])

    useEffect(() => {
        let id;
        if (start && permissionGranted && sdkInitialized) {
            id = Geolocation.watchPosition(
                (position) => {
                    if (position.location) {
                        setLocation(position.location)
                        if (isNil(errorValue.current)) {
                            setError(null)
                        }
                    }
                },
                (error) => {
                    setError(error)
                }
            )
        }
        return () => {
            if (id != undefined) Geolocation.clearWatch(id)
        }
    }, [start, permissionGranted, sdkInitialized])

    return { location, error }
}
export default useGeoLocation