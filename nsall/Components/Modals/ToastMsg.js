import { Box, HStack, Text, VStack } from "native-base";
import React from "react";

export default function ToastMsg({ title, desc, stat }) {
  return (
    <Box
      bg={stat == "S" ? "emerald.400" : stat == "F" ? "danger.500" : "dark.200"}
      px="2"
      py="1"
      rounded="sm"
      mb={1}
      minW={"sm"}
      shadow={"9"}
    >
      <VStack>
        <Text fontSize={"xl"} color={"white"}>
          {title}
        </Text>
        <Text fontSize={"lg"} color={"light.100"}>
          {desc}
        </Text>
      </VStack>
    </Box>
  );
}
