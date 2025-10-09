import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import { styles } from "./login";


export default function CourseSelect(props) {
  const { setButtonTree, buttonTree, setPickedCourse, courses, setCourses, courseLoading } = props;
  // console.log("Courses", courses.elements)
  const elements = courses.elements;
  console.log(courseLoading)
  return (
    <View>
      <View>
        <Text>Please choose a course:</Text>
      </View>
      {courseLoading ? <View><Text>Loading Text</Text></View> : elements.map((course, i) => {
        return (
          <View style={styles.course} key={i}>
            <Button
              key={i}
              title={course.tags.name}
              style={styles.button}
              onPress={() => {
                setPickedCourse(course.id);
                setButtonTree([false, true, false, false]);
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

function GameReview(props) {
  const { pickedCourse, playerCount, players, navigation } = props;
  let course = courses.courses[pickedCourse];
  let holeCount = course.holes.length;

  let holeValue = Array.from({ length: holeCount }, (_, index) => 0);

  const courseInfo = { name: course.name, address: course.address };
  const playerInfo = players.map((player, i) => {
    return {
      player: player,
      scores: holeValue,
    };
  });
  const holeInfo = course.holes.map((hole) => {
    return {
      ...hole,
      hole: hole.hole,
      distance: hole.distance,
      par: hole.par,
    };
  });
  const scoreCard = {
    course: courseInfo,
    holes: holeInfo,
    players: playerInfo,
  };
  return (
    <View style={styles.recapBlock}>
      <Text>Round details recap</Text>
      <View style={styles.recapCourseBlock}>
        <Text>{scoreCard.course.name}</Text>
        <Text>{scoreCard.course.address}</Text>
      </View>
      <View style={styles.recapPlayersBlock}>
        {scoreCard.players.map((golfer, i) => {
          return <Text key={i}>{golfer.player}</Text>;
        })}
      </View>
      <Pressable
        style={[styles.button, styles.goButton]}
        onPress={() =>
          navigation.navigate("Scoreboard", {
            // scoreCard: scoreCard,
            course: courseInfo,
            players: playerInfo,
            holes: holeInfo,
          })
        }
      >
        <Text>Start Game</Text>
      </Pressable>
    </View>
  );
}