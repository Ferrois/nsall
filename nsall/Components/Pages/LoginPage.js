import { Box, Button, Icon, Input, Stack, Text } from "native-base";
import React from "react";

export default function LoginPage({ navigation }) {
  function handleLogin() {
    // Sets the current Stack to Interface, so that user cannot press the android back thing to back into login
    navigation.reset({
      index: 0,
      routes: [{ name: "Interface" }],
    });
  }
  const [show, setShow] = React.useState(false);
  return (
    <Box safeArea>
      <Stack space={4} w="100%" alignItems="center">
        <Input
          w={{
            base: "75%",
            md: "25%",
          }}
          InputLeftElement={
            <Icon
              // as={<MaterialIcons name="person" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="Name"
        />
        <Input
          w={{
            base: "75%",
            md: "25%",
          }}
          type={show ? "text" : "password"}
          InputRightElement={
            <Icon
              // as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
              size={5}
              mr="2"
              color="muted.400"
              onPress={() => setShow(!show)}
            />
          }
          placeholder="Password"
        />
        <Box>
          <Text color={"red.500"}>Login page</Text>
          <Button onPress={() => handleLogin()}>
            <Text>Bring you to app interface</Text>
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
