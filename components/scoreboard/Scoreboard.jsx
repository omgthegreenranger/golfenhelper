/* eslint-disable react-native/no-color-literals */
import React, { useRef, useState, useContext } from "react";
import Score from "../score/Score";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Button,
} from "react-native";
import { changeScreen } from "../../scripts/navigation";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { progressHole } from "./scoreboard";
import { SetupContext } from "../../App";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Game = createNativeStackNavigator();

export default function Scoreboard(props) {
  const {course, holes, setHoles, holeInfo, setHoleInfo, gamePlay, setGamePlay } = props;
  console.log(props);
  const { holesLoading } = useContext(SetupContext);
  const navigation = useNavigation();
  console.log("Players:", gamePlay);
  console.log("Holes:", holes);
  const [progress, setProgress] = useState(0);
  const [progression, setProgression] = useState(false)
  // const holeRef = useRef(null)

  let holesOut = holes.slice(0, 9);
  let holesIn = holes.slice(9, 18);
  console.log(gamePlay)
  return (
    <>
      <View>
        {holesLoading ?
          <View>
            <Text>Loading Scores</Text>
          </View> :
          <>
            <View style={styles.scorecardbox}>
              <View
                style={styles.scorecard}
              >
                <View>
                  <Text style={styles.sideHoleFont}>Hole</Text>
                  <Text style={styles.sideParFont}>Par</Text>
                  {gamePlay.map((golfer, i) => {
                    let initials = golfer.player.match(/(\b\S)?/g).join("").toUpperCase()
                    return (
                      <Text style={styles.sideNameFont} key={i}>
                        {initials}
                      </Text>
                    );
                  })}
                </View>
                {holesOut.map((deet, i) => {
                  let scorestyle;
                  if (progress === i) {
                    scorestyle = styles.scoreboxNow;
                  } else {
                    scorestyle = styles.scoreboxThen;
                  }
                  return (
                    <View style={[styles.scorebox, scorestyle]} key={i}>
                      <Text style={styles.holeFont}>{deet.hole}</Text>
                      <Text style={styles.parFont}>{deet.par}</Text>
                      {gamePlay.map((golfer, j) => {
                        return (
                          <TouchableOpacity
                            style={styles.button}
                            key={j}
                            onPress={() => {
                              setHoleInfo({"hole": deet, "key": i, "player": golfer, "players": gamePlay}); holeRef.current?.focus();}}
                              // changeScreen(deet, i, golfer, gamePlay)}
                          >
                            <Text style={styles.scoreFont}>
                              {golfer.scores[i]}</Text>
                              {/* {holeRef}</Text> */}
                              {/* </Text> */}
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
              <View
                style={[styles.scorecard, { width: useWindowDimensions().width }]}
              >
                <View>
                  <Text style={styles.sideHoleFont}>Hole</Text>
                  <Text style={styles.sideParFont}>Par</Text>
                  {gamePlay.map((golfer, i) => {
                    let initials = golfer.player.match(/(\b\S)?/g).join("").toUpperCase()
                    return (
                      <Text style={styles.sideNameFont} key={i}>
                        {initials}
                      </Text>
                    );
                  })}
                </View>
                {holesIn.map((deet, i) => {
                  let scorestyle;
                  if (progress === i + 9) {
                    scorestyle = styles.scoreboxNow;
                  } else {
                    scorestyle = styles.scoreboxThen;
                  }
                  return (
                    <View style={[styles.scorebox, scorestyle]} key={i + 9}>
                      <Text style={styles.holeFont}>{deet.hole}</Text>
                      <Text style={styles.parFont}>{deet.par}</Text>
                      {gamePlay.map((golfer, j) => {
                        return (
                          <TouchableOpacity
                            key={j}
                            onPress={() => 
                                    setHoleInfo({"hole": deet, "key": i+9, "player": golfer, "players": gamePlay})}
                              // changeScreen(deet, i + 9, golfer, players)}
                          >
                            <Text style={styles.scoreFont}>
                              {golfer.scores[i + 9]}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            </View>
            <View>
              <Text>Total Score</Text>
              <Text>Course Par</Text>
              {progression ?
                <Button style={[styles.button, styles.goButton]}
                  title="Next Hole"
                  onPress={() => { setProgression(!prevState); navigation.navigate('Score') }}
                />
                : <></>}
            </View>
            <StatusBar style="auto" />
          </>}
      </View >
    </>
  );
}

const styles = StyleSheet.create({
  holeFont: {
    backgroundColor: "#FFC300",
    fontSize: "24px",
    paddingTop: 3,
  },
  parFont: {
    fontSize: "19px",
    padding: "3px",
  },
  scoreFont: { fontSize: "22px", padding: "3px", },
  scorebox: {
    backgroundColor: "white",
    border: "black 1px solid",
    flex: 1,
    justifyContent: "stretch",
    margin: 0,
    textAlign: "center",
  },
  scoreboxNow: {
    backgroundColor: "green",
  },
  scoreboxThen: {
    backgroundColor: "yellow",
  },
  scorecard: {
    alignItems: "flex-start",
    backgroundColor: "grey",
    flex: 3,
    flexDirection: "row",
    flexWrap: 9,
    padding: 10,
  },
  scorecardbox: {
    // height: 800,
  },
  sideHoleFont: {
    fontSize: "24px",
    paddingTop: 3,
  },
  sideNameFont: {
    fontSize: "22px",
    padding: "3px",
  },
  sideParFont: {
    fontSize: "19px",
    padding: "3px",
  },
});
