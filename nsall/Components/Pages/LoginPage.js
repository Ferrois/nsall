import { Text, View, Image, Button } from "native-base";
import { StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import Logo from "../../assets/SMUreport.png";

const LoginPage = ({navigation}) => {
  const {height} = useWindowDimensions();
  const handleLogin = () => {
    navigation.reset({
      index:0,
      routes: [{ name: 'Interface' }]
    })
  }
  return (
    <View style={styles.root}>
      <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
        alt="logo"
      />
      <Button onPress={()=>{handleLogin()}}>Navigate into app</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    height: 100,
  },
});
export default LoginPage;
