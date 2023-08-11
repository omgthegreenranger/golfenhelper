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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./components/login.jsx";
const image = {uri: './assets/golf-background.png'}
const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    
    <NavigationContainer
    style={styles.container}
    // initialState={initialState}
    // onStateChange={(state) =>
    //   AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
    // }
    >
     <Stack.Navigator initialRouteName="Login" style={styles.container}
      screenOptions={{
        headerStyle: {elevation: 0 },
        contentStyle: {background: '/assets/golf-background.png'}
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
