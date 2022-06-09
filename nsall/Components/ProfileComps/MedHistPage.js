import { Box, Center, ScrollView, Text } from "native-base";
import React from "react";

export default function MedHistPage() {
  return (
    <Box flex={1} safeArea>
      <ScrollView>
        <Center>
          <Text fontSize={"3xl"}>Medical History</Text>
        </Center>
      </ScrollView>
    </Box>
  );
}