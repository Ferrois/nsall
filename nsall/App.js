import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./Components/Pages/LoginPage.js";
import { NativeBaseProvider } from "native-base";
import HomePage from "./Components/Pages/HomePage.js"
import { LinearGradient } from "expo-linear-gradient";

//Navigation options
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const showHeaders = true;

//Native Base configuration (themes etc.)
const config = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};

//Navigators
function HomeInterface() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Chao geng" component={HomePage} />
        <Tab.Screen name="Utilities" component={HomePage} />
        <Tab.Screen name="Settings" component={HomePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <NativeBaseProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={LoginPage} options={{headerShown: showHeaders}}/>
          <Stack.Screen name="Interface" component={HomeInterface}  options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

