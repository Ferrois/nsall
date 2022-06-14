import { Box, Button, Center, HStack, Icon, Text } from "native-base";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import OpenURLButton from "../../UI/OpenURLButton";

export default function EmartPage({navigation}) {
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
            eMart information
          </Text>
        </HStack>
        <Center>
          <Box bg={"blueGray.200"} p={2} rounded={"lg"}>
            <Text fontSize={"lg"}>
                Purchases from eMart can be made through the NS Portal, and only eMart credits can be used to make your purchases.
            </Text>
          </Box>
          <Text color={"muted.500"} mt={5}>Go to NSportal for eMart</Text>
          <OpenURLButton url={"https://www.ns.sg/nsp/portal/site/public"} w="100%" >
            <Icon as={AntDesign} name={"shoppingcart"} color={"white"} size={8}/>
          </OpenURLButton>
        </Center>
      </Box>
    </Box>
  );
}
