import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, Text } from "native-base";
import LoginPage from "./Components/Pages/LoginPage.js";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import Anticon from "react-native-vector-icons/AntDesign";
import Feathericon from "react-native-vector-icons/Feather";
import ProfilesPage from "./Components/Pages/ProfilesPage.js";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import useFont from "./Hooks/useFont.js";
import Home from "./Components/Pages/HomePage.js";
import LeavesPage from "./Components/Pages/LeavesPage.js";
import NSafePage from "./Components/Pages/NSafePage.js";
import UtilsPage from "./Components/Pages/UtilsPage.js";
import { io } from "socket.io-client";
import { StoreProvider } from "./Store(Context)/StoreContext.js";

//Socket.io configuration (Websocket connection to the server.)
// export const socket = io("http://192.168.10.145:4000");

//Navigation options
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const showHeaders = true;

//Native Base configuration (themes etc.)
const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};

//Navigators
function HomeInterface() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Leaves"
          component={LeavesPage}
          options={{
            tabBarLabel: "Form",
            tabBarIcon: ({ color, size }) => (
              <Anticon name="form" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="NSafe"
          component={NSafePage}
          options={{
            tabBarLabel: "NSafe",
            tabBarIcon: ({ color, size }) => (
              <Anticon name="form" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Utilities"
          component={UtilsPage}
          options={{
            tabBarLabel: "Utilities",
            tabBarIcon: ({ color, size }) => (
              <Feathericon name="more-horizontal" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfilesPage}
          options={{
            tabBarLabel: "User",
            tabBarIcon: ({ color, size }) => (
              <Anticon name="user" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  useEffect(() => {
    useFont(() => console.log("Fonts Loaded"));
  }, []);
  return (
    <StoreProvider>
    <NativeBaseProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={LoginPage}
            options={{ headerShown: showHeaders }}
          />
          <Stack.Screen
            name="Interface"
            component={HomeInterface}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
    </StoreProvider>
  );
}

const style = StyleSheet.create ({
  root: {
    flex : 1,
  }
})
