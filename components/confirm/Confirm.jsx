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
import { getHoles } from "../../scripts/osm";
import { useNavigation } from "@react-navigation/native";
import { SetupContext } from "../../App";
import { gamePrepare } from "./confirm";
import holeJSON from "../../test-data/course-data.json" with { type: 'json' };

export default function Confirm({ route }) {
  const { pickedCourse, players } = route.params;
  const navigation = useNavigation(); // for screen navigation
  const { tempApi } = useContext(SetupContext) // take from context
  const [course, setCourse] = useState([]) // set Course state to retain course data from the OSM call
  const [holesLoading, setHolesLoading] = useState(true)
  // const [courseData, setCourseData] = useState([])
  let courseData = useEffect(() => {
    let data;
    if (tempApi === true) { data = holeJSON; }
    if (tempApi === false) {
      data = getHoles(pickedCourse);
    }
    setHolesLoading(false)
    // setCourse(data)
    return
  }, [])
  useEffect(() => {
    gamePrepare(courseData, players, setHolesLoading)
    console.log(courseData, course)
  
  }, [])
  // let courseData = gamePrepare(course, holesLoading, players);
  // courseData = {
  //   "course": tempCourse.course,
  //   "hole": tempCourse.features,
  //   "playerInfo": tempCourse.playerInfo
  // }
  // console.log(coursing)
  // return coursing
  // useEffect(() => {
  //   captureData
  //   // .then(data => {console.log("Dataaaaa", data); gamePrepare(data, players, setHolesLoading)} )
  //   // .then(data => {console.log(data); setHolesLoading(false)});
  // }, [])
  holesLoading ? console.log("Loading Holes")
    : console.log("Holes loaded", courseData, holesLoading)
  return (
    <View style={styles.recapBlock}>
      {holesLoading
        ?
        (<Text>Loading Data...</Text>)
        : (holesLoading === null)
          ?
          (<Text>Failed, try again</Text>)
          :
          (<View>
            <Text>Round details recap</Text>
            <View style={styles.recapCourseBlock}>
              <Text>{course.name}</Text>
              <Text>{course.address}</Text>
            </View>
            <View style={styles.recapPlayersBlock}>
              {courseData.playerInfo.map((golfer, i) => {
                return <Text key={i}>{golfer.player}</Text>;
              })}
            </View>
            <Pressable
              style={[styles.button, styles.goButton]}
              onPress={() => {
                console.log("Confirm playerInfo", courseData.playerInfo);
                navigation.navigate("ActiveGame",
                  {
                    course: course.course,
                    players: courseData.playerInfo,
                    holes: JSON.stringify(courseData.hole),

                  }
                )
              }
              }
            >
              <Text>Start Game</Text>
            </Pressable>
          </View>
          )
      }
    </View>
  );
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
