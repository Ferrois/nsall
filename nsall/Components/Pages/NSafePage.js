import {
  AspectRatio,
  Box,
  Button,
  Center,
  Text,
  useToast,
  View,
} from "native-base";
import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import MapView, { UrlTile } from "react-native-maps";
import ToastMsg from "../Modals/ToastMsg";

export default function NSafePage() {
  const toast = useToast();
  useEffect(()=>{
    
  })
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
          <Text color={"muted.400"}>Toggle Location</Text>
          <AspectRatio ratio={1} w="16" mt="0">
            <Button
              borderRadius={"3xl"}
              bg={"red.600"}
              onPress={() =>
                toast.show({
                  render: ()=><ToastMsg title={"Test"} desc={"Yes"} stat="S" />,
                  placement: "top",
                })
              }
            >
              
            </Button>
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
