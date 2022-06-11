import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, Text } from "native-base";
import LoginPage from "./Components/Pages/LoginPage.js";
import HomePage from "./Components/Pages/HomePage.js";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import Anticon from "react-native-vector-icons/AntDesign";
import Feathericon from "react-native-vector-icons/Feather";
import ProfilesPage from "./Components/Pages/ProfilesPage.js";
import { useEffect } from "react";
import useFont from "./Hooks/useFont.js";
import Home from "./Components/Pages/HomePage.js";
import LeavesPage from "./Components/Pages/LeavesPage.js";
import NSafePage from "./Components/Pages/NSafePage.js";
import UtilsPage from "./Components/Pages/UtilsPage.js";
import { SafeAreaView } from "react-native-safe-area-context";

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
            tabBarLabel: "Form",
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
  // useEffect(() => {
  //   useFont(() => console.log("Fonts Loaded"));
  // }, []);
  return (
    <SafeAreaView>
      <Text>

      </Text>
    </SafeAreaView>
  );
}

const style = StyleSheet.create ({
  root: {
    flex : 1,
  }
})
