import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Icon,
  ScrollView,
  Text,
  View,
} from "native-base";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import {  StyleSheet } from "react-native";
import OpenURLButton from "../../UI/OpenURLButton";

const videoArr = [
  {
    id: "Gun",
    desc: "How to use gun",
    link: "https://www.youtube.com/watch?v=cBb_eDYzTSA",
  },
  {
    id: "Compass",
    desc: "How to use compass",
    link: "https://www.youtube.com/watch?v=0cF0ovA3FtY",
  },
  {
    id: "Survival Skills",
    desc: "Wild life survival skills",
    link: "https://www.youtube.com/watch?v=fZndJO2jUJk",
  },
];

export default function VideosPage({ navigation }) {
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
        <ScrollView w="100%">
          <Center mb={"20"}>
            <Text
              color={"white"}
              fontFamily="Poppins"
              fontSize={"5xl"}
              mb="3"
              mt="10"
            >
              Videos
            </Text>
          </Center>
        </ScrollView>
      </Center>
      <View style={styles.container}>
        {/* <OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton> */}
        {/* <OpenURLButton url={unsupportedURL}>Open Unsupported URL</OpenURLButton> */}
        <Box p={4} rounded={"2xl"} bg={"gray.100"} mx={"5"}>
          <HStack
            mb={2}
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"3/4"}
          >
            <Button
              bg={"gray.100"}
              onPress={() => {
                navigation.navigate("MorePage");
              }}
            >
              <Icon as={AntDesign} name="back" size={"4xl"} color="black" />
            </Button>
            <Text fontSize={"2xl"} fontFamily={"Poppins"}>
              Learning Materials
            </Text>
          </HStack>
          <Divider />
          {videoArr.map(({ id, link, desc }) => {
            return (
              <OpenURLButton
                key={id}
                url={link}
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
                  <Text color="black" ml={"5"} w="100%">
                    {id}
                  </Text>
                  <Icon
                    as={AntDesign}
                    name="right"
                    size={5}
                    marginRight={"1"}
                    color="black"
                  />
                </HStack>
              </OpenURLButton>
            );
          })}
        </Box>
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  // container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
