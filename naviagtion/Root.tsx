
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import signup from "screens/home/signup";
import Login from "screens/home/login";
import homepage from "screens/home/homepage";
import acceuilpage from "screens/acceuilpage";


const Stack = createStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="homepage" component={homepage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="signup" component={signup} />
      <Stack.Screen name="acceuilpage" component={acceuilpage} />
      </Stack.Navigator>
  );
}