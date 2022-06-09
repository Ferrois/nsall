import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./Components/Pages/LoginPage.js";
import { NativeBaseProvider } from "native-base";
import HomePage from "./Components/Pages/HomePage.js";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import Anticon from "react-native-vector-icons/AntDesign";
import Feathericon from "react-native-vector-icons/Feather";

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
        <Tab.Screen name="Home" component={HomePage} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color,size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen
          name="Leaves"
          component={HomePage}
          options={{
            tabBarLabel: "Form",
            tabBarIcon: ({color,size}) => (
              <Anticon name="form" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen name="Utilities" component={HomePage} 
        options={{
          tabBarLabel: 'Utilities',
          tabBarIcon: ({color,size}) => (
            <Feathericon 
            name="more-horizontal" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="Setting" component={HomePage} 
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({color,size}) => (
            <Anticon name="setting" color={color} size={size} />
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
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
  );
}
