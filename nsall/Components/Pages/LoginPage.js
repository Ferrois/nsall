import { Text, View } from "react-native";
import React from "react";
import { Button } from "native-base";

export default function LoginPage({ navigation }) {
  function handleLogin(){
    // Sets the current Stack to Interface, so that user cannot press the android back thing to back into login
    navigation.reset({
      index: 0,
      routes: [{ name: "Interface" }],
    });
  }
  return (
    <View>
      <Text>Login page</Text>
      <Button
        onPress={()=>handleLogin()}
      >
        <Text>Bring you to app interface</Text>
      </Button>
    </View>
  );
}
