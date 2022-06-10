import { Box, Card, HStack, Text, VStack } from "native-base";
import React from "react";

export default function HomeCard(props) {
  return (
    <Box
      width="90%"
      bg={"light.100"}
      marginTop="4"
      shadow="5"
      minH={"48"}
      rounded="2xl"
      padding={"3"}
      maxWidth={"lg"}
    >
      <VStack>
        <HStack alignItems={"center"}>
          {props.icon || null}
          <Text marginLeft={"2"} fontSize={"2xl"} fontFamily={"Poppins"}>{props.title}</Text>
        </HStack>
        {props.children}
      </VStack>
    </Box>
  );
}
