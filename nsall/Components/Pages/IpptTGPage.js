import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Icon,
  Slider,
  Text,
  useToast,
  VStack,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { socket } from "../../Helpers/socket";
import { StoreContext } from "../../Store/StoreContext";
import ToastMsg from "../Modals/ToastMsg";

export default function IpptTGPage({navigation}) {
  const { storeCtx } = useContext(StoreContext);
  const [store, setStore] = storeCtx;

  const [target, setTarget] = useState(store.userInfo.ippt.goal);
  const [isSaved, setIsSaved] = useState(true);

  const toast = useToast();

  const sendToast = ({ title, desc, stat }) => {
    toast.show({
      render: () => <ToastMsg title={title} desc={desc} stat={stat} />,
      placement: "top",
    });
  };

  const handleChange = (value) => {
    setIsSaved(false);
    setTarget(value);
  };

  const handleSave = () => {
    if (isSaved == true) return;
    socket.emit("goal-change", { id: store.userInfo.id, goal: target });
  };

  useEffect(() => {
    socket.on("goal-change-return", ({ status_, userInfo }) => {
      if (status_ == "S") {
        setIsSaved(false)
        sendToast({
          title: "Successfully Saved!",
          desc: "Your Target Has Been Set! Good luck",
          stat: "S",
        });
        setStore({ ...store, userInfo });
      }
      if (status_ == "F") {
        sendToast({
          title: "Internal Server Error",
          desc: "Your Target Has Not Been Set!",
          stat: "F",
        });
      }
    });
    return(()=>socket.off("goal-change-return"))
  }, []);

  return (
    <Box safeArea flex={1} justifyContent={"center"} bg={{
      linearGradient: {
        colors: ["emerald.500", "cyan.400"],
        start: [0.8, 0],
        end: [0.2, 0.9],
      },
    }}>
      <Box p={4} rounded={"2xl"} bg={"gray.100"} mx={5}>
        <Center>
          <HStack mb={2} alignItems={"center"} justifyContent={"space-between"} w={"3/4"}>
            <Button bg={"gray.100"} onPress={()=>{navigation.navigate("HomePage")}} >
              <Icon
                as={AntDesign}
                name="back"
                size={"4xl"}
                color="black"
              /></Button>
          <Text fontSize={"2xl"} fontFamily={"Poppins"}>Target Setting</Text>
          </HStack>
          <Divider/>
          <Text fontSize={"2xl"} mb={5} mt={2} fontFamily={"Poppins"} fontWeight={'bold'}>
            Current Target: {store.userInfo.ippt.goal}
          </Text>
          <VStack w={"3/4"}>
            <Text fontSize={"xl"}>Target:{target}</Text>
            <Slider
              w={"full"}
              defaultValue={target}
              minValue={0}
              maxValue={100}
              onValueChange={handleChange}
              onChange={handleChange}
              size="md"
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
            <Button
              onPress={() => {
                handleSave();
              }}
              mt={3}
            >
              Save
            </Button>
          </VStack>
        </Center>
      </Box>
    </Box>
  );
}
