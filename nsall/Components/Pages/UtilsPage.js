import { Box, Button, Center, Text } from "native-base";
import React, { useContext } from "react";
import { StoreContext } from "../../Store/StoreContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { socket } from "../../Helpers/socket";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MorePage from "./MoreComps/MorePage";

const Stack = createNativeStackNavigator();

export default function UtilsPage() {
  const { storeCtx, themeCtx} = useContext(StoreContext);
  const [store,setStore] = storeCtx;
  const [theme, setTheme]= themeCtx;
  return (
    // <>
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="MorePage"
          component={MorePage}
          options={{ headerShown: false }}
          bg={{
            linearGradient: {
              colors: ["emerald.500", "cyan.400"],
              start: [0.8, 0],
              end: [0.2, 0.9],
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
