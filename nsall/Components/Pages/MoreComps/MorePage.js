import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  ScrollView,
  Text,
} from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import React from "react";

const moreData = [
  {
    id: 1,
    directory: "Emart",
    title: "eMart",
  },
  {
    id: 2,
    directory: "Videos",
    title: "Videos",
  },
  // {
  //   id: 3,
  //   directory: "Tips",
  //   title: "Tips",
  // },
];

export default function MorePage({ navigation }) {
  const handleNav = (directory) => {
    navigation.navigate(directory);
  };
  return (
    <Box
      flex={"1"}
      bg={{
        linearGradient: {
          colors: ["emerald.500", "cyan.400"],
          start: [0.8, 0],
          end: [0.2, 0.9],
        },
      }}
    >
      <Center>
          <Center mb={"20"}>
            <Text
              color={"white"}
              fontFamily="Poppins"
              fontSize={"5xl"}
              mb="3"
              mt="10"
            >
              More
            </Text>
          </Center>
      </Center>

      <Box p={4} rounded={"2xl"} bg={"gray.100"} mx={"5"}>
        {/* <Center> */}
          {moreData.map(({ id, directory, title }) => {
            return (
              <Button
                key={id}
                onPress={() => handleNav(directory)}
                bg={"gray.100"}
                borderWidth={"1"}
                borderColor={"gray.300"}
                w={"100%"}
                justifyContent="space-between"
                flexDirection={"row"}
              >
                <HStack
                  mb={2}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  w={"80%"}
                >
                <Text color="black" ml={"5"} w="100%" fontSize={"lg"}>
                  {title}
                </Text>
                <Icon
                  as={AntDesign}
                  name="right"
                  size={5}
                  marginRight={"1"}
                  color="black"
                />
                </HStack>
              </Button>
            );
          })}
        {/* </Center> */}
      </Box>
    </Box>
  );
}
