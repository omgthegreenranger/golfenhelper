import { React, StrictMode } from "react";
import { Login, Score, Scoreboard }  from "./components/index.js";
import {
  StyleSheet,
} from "react-native";
import {
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    // <StrictMode>
    <NavigationContainer
    style={styles.container}
    >
     <Stack.Navigator initialRouteName="Login" 
      style={styles.container}
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
    // </StrictMode>
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
