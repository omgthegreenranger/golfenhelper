import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Dimensions,
  useWindowDimensions,
  useScreenDimensions,
} from "react-native";
import courses from "../course.json";

export default function CourseSelect(props) {
  const { navigation, route } = props;

  // on select, let's make the card.

  function cardMakeAndSend(courseId, title, players) {
    let course = courses.courses[courseId];
    console.log(courses);
    console.log(course);
    // console.log([...players]);
    let i = 0;
    let playerCount = [...Array(players).keys()];
    console.log(playerCount);
    const playerScore = playerCount.map((player) => {
      return { ...playerScore, player: player, name: "Steve", score: 0 };
    });
    const scoresList = course.holes.map((hole) => {
      return {
        ...hole,
        hole: hole.hole,
        distance: hole.distance,
        par: hole.par,
        score: playerScore,
      };
    });
    const scoreCard = {
      name: course.name,
      holes: scoresList,
    };
    navigation.navigate("Scoreboard", {
      scoreCard: scoreCard,
    });
  }

  return (
    <View>
      {courses.courses.map((course, i) => {
        return (
          <Pressable
            key={i}
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              cardMakeAndSend(i, course.name, 1);
            }}
          >
            <Text>{course.name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
