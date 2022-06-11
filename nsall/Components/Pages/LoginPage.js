import { Image, Button, Box, Input } from "native-base";
import { StyleSheet, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import Logo from "../../assets/NSALLlogo.png";

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { height } = useWindowDimensions();
  const handleLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Interface" }],
    });
  };
  return (
    <Box style={styles.root}>
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
