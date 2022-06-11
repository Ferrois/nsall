import { Box, Center, Text } from "native-base";
import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function NSafePage() {
  return (
    <Box bg="primary.400" p="12" rounded="lg">
      <Center>
        <Text>NSafe tracking location, pair with watch</Text>
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </Center>
    </Box>
  );
}
