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
import { styles } from "./login";


export default function CourseSelect(props) {
  const { setButtonTree, buttonTree, setPickedCourse, courses, setCourses, courseLoading } = props;
  // console.log("Courses", courses.elements)
    const LoadingPulse = props => {
      const pulseAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  
      useEffect(() => {
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2,
//          easing: Easing.back(),
          useNativeDriver: true,
        }).start();
      }, [pulseAnim]);
  
      return (
        <Animated.View // Special animatable View
          style={{
            ...props.style,
            opacity: pulseAnim, // Bind opacity to animated value
          }}>
          {props.children}
        </Animated.View>
      );
    };
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