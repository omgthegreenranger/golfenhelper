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
import coursesJSON from "../../test-data/courses.json" with { type: 'json' }

export function CourseDisplay({ route }) {
  const { tempApi } = useContext(SetupContext);
  const navigation = useNavigation();
  const [courseLoading, setCourseLoading] = useState(true)
  console.log("Loading?", courseLoading)
  console.log("What is Temp?", tempApi)
  const [coursesData, setCoursesData] = useState([])

  async function getCourses() {
    let courseReturn = []
    if (tempApi) {
      courseReturn = coursesJSON;
      console.log("Course Return Data", courseReturn)
      setCourseLoading(false)
    } else {
      console.log("No")
      courseReturn = await courseList(setCourseLoading)
    }
    setCoursesData(courseReturn)

  }
  useEffect(() => { getCourses() }, [])

  const elements = coursesData.elements

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
                  navigation.navigate("players", {
                    pickedCourse: course
                  })
                  console.log("**********************", courseLoading)
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