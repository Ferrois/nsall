import {
  Box,
  Button,
  Center,
  Input,
  Text,
  useToast,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { socket } from "../../Helpers/socket";
import ToastMsg from "../Modals/ToastMsg";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nric, setNRIC] = useState("");
  const [ethnicity, setEthnicity] = useState("");
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
    if (password.length < 6) return sendToast("Your password has to be 6 or more characters!");
    if (nric == "") return sendToast("You need a nric!");
    if (ethnicity == "") return sendToast("You need a ethnicity!");
    socket.emit("signup", { name_:name, username, password, nric, ethnicity });
  };
  useEffect(() => {
    socket.on("signup-return", ({ status_, userinfo }) => {});
  });
  return (
    <Box safeArea flex={1} justifyContent={"center"}>
      <Center>
        <Text fontSize={"3xl"} pb={"10"}>Sign Up</Text>

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
          <Button onPress={handleSignUp} mt={2}>Sign Up</Button>
        </VStack>
      </Center>
    </Box>
  );
}
