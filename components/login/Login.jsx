/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  Animated
} from "react-native";
import {CourseDisplay} from "../course/Course"
import { CourseSelect } from "../course/CourseSelect"
import Players from "../players/Players"
import Confirm from "../confirm/Confirm"
import Settings from "../settings/Settings"
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator(); // navigator for the game setup process

export default function Login({ route }) {
  return (
    <View>
      <Settings />
      <Stack.Navigator initialRouteName="select">
        <Stack.Screen
        name="start"
        component={CourseDisplay}
        />
        <Stack.Screen
          name="select"
          component={CourseSelect}
        />
        <Stack.Screen
          name="players"
          component={Players}
        />
        <Stack.Screen
          name="confirm"
          component={Confirm} />
      </Stack.Navigator>
    </View>
  )
}

export const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    elevation: 2,
    margin: 10,
    padding: 20,
  },
  course: {
    padding: 10,
  },
  entername: {
    borderColor: "black",
    borderWidth: 1,
    fontSize: "larger",
    fontStyle: "italic",
  },
  goButton: {
    backgroundColor: "#2196F3",
  },
  playerButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    elevation: 2,
    margin: 5,
    padding: 5,
  },
  playerbox: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  playercount: {
    fontSize: "xxx-large",
    fontStyle: "bold",
    margin: 10,
    padding: 10,
  },
  recapBlock: {
    backgroundColor: "green",
    flexDirection: "column",
    padding: 15,
  },
  recapCourseBlock: {
    backgroundColor: "#C2B280",
    borderColor: "brown",
    borderRadius: 10,
    borderWidth: 2,
    margin: 15,
    padding: 5,
  },
  recapPlayersBlock: {
    backgroundColor: "#C2B280",
    borderColor: "brown",
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: "row",
    margin: 15,
    padding: 5,
  }

});
