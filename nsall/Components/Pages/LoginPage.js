import { Image, Button, Box, Input, Text, ScrollView } from "native-base";
import { StyleSheet, useWindowDimensions, Pressable } from "react-native";
import React, { useState } from "react";
import Logo from "../../assets/NSALLlogo.png";

const LoginPage = ({ navigation, onPress }) => {
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
    <ScrollView showsVerticalScrollIndicator={false}> 
      <Box style={styles.root} safearea justifyContent={"center"}>
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
          secureTextEntry={true}
          mt={2}
        />
        <Button onPress={onPress} style={styles.button1}>
          <Text style={styles.text1}>Log In</Text>
        </Button>

        <Button style={styles.button2} onPress={onPress}>
          <Text style={styles.text}>Forget password?</Text>
        </Button>

        <Button style={styles.button3} onPress={onPress}>
          <Text style={styles.text3}>Sign in with google</Text>
        </Button>

        <Button style={styles.button4} onPress={onPress}>
          <Text style={styles.text4}>Sign in with facebook</Text>
        </Button>

        <Button style={styles.button2} onPress={onPress}>
          <Text style={styles.text5}>Create an account</Text>
        </Button>

        <Button
          onPress={() => {
            handleLogin();
          }}
          mt={2}
        >
          Navigate into app
        </Button>
      </Box>
    </ScrollView>
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
  button1: {
    backgroundColor: "#3B71F3",
    width: "60%",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  button2: {
    backgroundColor: "#F9FBFC",
    width: "60%",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  button3: {
    backgroundColor: "#FAE9EA",
    width: "60%",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  button4: {
    backgroundColor: "#E7EAF4",
    width: "60%",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },

  text1: {
    fontWeight: "bold",
    color: "white",
  },
  text2: {
    fontWeight: "bold",
    color: "grey",
  },
  text3: {
    fontWeight: "bold",
    color: "#DD4D44",
  },
  text4: {
    fontWeight: "bold",
    color: "#4765A9",
  },
  text5: {
    fontWeight: "bold",
    color: "black",
  },
});
export default LoginPage;
