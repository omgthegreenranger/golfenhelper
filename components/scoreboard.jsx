import React, { useState, useFocusEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

export default function Scoreboard(props) {
  const { navigation, route } = props;
  const [course, setCourse] = useState(route.params.course);
  const [holes, setHoles] = useState(route.params.holes);
  const players = route.params.players;

  //This is the function to move to the score screen.
  function changeScreen(hole, index, player) {
    navigation.navigate("Score", {
      hole: hole,
      key: index,
      player: player,
      players: players
    });
  }

  let holesOut = holes.slice(0, 9);
  let holesIn = holes.slice(9, 18);

  return (
    <View style={[styles.container]}>
      <View style={styles.scorecardbox}>
        <View
          style={[styles.scorecard, { width: useWindowDimensions().width }]}
        >
          <View>
            <Text style={styles.sideHoleFont}>Hole</Text>
            <Text style={styles.sideParFont}>Par</Text>
            {players.map((golfer) => {
              return (
                <Text style={styles.sideNameFont}>
                  {golfer.player.charAt(0)}
                </Text>
              );
            })}
          </View>
          {holesOut.map((deet, i) => (
            <View style={styles.scorebox}>
              <Text style={styles.holeFont}>{deet.hole}</Text>
              <Text style={styles.parFont}>{deet.par}</Text>
              {players.map((golfer, j) => {
                return (
                  <TouchableOpacity
                    style={styles.button}
                    // key={i}
                    onPress={() => changeScreen(deet, i, golfer)}
                  >
                    <Text style={styles.scoreFont}>{golfer.scores[i]}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
        <View
          style={[styles.scorecard, { width: useWindowDimensions().width }]}
        >
          <View>
            <Text style={styles.sideHoleFont}>Hole</Text>
            <Text style={styles.sideParFont}>Par</Text>
            {players.map((golfer) => {
              return (
                <Text style={styles.sideNameFont}>
                  {golfer.player.charAt(0)}
                </Text>
              );
            })}
          </View>
          {holesIn.map((deet, i) => (
            <View style={styles.scorebox}>
              <Text style={styles.holeFont}>{deet.hole}</Text>
              <Text style={styles.parFont}>{deet.par}</Text>
              {players.map((golfer) => {
                return (
                  <TouchableOpacity
                    // key={i}
                    onPress={() => changeScreen(deet, i + 9, golfer)}
                  >
                    <Text style={styles.scoreFont}>{golfer.scores[i + 9]}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
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
  scorecardbox: {
    height: 800,
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
    // alignItems: "center",
    padding: 10,
    alignItems: "flex-start",
    // justifyContent: 'space-evenly',
    // alignSelf: 'stretch'
  },
  scorebox: {
    flex: 1,
    backgroundColor: "white",
    margin: 0,
    justifyContent: "stretch",
    textAlign: "center",
    border: "black 1px solid",
  },
  holeFont: {
    backgroundColor: "#FFC300",
    paddingTop: 3,
    borderBottom: "black 2px solid",
    fontSize: "24px",
  },
  sideHoleFont: {
    paddingTop: 3,
    borderBottom: "black 2px solid",
    fontSize: "24px",
  },
  parFont: {
    padding: "3px",
    borderBottom: "black 1px dotted",
    fontSize: "19px",
    // border: "black 1px solid"
  },
  sideParFont: {
    padding: "3px",
    borderBottom: "black 1px dotted",
    fontSize: "19px",
  },
  scoreFont: { padding: "3px", fontSize: "22px" },
  sideNameFont: {
    padding: "3px",
    fontSize: "22px",
  },
});
