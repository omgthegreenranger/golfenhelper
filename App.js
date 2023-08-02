import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Score from "./components/score.jsx";
import Scoreboard from "./components/scoreboard.jsx";
import CourseSelect from "./components/course.jsx";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
  useWindowDimensions,
  useScreenDimensions,
} from "react-native";
import {
  NavigationContainer,
  Linking,
  Platform,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./components/login.jsx";

const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";
const Stack = createNativeStackNavigator();

export default function App() {
  // const [isReady, setIsReady] = React.useState(false);
  // const [initialState, setInitialState] = React.useState();

  // React.useEffect(() => {
  //   const restoreState = async () => {
  //     try {
  //       const initialUrl = await Linking.getInitialURL();

  //       if (Platform.OS !== 'web' && initialUrl == null) {
  //         // Only restore state if there's no deep link and we're not on web
  //         const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
  //         const state = savedStateString ? JSON.parse(savedStateString) : undefined;

  //         if (state !== undefined) {
  //           setInitialState(state);
  //         }
  //       }
  //     } finally {
  //       setIsReady(true);
  //     }
  //   };

  //   if (!isReady) {
  //     restoreState();
  //   }
  // }, [isReady]);

  // if (!isReady) {
  //   return null;
  // }

  return (
    <NavigationContainer
    // initialState={initialState}
    // onStateChange={(state) =>
    //   AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
    // }
    >
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          // options={{title: route.params.title}}
          // screenOptions={{title: route.params.title}}
        />
        <Stack.Screen
          name="Course"
          component={CourseSelect}
          // options={{title: route.params.title}}
          // screenOptions={{title: route.params.title}}
        />
        <Stack.Screen
          name="Scoreboard"
          component={Scoreboard}
          // options={({ route }) => ({title: route.params.title})}
        />
        <Stack.Screen
          name="Score"
          component={Score}
          options={({ route }) => ({ scoreHole: route.params.scoreHole })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
