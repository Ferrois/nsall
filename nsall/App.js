import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./Components/Pages/LoginPage.js";
import { NativeBaseProvider } from "native-base";
import HomePage from "./Components/Pages/HomePage.js";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const showHeaders = true;

function HomeInterface() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomePage}></Tab.Screen>
        <Tab.Screen name="Chao geng" component={HomePage}></Tab.Screen>
        <Tab.Screen name="Utilities" component={HomePage}></Tab.Screen>
        <Tab.Screen name="Settings" component={HomePage}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={LoginPage} options={{headerShown: showHeaders}}/>
          <Stack.Screen name="Interface" component={HomeInterface}  options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

