import React, { useContext } from "react";
import { StoreContext } from "../../Store/StoreContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MorePage from "./MoreComps/MorePage";
import VideosPage from "./MoreComps/VideosPage";
import EmartPage from "./MoreComps/EmartPage";
import TipsPage from "./MoreComps/TipsPage";

const Stack = createNativeStackNavigator();

export default function UtilsPage() {
  return (
    // <>
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="MorePage"
          component={MorePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Videos"
          component={VideosPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Emart"
          component={EmartPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tips"
          component={TipsPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
