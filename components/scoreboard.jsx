import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import courses from "../course.json";

export default function Scoreboard(props) {
  const { navigation, route } = props;
  const { title } = route.params;

  // const {height, width} = useScreenDimensions()
  const [course, setCourse] = useState(courses.courses[route.params.courseId]);
  // const [holeScore, setHoleScore] = useState(
    let holeScore = course.holes.map((score) => ({
      hole: score.number,
      distance: score.distance,
      par: score.par,
      score: 0,
    }))
  console.log(course);
  console.log(holeScore);

  function changeScreen(hole) {
    navigation.navigate("Score", { hole: hole });
  }

  // let totalScore = course.reduce((course.))
  let courseOut = holeScore.slice(0, 9);
  let courseIn = holeScore.slice(9, 18);

  return (
    <View
      style={[
        styles.container,
        { height: useWindowDimensions(window).height },
        { width: useWindowDimensions().width },
      ]}
    >
      <View style={[styles.scorecard, { width: useWindowDimensions().width }]}>
        {courseOut.map((deet) => (
          <TouchableOpacity
            key={deet.hole}
            style={[
              styles.scorebox,
              {
                borderLeft: "black 1px solid",
                borderRight: "black 1px solid",
                borderTop: "black 1px solid",
                borderBottom: "black 1px solid",
              },
            ]}
            onPress={() => changeScreen(deet)}
          >
            <Text
              style={{
                backgroundColor: "#FFC300",
                paddingTop: 3,
                borderBottom: "black 2px solid",
              }}
            >
              {deet.hole}
            </Text>
            <Text style={{ padding: "3px", borderBottom: "black 1px dotted" }}>
              {deet.par}
            </Text>
            <Text style={{ padding: "3px" }}>{deet.score}</Text>
          </TouchableOpacity>

        ))}
      </View>
      <View style={styles.container}>
        <Text>Total Score</Text>
        <Text>Course Par</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  courseName: {
    padding: 10,
    fontWeight: "bold",
  },
  scorecard: {
    flex: 3,
    flexWrap: 9,
    flexDirection: "row",
    backgroundColor: "grey",
    alignItems: "center",
    padding: 10,
    // justifyContent: 'space-evenly',
    // alignSelf: 'stretch'
  },
  scorebox: {
    flex: 1,
    backgroundColor: "white",
    margin: 0,
    justifyContent: "stretch",
    textAlign: "center",
  },
});
