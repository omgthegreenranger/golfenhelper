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

export default function Login(props) {
  const { navigation, route } = props;

  return (
    <View>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => navigation.navigate("Course")}
      >
        <Text>Start Game</Text>
      </Pressable>
    </View>
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
