
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import signup from "screens/signup";
import Login from "screens/login";
import homepage from "screens/homepage";

const Stack = createStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="homepage" component={homepage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="signup" component={signup} />
      </Stack.Navigator>
  );
}