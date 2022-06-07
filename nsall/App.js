import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import useFetch from "./Hooks/useFetch.js";
import useTimeLeft from "./Hooks/useTimeLeft.js";
import { NativeBaseProvider } from "native-base";

const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

function Home() {
  // const [data] = useFetch("https://sandbox.api.myinfo.gov.sg/com/v3/person-sample/S9812381D")
  const timeLeft = useTimeLeft("December 17, 2022 03:24:00");
  return (
    <View style={styles.container}>
      <Text>our brand new ns app - ferrois</Text>
      <Text>Target date: December 17, 2022 03:24:00</Text>
      <Text>
        {timeLeft[0]}days, {timeLeft[1]}hours, {timeLeft[2]}minutes,{" "}
        {timeLeft[3]}seconds
      </Text>
      {/* <Text>{timeLeft}</Text> */}
      {/* <Text>{data && data.map((obj)=>{return(<Text key={obj.id}>id:{obj.id}  </Text>)})}</Text> */}
      {/* <Text>{JSON.stringify(data)}</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  // const [data] = useFetch("https://jsonplaceholder.typicode.com/todos")
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home}></Tab.Screen>
          <Tab.Screen name="Chao geng" component={Home}></Tab.Screen>
          <Tab.Screen name="Utilities" component={Home}></Tab.Screen>
          <Tab.Screen name="Settings" component={Home}></Tab.Screen>
        </Tab.Navigator>
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
