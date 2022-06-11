import { Box, Center, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import React from "react";
import MapView, { UrlTile } from "react-native-maps";

export default function NSafePage() {
  return (
    <View style={style.body}>
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
