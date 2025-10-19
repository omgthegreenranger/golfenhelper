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
import { CourseSelect, Players } from "../index"
import { getHoles } from "../../scripts/osm";
import { useNavigation } from "@react-navigation/native";
import { SetupContext } from "../../App";

export default function Confirm({route}) {
  const { pickedCourse } = route.params;
  const navigation = useNavigation(); // for screen navigation
  const { holesLoading, setHolesLoading, players } = useContext(SetupContext) // take from context
  const [course, setCourse] = useState([]) // set Course state to retain course data from the OSM call

  useEffect(() => { getHoles(pickedCourse, setHolesLoading, setCourse) }, []); // api call to get the game data from OSM and provide in Course state

  let holes = [];
  
  if (!holesLoading) {
    let i = 0
    course.elements.map((hole) => {
      if (hole.tags.golf === "hole") {
        holes[i] = { "hole": hole.tags.ref, "par": hole.tags.par };
        i++
      }
    })
  }
  holesLoading ? console.log("Loading Holes") : console.log("Holes loaded", holes)

  let holeCount = holes.length;
  let holeValue = Array.from({ length: holeCount }, (_, index) => 0);
  const courseInfo = { name: pickedCourse.tags.name, address: pickedCourse.address };
  const playerInfo = players.map((player, i) => {
    return {
      player: player,
      scores: holeValue,
    };
  });
  const holeInfo = holes.map((hole) => {
    return {
      ...hole,
      hole: parseInt(hole.hole),
      distance: hole.distance,
      par: hole.par,
    };
  });
  console.log("Params for scoreboard", "\n", "Course:", courseInfo, "\n", "Holes:", holeInfo, "\n", "Players:", playerInfo)
  return (
    <View style={styles.recapBlock}>
            {holesLoading ? 
           ( <Text>Loading Data...</Text> )
      :
      (
        <View>
      <Text>Round details recap</Text>
      <View style={styles.recapCourseBlock}>
        <Text>{courseInfo.name}</Text>
        <Text>{courseInfo.address}</Text>
      </View>
      <View style={styles.recapPlayersBlock}>
        {playerInfo.map((golfer, i) => {
          return <Text key={i}>{golfer.player}</Text>;
        })}
      </View>
      <Pressable
        style={[styles.button, styles.goButton]}
        onPress={() => {
          navigation.navigate("ActiveGame",
            {
              // scoreCard: card
              course: courseInfo,
              players: playerInfo,
              holes: holeInfo,
              // holes: holes,
              //  setHoles: setHoles

            }
          )
        }
        }
      >
        <Text>Start Game</Text>
      </Pressable>
      </View>
      )}
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
