import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AspectRatio, Center, NativeBaseProvider, Text, VStack } from "native-base";
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
import { StoreProvider } from "./Store/StoreContext.js";
import SignUpPage from "./Components/Pages/SignUpPage.js";

//Socket.io configuration (Websocket connection to the server.)

//Navigation options
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const showHeaders = false;

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
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 10,
            left: 10,
            right: 10,
            elevation: 9,
            borderRadius: 15,
            height: 75,
          },
          tabBarActiveTintColor:"#16a34a"
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Center >
                <Icon name="home" color={color} size={size} />
                <Text color={color}>HOME</Text>
              </Center>
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
              <Center>
                <Anticon name="form" color={color} size={size} />
                <Text color={color}>LEAVE</Text>
              </Center>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="NSafe"
          component={NSafePage}
          options={{
            tabBarLabel: "NSafe",
            tabBarIcon: ({ color, size,focused }) => (
                 <AspectRatio ratio={1} w={"full"}>
              <Center bg={focused ? "success.100":"blueGray.100"} borderRadius={"3xl"}>
                <Anticon name="form" color={color} size={size * 1.5} />
                <Text color={color}>NSAFE</Text>
              </Center>
               </AspectRatio>
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
              <Center>
                <Feathericon name="more-horizontal" color={color} size={size} />
                <Text color={color}>MORE</Text>
              </Center>
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
              <Center>
                <Anticon name="user" color={color} size={size} />
                <Text color={color}>USER</Text>
              </Center>
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
              name="Register"
              component={SignUpPage}
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
