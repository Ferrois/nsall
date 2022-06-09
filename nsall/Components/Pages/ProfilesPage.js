import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsPage from "../ProfileComps/SettingsPage";
import Profile from "../ProfileComps/Profile";
import MedHistPage from "../ProfileComps/MedHistPage";

//This component is solely for navigation and is not actually a page. Trollolol. Real profile page in the ProfileComps folder

//Initiate Nav
const Stack = createNativeStackNavigator();


//Directory Array
const directories = [
  {
    id: 1,
    dir: "Profile",
    component: Profile,
  },
  {
    id: 2,
    dir: "MedHistory",
    component: MedHistPage,
  },
  {
    id: 3,
    dir: "Settings",
    component: SettingsPage,
  },
];

export default function ProfilesPage() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        {directories.map(({ id, dir, component }) => {
          return <Stack.Screen key={id} name={dir} component={component} options={{headerShown:false}}/>;
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
