import React, { useEffect, useState, useRef } from "react";
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


export default function CourseSelect(props) {
  const { setButtonTree, buttonTree, setPickedCourse, courses, setCourses, courseLoading } = props;
  const elements = courses.elements;
  console.log(courseLoading)
  
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
                setPickedCourse(course);
                // setButtonTree([false, true, false, false]); ### DISABLING FOR DEVELOPMENT
                setButtonTree([false, false, false, true]);
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