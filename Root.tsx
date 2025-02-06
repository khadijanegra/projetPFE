
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./login";
import Authentication from "./authefication";

const Stack = createStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="authetification" component={Authentication} />
      <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
  );
}