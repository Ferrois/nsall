import {
  AspectRatio,
  Box,
  Button,
  Center,
  Text,
  useToast,
  View,
} from "native-base";
import { PermissionsAndroid, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { UrlTile } from "react-native-maps";
import ToastMsg from "../Modals/ToastMsg";
import Geolocation from "react-native-geolocation-service";

export default function NSafePage() {
  const toast = useToast();
  const [loc, setLoc] = useState("");
  const requestLocationPermissions = async () => {
    if (Platform.OS === "ios") {
      // iOS can be asked always, since the OS handles if user already gave permission
      await Geolocation.requestAuthorization("whenInUse");
    } else if (Platform.OS === "android") {
      let permissionCheck = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      // Only asks for permission on Android if not given before
      if (permissionCheck !== true) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission Request",
            message:
              "This app needs you permission for using your location for querying GeoPoints in Parse!",
            buttonPositive: "OK",
          }
        );
      }
    }
  };
  const getLocation = async () => {
    console.log("make sure we have location permission");
    await requestLocationPermissions();
    console.log("about to call for current position");
    Geolocation.getCurrentPosition(
      async (currentPosition) => {
        console.log("in promise callback");
        console.log(
          currentPosition.coords.latitude,
          currentPosition.coords.longitude
        );
        setLoc(
          currentPosition.coords.latitude +
            " " +
            currentPosition.coords.longitude
        );
      },
      (error) => {
        console.log("fdasf");
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10 }
    ).then((res)=> console.log(res));
    console.log("after location call");
    return true;
  };

  // }, []);
  useEffect(() => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ).then((res) => {
      console.log(res);
    });
  }, []);
  // useEffect(async ()=>{
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: "NSafe",
  //         message:
  //           "NSafe needs your location access " +
  //           "so you can use its service.",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK"
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log(granted);
  //     } else {
  //       console.log("Camera permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // },[])
  return (
    <Box flex={1}>
      <MapView
        style={style.map}
        region={{
          latitude: 1.35,
          longitude: 103.8,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <UrlTile
          urlTemplate={"http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"}
          maximumZ={19}
          flipY={false}
        />
      </MapView>
      <Box
        flex={0.15}
        bg={"light.100"}
        borderTopColor={"violet.300"}
        borderTopWidth={"4"}
      >
        <Center>
          <Text>{loc}</Text>
          <Text color={"muted.400"}>Toggle Location</Text>
          <AspectRatio ratio={1} w="16" mt="0">
            <Button
              borderRadius={"3xl"}
              bg={"red.600"}
              onPress={() =>
                // toast.show({
                //   render: () => (
                //     <ToastMsg title={"Test"} desc={"Yes"} stat="S" />
                //   ),
                //   placement: "top",
                // })
                getLocation()
              }
            ></Button>
          </AspectRatio>
        </Center>
      </Box>
    </Box>
  );
}

const style = StyleSheet.create({
  text: {
    fontSize: 40,
    margin: 10,
  },
  map: {
    width: "100%",
    flex: 0.85,
  },
});


