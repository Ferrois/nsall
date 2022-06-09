import { Box, Card, HStack, Text, VStack } from "native-base";
import React from "react";

export default function HomeCard(props) {
  return (
    <Box
      width={"xs"}
      bg={"light.100"}
      marginTop="1"
      shadow="5"
      minH={"48"}
      rounded="sm"
      padding={"2"}
    >
      <VStack>
        <HStack alignItems={"center"}>
          {props.icon || null}
          <Text marginLeft={"2"} fontSize={"lg"}>{props.title}</Text>
        </HStack>
        {props.children}
      </VStack>
    </Box>
  );
}
