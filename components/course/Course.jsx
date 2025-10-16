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
import { LoadingPulse } from "../../scripts/animations";
import { courseList } from "../../scripts/osm";
import { SetupContext } from "../../App";
import { useNavigation } from "@react-navigation/native";

export default function CourseSelect(props) {
  const { courseLoading, setCourseLoading } = useContext(SetupContext);
  const [courses, setCourses] = useState([]);
  const navigation = useNavigation();
  useEffect(() => { courseList(setCourses, setCourseLoading) }, []);
  const elements = courses.elements
  return (
    <View>
      <View>
        <Text>Please choose a course:</Text>
      </View>
      {courseLoading ? <View><LoadingPulse>Loading Text</LoadingPulse></View> : elements.map((course, i) => {
        return (
          <View style={styles.course} key={i}>
            <Button
              key={i}
              title={course.tags.name}
              style={styles.button}
              onPress={() => {
                let pickedCourse = course;
                navigation.navigate("confirm", {
                  pickedCourse: pickedCourse
                })
              }}
            ></Button>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
              <Text>{course.address}</Text>
              <Text>Current weather</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}