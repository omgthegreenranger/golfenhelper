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
  const { navigation, route} = props;
  const players = route.params.players;
  console.log(players)
  // on select, let's make the card.

  function cardMakeAndSend(courseId) {
    let course = courses.courses[courseId];
    let playerCount = [...players];
    const playerScore = playerCount.map(player => {
      let score = 0
      return {
        ...playerScore,
        player,
        score}
  });
    const scoresList = course.holes.map((hole) => {
      return ({
        ...hole,
        hole: hole.hole,
        distance: hole.distance,
        par: hole.par,
        playerScore
      })
    });
    const scoreCard = ({
      name: course.name,
      holes: scoresList,
  });
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
