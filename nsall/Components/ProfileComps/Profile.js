import { Box, Center, HStack, Image, Text } from "native-base";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Profile() {
  return (
    <Box
      flex={1}
      safeArea
      bg={{
        linearGradient: {
          colors: ["red.600", "orange.400"],
          start: [1, 0.3],
          end: [0, 0],
        },
      }}
    >
      {/* <ScrollView> */}
      <Center flex={1}>
        <Animated.View entering={FadeInDown}>
          <Center>
            <Text fontSize={"3xl"} mb="4" fontFamily={"Poppins"} color="white">
              Profile
            </Text>
            <Image
              size={120}
              resizeMode={"contain"}
              borderRadius={100}
              source={{
                uri: "https://wallpaperaccess.com/full/317501.jpg",
              }}
              alt="Alternate Text"
            />
            <Text fontSize={"xl"} color="white" fontFamily={"Poppins"}>
              Tan Fook Yu
            </Text>
          </Center>
        </Animated.View>
        <Animated.View entering={FadeInDown} style={{ flex: 1, width: "100%" }}>
          <Box
            bg={"light.100"}
            w="100%"
            mt="2"
            flex={1}
            borderTopRadius="xl"
            p="2"
          >
            <HStack>
              <Text>put some info here like his ethnic or name </Text>
            </HStack>
          </Box>
        </Animated.View>
      </Center>
      {/* </ScrollView> */}
    </Box>
  );
}
