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
import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, UrlTile } from "react-native-maps";
import ToastMsg from "../Modals/ToastMsg";
import Geolocation from "react-native-geolocation-service";
import * as Location from "expo-location";
import { StoreContext } from "../../Store/StoreContext";
import { socket } from "../../Helpers/socket";

export default function NSafePage() {
  const toast = useToast();
  // const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [active, setActive] = useState(false);

  const { storeCtx } = useContext(StoreContext);
  const [store, setStore] = storeCtx;

  const sendToast = ({ title, desc, stat }) => {
    toast.show({
      render: () => <ToastMsg title={title} desc={desc} stat={stat} />,
      placement: "top",
    });
  };

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
  async function checkLocation() {
    if (active == false) return;
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    console.log("Grabbing Loc...");
    let locationRes = await Location.getCurrentPositionAsync({});
    socket.emit("location", {
      id: store.userInfo.id,
      lat: locationRes.coords.latitude,
      lng: locationRes.coords.longitude,
      active,
    });
    // setLocation(location);
    console.log("Grabbed");
  }

  const toggleActive = () => {
    if (active) {
      setActive(false);
      sendToast({
        title: "Location Off",
        desc: "You are now not sharing your location",
        stat: "N",
      });
    } else {
      setActive(true);
      sendToast({
        title: "Location On",
        desc: "You are now sharing your location",
        stat: "S",
      });
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      checkLocation();
    }, 8000);
    return () => clearInterval(interval);
  }, [active]);
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
        <MarkersView storeCtx={storeCtx} />
      </MapView>
      <Box
        flex={0.25}
        bg={"light.100"}
        borderTopColor={"violet.300"}
        borderTopWidth={"4"}
      >
        <Center>
          <Text color={"muted.400"}>Toggle Location</Text>
          <AspectRatio ratio={1} w="16" mt="0">
            <Button
              shadow={"9"}
              borderRadius={"3xl"}
              bg={active ? "emerald.600" : "red.600"}
              onPress={() => toggleActive()}
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
    flex: 0.75,
  },
});

function MarkersView({ storeCtx }) {
  const [store, setStore] = storeCtx;
  const [locArr, setLocArr] = useState(null);
  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit("ping-loc", {
        id: store.userInfo.id,
        group: store.userInfo.group,
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    socket.on("ping-loc-return", (locArrRes) => {
      setLocArr(locArrRes);
      setStore({...store,groupLoc:locArrRes})
    });
    return () => socket.off("ping-loc-return");
  }, []);
  return (
    <>
      {locArr &&
        locArr.map(({ id, loc, name }) => {
          // <Marker coordinate={{ latitude: 1.35, longitude: 103.8 }}>
          //   <Text>{JSON.stringify(locObj)}</Text>
          // </Marker>;
          //  coordinate={{latitude:1.35,longitude:103.8}}>
          return (
            <Marker
              key={id}
              coordinate={{
                latitude: loc.lastLoc.lat||0,
                longitude: loc.lastLoc.lng||0,
              }}
            >
              <Box bg={"red.600"} borderRadius={"lg"}>
                <Text color={"white"}>{name}</Text>
              </Box>
            </Marker>
          );
          // <></>
        })}
    </>
  );
}
