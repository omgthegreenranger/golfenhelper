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

// export function CourseSelect({ route }) {
//   console.log(route)
//   // const [courseLoading, setCourseLoading] = useState(true)
//   const navigation = useNavigation();
//   return (
//     <View>
//       <Settings />
//       <Pressable
//         style={[styles.button, styles.goButton]}
//         onPress={() => {
//           navigation.navigate("start")
//         }}
//       >
//         <Text>Search Courses</Text>
//       </Pressable>
//     </View>
//   );
// }



export function CourseDisplay({ route }) {
  const { tempApi, setTempApi, searchToggle, setSearchToggle } = useContext(SetupContext);
  const [courseLoading, setCourseLoading] = useState(true)
  console.log("Loading?", courseLoading)
  console.log(tempApi)
  const [coursesData, setCoursesData] = useState([])

  async function getCourses() {
    let courseReturn = []
    if (tempApi) {
      console.log("Yes")
      courseReturn = coursesJSON;
      console.log(courseReturn)
      setCourseLoading(false)
    } else {
      console.log("No")
      courseReturn = await courseList(setCourseLoading)
    }
    setCoursesData(courseReturn)
    console.log("CourseData", coursesData);

  }
  useEffect(() => { getCourses() }, [])

  const elements = coursesData.elements

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
                  console.log(courseLoading)
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