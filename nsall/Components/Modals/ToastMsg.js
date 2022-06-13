import { Box, HStack, Text, VStack } from "native-base";
import React from "react";

export default function ToastMsg({ title, desc, stat }) {
  return (
    <Box
      bg={stat == "S" ? "teal.500:alpha.80" : stat == "F" ? "danger.600:alpha.80" : "dark.100:alpha.80"}
      px="2"
      py="1"
      rounded="md"
      mb={0}
      mx={"1"}
      minW={"xs"}
      shadow={"5"}
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
