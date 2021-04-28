import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import {
  GamePage,
  HomePage,
  EndPage,
  WinPage,
  StartGameScreen,
} from "./screens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={StartGameScreen} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Game" component={GamePage} />
          <Stack.Screen name="Win" component={WinPage} />
          <Stack.Screen name="End" component={EndPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
