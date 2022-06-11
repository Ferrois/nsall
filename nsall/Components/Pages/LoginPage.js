import { Text, View, Image, Button } from "native-base";
import { StyleSheet, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import Logo from "../../assets/NSALLlogo.png";
import CustomInput from "./CustomInput";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
const LoginPage = ({navigation}) => {
  const {height} = useWindowDimensions();
  const handleLogin = () => {
    navigation.reset({
      index:0,
      routes: [{ name: 'Interface' }]
    })
  }
  return (
    <Box style={styles.root}>
      <Image
        source={Logo}
        style={[styles.logo,  { height: height * 0.2 }]}
        resizeMode="contain"
        alt="logo"
      />
      <CustomInput placeholder="Username" value={username} setValue={setUsername}/>

      <CustomInput placeholder="Password" value={password} setValue={setPassword}/>
      <Button onPress={()=>{handleLogin()}}>Navigate into app</Button>
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
}
export default LoginPage;
