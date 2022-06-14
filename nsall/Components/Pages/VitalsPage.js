import { Box, Button, Center, HStack, Icon, Text } from "native-base";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function VitalsPage({ navigation }) {
  return (
    <Box
      safeArea
      flex={1}
      justifyContent={"center"}
      bg={{
        linearGradient: {
          colors: ["emerald.500", "cyan.400"],
          start: [0.8, 0],
          end: [0.2, 0.9],
        },
      }}
    >
      <Box p={4} rounded={"2xl"} bg={"gray.100"} mx={5}>
        <HStack mb={3} alignItems={"center"} w={"100%"}>
          <Button
            onPress={() => {
              navigation.navigate("HomePage");
            }}
            bg={"gray.100"}
          >
            <Icon as={AntDesign} name="back" size={"4xl"} color="black" />
          </Button>
          <Text fontSize={"2xl"} fontFamily={"Poppins"}>
            Vitals Checker
          </Text>
        </HStack>
        <Center>
          <Box
            bg={"success.400"}
            px={5}
            py={3}
            mb={3}
            borderRadius={"lg"}
            w={"100%"}
          >
            <Text fontFamily={"Poppins"} fontSize={"xl"}>
              Watch status: ACTIVE
            </Text>
          </Box>
          <Box
            bg={"blueGray.300"}
            px={5}
            py={3}
            mb={3}
            borderRadius={"lg"}
            w={"100%"}
          >
            <Text fontFamily={"Poppins"} fontSize={"xl"}>
              Heart Rate: 69BPM
            </Text>
          </Box>
          <Box
            bg={"blueGray.300"}
            px={5}
            py={3}
            mb={3}
            borderRadius={"lg"}
            w={"100%"}
          >
            <Text fontFamily={"Poppins"} fontSize={"xl"}>
              Blood Oxygen: 99.7%
            </Text>
          </Box>
          <Box
            bg={"blueGray.300"}
            px={5}
            py={3}
            mb={3}
            borderRadius={"lg"}
            w={"100%"}
          >
            <Text fontFamily={"Poppins"} fontSize={"xl"}>
              Sleep Duration: 6.9hrs
            </Text>
          </Box>
          <Box
            bg={"blueGray.300"}
            px={5}
            py={3}
            mb={3}
            borderRadius={"lg"}
            w={"100%"}
          >
            <Text fontFamily={"Poppins"} fontSize={"xl"}>
              Body Temp: 36.8deg
            </Text>
          </Box>
        </Center>
      </Box>
    </Box>
  );
}
