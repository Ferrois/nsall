import { Box, Button, Center, HStack, ScrollView, Text } from "native-base";
import React from "react";
import OpenURLButton from "../UI/OpenUrlButton";

const data = [
  {
    id: 1,
    title: "XinYan's LinkedIn",
    link: "https://www.linkedin.com/in/li-angel-889848196",
  },
  { id: 2, title: "Ferrois' site", link: "https://ferroiss.com" },
  {
    id: 3,
    title: "Ferrois' LinkedIn",
    link: "https://www.linkedin.com/in/ferrois-thiam-yi-ze-6b4a55241/",
  },
];

export default function DevPage() {
  return (
    <Box safeArea flex={1} justifyContent={"center"} alignItems={"center"}>
      <Center w={"3/4"}>
        <Center>
          <Text fontSize={"md"} pb={3}>
            Hello! We really hope you enjoyed and found meaning in this
            application that we developed. Thank you for taking the time to
            download our app.
          </Text>
        </Center>
        <ScrollView>
          {data.map(({ id, title, link }) => {
            return (
              <HStack
                mt={1}
                key={id}
                alignItems={"center"}
                bg={"blueGray.300"}
                px={3}
                py={2}
                rounded={"lg"}
                justifyContent={"space-between"}
              >
                <Text fontFamily={"Poppins"} fontSize={"lg"} mr={3}>
                  {title}
                </Text>
                <OpenURLButton url={link} bg={"success.600"}>
                  Link
                </OpenURLButton>
              </HStack>
            );
          })}
        </ScrollView>
      </Center>
    </Box>
  );
}
