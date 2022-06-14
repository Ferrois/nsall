import {
  AspectRatio,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StoreContext } from "../../Store/StoreContext";
import AntDesign from "react-native-vector-icons/AntDesign";
import MedModal from "../Modals/MedModal";
import { socket } from "../../Helpers/socket";
import ToastMsg from "../Modals/ToastMsg";
import returnSeverityColor from "../../Helpers/returnSeverityColor";

export default function Profile({ navigation }) {
  const { storeCtx } = useContext(StoreContext);
  const [store, setStore] = storeCtx;
  const toast = useToast();

  const [showModal, setShowModal] = useState(false);
  const sendToast = ({ title, desc, stat }) => {
    toast.show({
      render: () => <ToastMsg title={title} desc={desc} stat={stat} />,
      placement: "top",
    });
  };
  const handleAddMed = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    socket.on("addmedinfo-return", ({ status_,userInfo }) => {
      if (status_ == "S") {
        sendToast({ title: "Successful!", desc: "Added disease", stat: "S" });
        setStore({...store,userInfo:userInfo});
        setShowModal(false)
        return
      }
      sendToast({ title: "Failure!", desc: "System failed to add disease", stat: "F" });
    });
  });
  const handleSignOut=()=>{
    setStore({...store,signedIn:false})
  }

  return (
    <>
      <ScrollView>
        <Box
          mb={"10"}
          flex={1}
          safeArea
          bg={{
            linearGradient: {
              colors: ["emerald.500", "cyan.400"],
              start: [0.8, 0],
              end: [0.2, 0.9],
            },
          }}
        >
          {/* <ScrollView> */}
          <Center flex={1}>
            <Animated.View entering={FadeInDown}>
              <Center>
                <Text
                  fontSize={"40"}
                  mb="4"
                  fontFamily={"Poppins"}
                  color="white"
                >
                  Profile
                </Text>
                <Image
                  size={120}
                  resizeMode={"contain"}
                  borderRadius={100}
                  source={{
                    uri: "https://wallpaperaccess.com/full/317501.jpg",
                  }}
                  alt="Profile Picture"
                />
                <Box alignItems={"center"} mt={2}>
                  <Box py={1} px={4} rounded={"xl"} bg={"gray.100:alpha.80"} alignItems={"center"}>
                <Text fontSize={"30"} fontWeight={"bold"} color="darkBlue.900" fontFamily={"Poppins"}>
                  {store.userInfo.name}
                  </Text>
                  <Text fontSize={"md"} fontWeight={"bold"} color="darkBlue.900" fontFamily={"Poppins"}>
                  Ethinicity: {store.userInfo.ethnicity}
                </Text>
                <Text fontSize={"md"} fontWeight={"bold"} color="darkBlue.900" fontFamily={"Poppins"}>
                  NRIC: {store.userInfo.nric}
                </Text></Box>
                </Box>
              </Center>
            </Animated.View>
            <Animated.View
              entering={FadeInDown}
              style={{ flex: 1, width: "100%" }}
            >
              <Box
                bg={"dark.900"}
                w="100%"
                mt="2"
                flex={1}
                borderTopRadius="xl"
                p="2"
              >
                <VStack>
                  <HStack space={"2"}>
                    <AspectRatio ratio={2.5} flex={0.5}>
                      <Button
                        onPress={() => navigation.navigate("Settings")}
                        bg={"dark.300"}
                        flex={1}
                      >
                        <Icon
                          as={Ionicons}
                          name="settings-outline"
                          size={50}
                          color={"white"}
                        />
                      </Button>
                    </AspectRatio>
                    <AspectRatio ratio={2.5} flex={0.5}>
                      <Button
                        onPress={() => handleSignOut()}
                        bg={"dark.300"}
                        flex={1}
                      >
                        <Icon
                          as={Ionicons}
                          name="log-out-outline"
                          size={50}
                          color={"white"}
                        />
                      </Button>
                    </AspectRatio>
                  </HStack>
                  <Box
                    bg={{
                      linearGradient: {
                        colors: ["emerald.500", "cyan.400"],
                        start: [0.8, 0],
                        end: [0.2, 0.9],
                      },
                    }}
                    rounded={"2xl"}
                    p="1"
                    mt={"2"}
                    shadow={"9"}
                    mb={"12"}
                  >
                    <HStack justifyContent={"space-between"}>
                      <Text
                        color={"darkBlue.900"}
                        fontSize={"2xl"}
                        fontWeight={"bold"}
                        fontFamily="Poppins"
                        marginLeft={"3"}
                      >
                        Medical History
                      </Text>
                      <AspectRatio ratio={1}>
                        <Button
                          borderRadius={"2xl"}
                          bg={"dark.300"}
                          onPress={() => handleAddMed()}
                          p={"2"}
                        >
                          <Icon
                            as={AntDesign}
                            size={10}
                            name="plus"
                            color={"white"}
                          />
                        </Button>
                      </AspectRatio>
                    </HStack>
                    <HStack flexWrap={"wrap"} justifyContent={"center"}>
                      {store.userInfo.medicalHist ? (
                        store.userInfo.medicalHist.map(
                          ({ disease, has, severity }) => {
                            return (
                                <Box
                                  bg={"dark.50:alpha.60"}
                                  m="1"
                                  p="2"
                                  
                                  borderRadius={"xl"}
                                  key={disease}
                                  w={"80%"}
                                >
                                  <Box ml={"4"}>
                                  <Text color={"white"} fontFamily={"Poppins"} fontSize={"25"}>
                                    {disease}
                                  </Text>
                                  <Text color={"white"} fontSize={"18"}>Ongoing: {JSON.stringify(has)}</Text>
                                  <Text color={returnSeverityColor(severity)} fontSize={"18"}>Severity: {severity}</Text>
                               </Box>
                                </Box>
                            );
                          }
                        )
                      ) : (
                        <Text>No Medical History</Text>
                      )}
                    </HStack>
                  </Box>
                </VStack>
              </Box>
            </Animated.View>
          </Center>
          {/* </ScrollView> */}
        </Box>
      </ScrollView>
      <MedModal showModal={showModal} handleCloseModal={handleCloseModal} />
    </>
  );
}
