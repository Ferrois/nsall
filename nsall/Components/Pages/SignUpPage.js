import {
  Box,
  Button,
  Center,
  Input,
  Select,
  Text,
  useToast,
  VStack,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { socket } from "../../Helpers/socket";
import { StoreContext } from "../../Store/StoreContext";
import ToastMsg from "../Modals/ToastMsg";

export default function SignUpPage({ navigation }) {
  const { storeCtx } = useContext(StoreContext);
  const [store, setStore] = storeCtx;
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nric, setNRIC] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [group, setGroup] = useState("1");
  const toast = useToast();
  const sendToast = (desc) => {
    toast.show({
      render: () => (
        <ToastMsg title={"Missing Information!"} desc={desc} stat="F" />
      ),
      placement: "top",
    });
  };
  const handleSignUp = () => {
    if (name == "") return sendToast("You need a name!");
    if (username == "") return sendToast("You need a username!");
    if (password.length < 6)
      return sendToast("Your password has to be 6 or more characters!");
    if (nric == "") return sendToast("You need a nric!");
    if (ethnicity == "") return sendToast("You need a ethnicity!");
    if (group=="") return sendToast("You need a group!")
    socket.emit("signup", { name_: name, username, password, nric, ethnicity,group });
  };
  useEffect(() => {
    socket.on("signup-return", ({ status_, userInfo }) => {
      if (status_ == "F") return sendToast("There was an error in the system.");
      if (status_ == "S") {
        setStore({ ...store, userInfo });
        toast.show({
          render: () => (
            <ToastMsg
              title={"Success!"}
              desc={"Registerred as " + userInfo.name + "!"}
              stat={"S"}
            />
          ),
          placement: "bottom",
        });
        navigation.reset({
          index: 0,
          routes: [{ name: "Interface" }],
        });
      }
    });
  });
  return (
    <Box safeArea flex={1} justifyContent={"center"}>
      <Center>
        <Text fontSize={"3xl"} pb={"10"}>
          Sign Up
        </Text>

        <VStack w={"3/4"}>
          <Input
            placeholder="Name"
            value={name}
            onChangeText={(value) => setName(value)}
            mt={2}
          />
          <Input
            placeholder="Username"
            value={username}
            onChangeText={(value) => setUsername(value)}
            mt={2}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            mt={2}
          />
          <Input
            placeholder="NRIC"
            value={nric}
            onChangeText={(value) => setNRIC(value)}
            mt={2}
          />
          <Input
            placeholder="Ethnicity"
            value={ethnicity}
            onChangeText={(value) => setEthnicity(value)}
            mt={2}
          />
          
          <Text mt={1}>Group Number</Text>
          <Select
            selectedValue={group}
            minWidth="200"
            placeholder="Group"
            _selectedItem={{
              bg: "teal.600",
            }}
            
            onValueChange={(itemValue) => setGroup(itemValue)}
          >
            <Select.Item label="1" value="1" />
            <Select.Item label="2" value="2" />
            <Select.Item label="3" value="3" />
          </Select>
          <Button onPress={handleSignUp} mt={2}>
            Sign Up
          </Button>
        </VStack>
      </Center>
    </Box>
  );
}
