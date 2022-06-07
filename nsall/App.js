import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import useFetch from "./Hooks/useFetch.js";
import useTimeLeft from "./Hooks/useTimeLeft.js";
import { NativeBaseProvider } from "native-base";
import LoginPage from "./Components/Pages/LoginPage.js";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {
  const timeLeft = useTimeLeft("December 17, 2022 03:24:00");
  return (
    <View style={styles.container}>
      <Text>our brand new ns app - ferrois</Text>
      <Text>Target date: December 17, 2022 03:24:00</Text>
      <Text>
        {timeLeft[0]}days, {timeLeft[1]}hours, {timeLeft[2]}minutes,{" "}
        {timeLeft[3]}seconds
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

function HomeInterface() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home}></Tab.Screen>
        <Tab.Screen name="Chao geng" component={Home}></Tab.Screen>
        <Tab.Screen name="Utilities" component={Home}></Tab.Screen>
        <Tab.Screen name="Settings" component={Home}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={LoginPage} />
        <Stack.Screen name="Interface" component={HomeInterface} />
      </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
