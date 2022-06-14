import { Box, Button, Icon, Text } from "native-base";
import React from "react";
import HomeCard from "../UI/HomeCard";
import Fontisto from "react-native-vector-icons/Fontisto";

export default function VitalsCard({ navigation }) {
  return (
    <HomeCard
      icon={
        <Icon as={Fontisto} color={"red.600"} size={50} name="heartbeat-alt" />
      }
      title="Vitals"
    >
      <Text color={"muted.400"}>Check Vitals</Text>
      <Button onPress={() => navigation.navigate("Vitals")} bg={"blueGray.700"}>
        <Icon as={Fontisto} color={"white"} size={"md"} name="arrow-right" />
      </Button>
      <Box
        bg={"success.500"}
        borderRadius={"xl"}
        mt={"3"}
        p={4}
        flexDir={"row"}
        alignItems={"center"}
      >
        <Icon as={Fontisto} color={"red.600"} size={"md"} name="heart" />
        <Text fontSize={"lg"} fontFamily={"Poppins"} color="white" ml="3">
          {" "}
          Status: HEALTHY
        </Text>
      </Box>
    </HomeCard>
  );
}
