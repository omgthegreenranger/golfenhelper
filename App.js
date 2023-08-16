import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Score from "./components/score.jsx";
import Scoreboard from "./components/scoreboard.jsx";
import {
  StyleSheet,
} from "react-native";
import {
  NavigationContainer,
  Linking,
  Platform,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/login.jsx";
const image = {uri: './assets/golf-background.png'}
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    
    <NavigationContainer
    style={styles.container}
    >
     <Stack.Navigator initialRouteName="Login" style={styles.container}
      screenOptions={{
        headerStyle: {elevation: 0 },
      }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Scoreboard"
          component={Scoreboard}
        />
        <Stack.Screen
          name="Score"
          component={Score}
          // options={({ route }) => ({ players: playerList})}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8BC34A",
    alignItems: "center",
    justifyContent: "center",
  },
});
