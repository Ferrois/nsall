import {
  AspectRatio,
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Text,
  Toast,
} from "native-base";
import { PermissionsAndroid, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, UrlTile } from "react-native-maps";
import ToastMsg from "../Modals/ToastMsg";
import * as Location from "expo-location";
import { StoreContext } from "../../Store/StoreContext";
import { socket } from "../../Helpers/socket";
import AntDesign from "react-native-vector-icons/AntDesign";
import NSafeUserModal from "../Modals/NSafeUserModal";

export default function NSafePage() {
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);

  const [active, setActive] = useState(false);

  const { storeCtx } = useContext(StoreContext);
  const [store, setStore] = storeCtx;

  const sendToast = ({ title, desc, stat }) => {
    Toast.show({
      render: () => <ToastMsg title={title} desc={desc} stat={stat} />,
      placement: "top",
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenModal = (userIdd) => {
    setUserId(userIdd);
    setShowModal(true);
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
              "NSafe needs your permission for using your location to use its services!",
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
    requestLocationPermissions();
    socket.on("location-return", ({ userInfo }) => {
      setStore({ ...store, userInfo });
    });
    return () => {
      socket.off("location-return");
    };
  }, []);
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
        initialRegion={{
          latitude: store.userInfo.loc.lastLoc.lat || 1.35,
          longitude: store.userInfo.loc.lastLoc.lng || 103.8,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <UrlTile
          urlTemplate={"http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"}
          maximumZ={19}
          flipY={false}
        />
        <MarkersView
          storeCtx={storeCtx}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
        />
      </MapView>
      <Box
        flex={0.25}
        bg={"light.100"}
        borderTopColor={"violet.100"}
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
      <NSafeUserModal id={userId} showModal={showModal} handleCloseModal={handleCloseModal}/>
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

function MarkersView({ storeCtx, handleCloseModal, handleOpenModal }) {
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
      setStore({ ...store, groupLoc: locArrRes });
    });
    return () => socket.off("ping-loc-return");
  }, []);

  return (
    <>
      {locArr &&
        locArr.map(({ id, loc, name }) => {
          return (
            <Marker
              key={id}
              coordinate={{
                latitude: loc.lastLoc.lat || 0,
                longitude: loc.lastLoc.lng || 0,
              }}
              onPress={()=>handleOpenModal(id)}
            >
              <Box bg={"red.600:alpha.80"} borderRadius={"md"}>
                <HStack alignItems={"center"}>
                  <Text color={"white"}> {name} </Text>
                  <Icon
                    as={AntDesign}
                    color={"blueGray.200"}
                    name="user"
                    size="4"
                  />
                  <Text> </Text>
                </HStack>
              </Box>
            </Marker>
          );
          // <></>
        })}
    </>
  );
}
