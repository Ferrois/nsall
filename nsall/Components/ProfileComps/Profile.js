import { Box, Center, ScrollView, Text } from "native-base";
import React from "react";

export default function Profile() {
  return (
    <Box flex={1} safeArea>
      <ScrollView>
        <Center>
          <Text fontSize={"3xl"}>Profile</Text>
        </Center>
      </ScrollView>
    </Box>
  );
}
