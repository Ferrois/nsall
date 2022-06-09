import { Box, Center, ScrollView, Text } from "native-base";
import React from "react";

export default function SettingsPage() {
  return (
    <Box flex={1} safeArea>
      <ScrollView>
        <Center>
          <Text fontSize={"3xl"}>Settings</Text>
        </Center>
      </ScrollView>
    </Box>
  );
}
