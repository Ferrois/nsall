import { Text, View, Image, Box } from "native-base";
import { StyleSheet, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import Logo from "../../assets/NSALLlogo.png";
import CustomInput from "./CustomInput";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {height} = useWindowDimensions();
  return (
    <Box style={styles.root}>
      <Image
        source={Logo}
        style={[styles.logo,  { height: height * 0.2 }]}
        resizeMode="contain"
      />
      <CustomInput placeholder="Username" value={username} setValue={setUsername}/>

      <CustomInput placeholder="Password" value={password} setValue={setPassword}/>
    </Box>
  );
};



const styles = StyleSheet.create({
  root: {
    flex : 1,
    backgroundColor: "#F9FBFC",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "80%",
    borderRadius: 10
  },
});
export default LoginPage;
