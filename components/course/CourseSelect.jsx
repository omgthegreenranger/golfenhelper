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
// import Settings from "../settings/Settings"
// import { SetupContext } from "../../App";

export function CourseSelect({ route }) {
  console.log("Route", route)
  // const { tempApi } = useContext(SetupContext);
  // const [courseLoading, setCourseLoading] = useState(true)
  const navigation = useNavigation();
  return (
    <View>
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

