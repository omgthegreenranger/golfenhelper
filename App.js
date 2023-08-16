import React from "react";
import Score from "./components/score.jsx";
import Scoreboard from "./components/scoreboard.jsx";
import {
  StyleSheet,
} from "react-native";
import {
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/login.jsx";
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
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    alignItems: "center",
    backgroundColor: "#8BC34A",
    justifyContent: "center",
  },
});
