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

default function CourseSelect(props) {
  const { navigation, route } = props;
  const players = route.params.players;
  console.log(players);
  // on select, let's make the card.

  // Order - Course details -> Hole details (Par, distance, number) -> Player -> Scorecard

  function cardMakeAndSend(courseId) {
    let course = courses.courses[courseId];
    let holeCount = course.holes.length;

    let holeValue = Array.from({ length: holeCount }, (_, index) => "0");

    const courseInfo = {name: course.name, address: course.address
      }
    const playerInfo = players.map((player) => {
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
              cardMakeAndSend(i);
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
