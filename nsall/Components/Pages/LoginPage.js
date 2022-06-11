import { Text, View, Image } from "native-base";
import { StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import Logo from "../../assets/SMUreport.png";

const LoginPage = () => {
  const {height} = useWindowDimensions();
  return (
    <View style={styles.root}>
      <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />
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
