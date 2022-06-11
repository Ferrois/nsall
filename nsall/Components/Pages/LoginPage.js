import { Image, Button, Box, Input, Text } from "native-base";
import { StyleSheet, useWindowDimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/NSALLlogo.png";
import { socket } from "../../Helpers/socket";
import { StoreContext } from "../../Store/StoreContext";

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { height } = useWindowDimensions();

  const { storeCtx } = useContext(StoreContext);
  const [store, setStore] = storeCtx;
  const [wrong, setWrong] = useState(false);

  const handleLogin = () => {
    socket.emit("login", { username, password });
  };
  const handleWrong = () => {
    setWrong(true);
  };
  useEffect(() => {
    socket.on("login-return", ({ status_, userInfo }) => {
      if (status_ == "S") {
        setStore({ ...store, userInfo });
        navigation.reset({
          index: 0,
          routes: [{ name: "Interface" }],
        });
        return
      }
      console.log("wrong")
      handleWrong()
    });
  },[]);

  return (
    <Box style={styles.root} safeArea justifyContent={"center"}>
      <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.2 }]}
        resizeMode="contain"
        alt="logo"
      />
      <Input
        placeholder="Username"
        value={username}
        setValue={setUsername}
        mt={2}
      />
      <Input
        placeholder="Password"
        value={password}
        setValue={setPassword}
        mt={2}
      />
      {wrong && <Text color={"red.600"}>Wrong Username/Password</Text>}
      <Button
        onPress={() => {
          handleLogin();
        }}
        mt={2}
      >
        Navigate into app
      </Button>
    </Box>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "80%",
    borderRadius: 10,
  },
});
export default LoginPage;
