import { Box, Center, Text, View,  } from "native-base";
import {StyleSheet} from "react-native"
import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function NSafePage() {
  return (
    // <Box bg="primary.400" p="12" rounded="lg">
    //   <Center>
    //     <Text>NSafe tracking location, pair with watch</Text>
    //     <MapView
    //       style={{ flex: 1 }}
    //       provider={PROVIDER_GOOGLE}
    //       showsUserLocation
    //       initialRegion={{
    //         latitude: 37.78825,
    //         longitude: -122.4324,
    //         latitudeDelta: 0.0922,
    //         longitudeDelta: 0.0421,
    //       }}
    //     />
    //   </Center>
    // </Box>
    <View style={style.body}>
      <MapView
        style={style.map}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  body: {
    flex: 1,
    alighItems: "center",
  },
  text: {
    fontSize: 40,
    margin: 10,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
