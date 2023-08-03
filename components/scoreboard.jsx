import React, { useState, useEffect } from "react";
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
  const [scoreCard, setScoreCard ] = useState(route.params.scoreCard);
  const [course, setCourse] = useState(scoreCard.holes);
  const [holeScore, setHoleScore] = useState([]);
  const [scoreReturn, setScoreReturn] = useState(route.params.scoreReturn);

console.log(scoreCard)

useEffect(() => {
    if (!route.params.scoreReturn) {
    console.log("There is no scoreReturn");
    setHoleScore(course);
    } else {
    console.log("There is a scoreReturn", route.params.scoreReturn);
    setHoleScore(route.params.scoreReturn);
    }
  })

console.log(holeScore)

  function changeScreen(hole, index, playerName) {
    console.log(index);
    navigation.navigate("Score", {
      hole: hole.hole,
      holeScore,
      key: index,
      player: playerName
    });
  }

  // let totalScore = course.reduce((course.))
  let courseOut = holeScore.slice(0, 9);
  let courseIn = holeScore.slice(9, 18);

  console.log(courseOut)
  console.log(courseIn)

  return (
    <View
      style={[
        styles.container,
        // { height: useWindowDimensions(screen).height },
        // { width: useWindowDimensions().width },
      ]}
    >
      <View style={styles.scorecardbox}>
        <View
          style={[styles.scorecard, 
            // { width: useWindowDimensions().width }
          ]}
        >
          {courseOut.map((deet, i) => (
            <View style={styles.scorebox}>
              <Text style={styles.holeFont}>{deet.hole}</Text>
              <Text style={styles.parFont}>{deet.par}</Text>

              {deet.playerScore.map(golfer => {

                return(
                  <TouchableOpacity
                  // key={i}
                  onPress={() => changeScreen(deet, i, golfer.player)}
                >
                <Text style={styles.scoreFont}>{golfer.score}</Text>
                </TouchableOpacity>)
              })}
               </View>
          ))}
          </View>
        <View
          style={[styles.scorecard,
            //  { width: useWindowDimensions().width }
            ]}
        >
          {courseIn.map((deet, i) => (
            <View
              style={[styles.scorebox]}
            >
              <Text style={styles.holeFont}>{deet.hole}</Text>
              <Text style={styles.parFont}>{deet.par}</Text>
              {deet.playerScore.map(player => {
                console.log(player)
                return(
                  <TouchableOpacity
                  // key={i + 9 + player.name}
                  onPress={() => changeScreen(deet, i + 9, player.name)}
                >
                <Text style={styles.scoreFont}>{player.score}</Text>
                </TouchableOpacity>)
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
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scorecardbox: {
    // height: 800,
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
  parFont: {
    padding: "3px",
    borderBottom: "black 1px dotted",
    fontSize: "19px",
    // border: "black 1px solid"
  },
  scoreFont: { padding: "3px", fontSize: "22px" },
});
