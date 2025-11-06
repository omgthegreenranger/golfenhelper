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
import Settings from "../settings/Settings"
import coursesJSON from "../../test-data/courses.json" with { type: 'json' }

export function CourseSelect(props) {
  const { courseLoading, setCourseLoading, tempApi, setTempApi, searchToggle, setSearchToggle } = useContext(SetupContext);
  const navigation = useNavigation();
  return (
    <View>
      <Settings />
      <Pressable
        style={[styles.button, styles.goButton]}
        onPress={() => {
     navigation.navigate("start")}}
      >
        <Text>Search Courses</Text>
      </Pressable>
    </View>
  );
}



export function CourseDisplay({ route }) {
  const { courseLoading, setCourseLoading, tempApi, setTempApi, searchToggle, setSearchToggle } = useContext(SetupContext);
  // const { courses, elements } = route.params
  console.log(courseLoading)
  console.log(tempApi)
  const [courseData, setCourseData] = useState([])

  async function getCourses() {
    let courseReturn = []
    if (tempApi) {
      courseReturn = coursesJSON;
      setCourseLoading(false)
    } else {
      console.log("No")
      courseReturn = await courseList(setCourseLoading)
    }
    setCourseData(courseReturn)
    console.log("CourseData", courseData);

}
  useEffect(() => {getCourses()}, [])

  const elements = courseData.elements

  console.log(elements)
  return (
    courseLoading ? (
      <View><Text>Loading Text</Text></View>
    ) :
      (courseLoading === null) ? (
        <View><Text>Data fetch failed. Please try again</Text></View>
      ) :
        elements.map((course, i) => {
          return (
            <View style={styles.course} key={i}>
              <Button
                key={i}
                title={course.tags.name}
                style={styles.button}
                onPress={() => {
                  navigation.navigate("confirm", {
                    pickedCourse: course
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
        })
  )
}