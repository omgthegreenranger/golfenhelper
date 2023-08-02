import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
} from "react-native";
import {
  NavigationContainer,
  Linking,
  Platform,
} from "@react-navigation/native";
import Score from "./score.jsx";
import Scoreboard from "./scoreboard.jsx";
import CourseSelect from "./course.jsx";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function Login(props) {
  const { navigation, route } = props;
  return (
    route.params.type == "newgame" ? (
    <NavigationContainer defaultRoute="Course" independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Course"
          component={CourseSelect}
          // options={{ title: route.params.title }}
          //   screenOptions={{title: route.params.title}}
        />
        <Stack.Screen
          name="Scoreboard"
          component={Scoreboard}
          options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen
          name="Score"
          component={Score}
          options={({ route }) => ({ scoreHole: route.params.scoreHole })}
        />
      </Stack.Navigator>
    </NavigationContainer>
    ) : ( <View><Text>Nah it's wrong.</Text></View>)
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});
