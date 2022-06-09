<<<<<<< HEAD
import { Box, Card, VStack } from "native-base";
=======
import { Card} from "native-base";
>>>>>>> 7f84ffe477c8246dc29149c7ca7e27d3dfa61514
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
        <Box>{props.icon || null}</Box>
        {props.children}
      </VStack>
    </Box>
  );
}
