import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useContext, useState } from "react";
import { StoreContext } from "../../Store/StoreContext";
import AntDesign from "react-native-vector-icons/AntDesign";
import returnMinsec from "./../../Helpers/returnMinsec.js";
import IpptModal from "../Modals/IpptModal";
import returnHighestScore from "../../Helpers/returnHighestScore";

export default function IpptRecPage({ navigation }) {
  // Local store
  const { storeCtx } = useContext(StoreContext);
  const [store, setStore] = storeCtx;
  const [showModal,setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }

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
        <Center>
          <HStack mb={2} alignItems={"center"} w={"100%"}>
            <Button
              bg={"gray.100"}
              onPress={() => {
                navigation.navigate("HomePage");
              }}
            >
              <Icon as={AntDesign} name="back" size={"4xl"} color="black" />
            </Button>
            <Text fontSize={"2xl"} fontFamily={"Poppins"}>
              IPPT Records
            </Text>
          </HStack>
          <VStack w={"100%"} alignItems={"center"}>
            <Button
              borderRadius={"2xl"}
              bg={"dark.300"}
              onPress={() => handleOpenModal()}
              p={"2"}
              w={"1/2"}
            >
              <Icon as={AntDesign} size={10} name="plus" color={"white"} />
            </Button>
            <Text fontSize={"md"} fontWeight="bold">Highest Score: {returnHighestScore(store.userInfo.ippt.record)}</Text>
            <ScrollView w={"100%"}>
              <Center>
                {store.userInfo.ippt.record.map(
                  ({ date, pushups, situps, run, score,idx }) => {
                    return (
                      <Box
                        justifyContent={"space-between"}
                        key={idx}
                        mt={2}
                        w={"3/4"}
                      >
                        <Flex direction="column">
                          <Box w={"100%"}>
                            <Box
                              alignItems={"center"}
                              overflow="hidden"
                              borderColor="primary.400"
                              borderWidth="2"
                              bg="primary.200"
                            >
                              <Text>
                                {/* {dayDate.toDateString()} */}
                                {new Date(date).toDateString()}
                              </Text>
                            </Box>
                            <Box
                              alignItems={"center"}
                              overflow="hidden"
                              borderColor="primary.400"
                              borderWidth="2"
                              bg="primary.300"
                            >
                              <Text>Pushups: {pushups}</Text>
                            </Box>
                            <Box
                              alignItems={"center"}
                              overflow="hidden"
                              borderColor="primary.400"
                              borderWidth="2"
                              bg="primary.200"
                            >
                              <Text>Situps: {situps}</Text>
                            </Box>
                            <Box
                              alignItems={"center"}
                              overflow="hidden"
                              borderColor="primary.400"
                              borderWidth="2"
                              bg="primary.300"
                            >
                              <Text>
                                2.4km Run: {returnMinsec(run)[0]}``
                                {returnMinsec(run)[1]}`
                              </Text>
                            </Box>
                            <Box
                              alignItems={"center"}
                              overflow="hidden"
                              borderColor="primary.400"
                              borderWidth="2"
                              bg="primary.200"
                            >
                              <Text>
                                Score: {score}
                              </Text>
                            </Box>
                          </Box>
                        </Flex>
                      </Box>
                    );
                  }
                )}
              </Center>
            </ScrollView>
          </VStack>
        </Center>
      </Box>
      <IpptModal handleCloseModal={handleCloseModal} showModal={showModal}/>
    </Box>
  );
}
