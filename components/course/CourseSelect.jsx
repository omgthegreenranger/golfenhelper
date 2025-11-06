import React, { useEffect, useState, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  Animated
} from "react-native";
import { styles } from "../login/Login";
import { useNavigation } from "@react-navigation/native";
import Settings from "../settings/Settings"

export function CourseSelect({ route }) {
  console.log(route)
  // const [courseLoading, setCourseLoading] = useState(true)
  const navigation = useNavigation();
  return (
    <View>
      <Settings />
      <Pressable
        style={[styles.button, styles.goButton]}
        onPress={() => {
          navigation.navigate("start")
        }}
      >
        <Text>Search Courses</Text>
      </Pressable>
    </View>
  );
}

