/* eslint-disable react-native/no-color-literals */
import React, { use, useState, useContext } from "react";
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

export default function ActiveGame({ route }) {
  // const [scoreCard, setScoreCard] = useState(route.params.scoreCard)
  return (
    <Game.Navigator>
      <Game.Screen
        name="scoreboard" component={Scoreboard} />
      <Game.Screen name="Score" component={Score} screenOptions={{ presentation: 'modal' }} />
    </Game.Navigator>
  );
}

function Scoreboard({ route }) {
  const { holesLoading } = useContext(SetupContext);
  const navigation = useNavigation();
  const course = route.params.course;
  const [holes, setHoles] = useState(route.params.holes);
  const [players, setPlayers] = useState([]);
  const [progress, setProgress] = useState(0);
  setPlayers(route.params.players);
  console.log("Params", route.params)
  console.log("Players:", players);
  console.log("Holes:", holes);
  const [progression, setProgression] = useState(false)
  function changeScreen(hole, index, player, players) {
    navigation.navigate("Score", {
      hole: hole,
      key: index,
      player: player,
      players: players,
    });
  }
  let holesOut = holes.slice(0, 9);
  let holesIn = holes.slice(9, 18);

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
                  {players.map((golfer, i) => {
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
                      {players.map((golfer, j) => {
                        return (
                          <TouchableOpacity
                            style={styles.button}
                            key={j}
                            onPress={() => changeScreen(deet, i, golfer, players)}
                          >
                            <Text style={styles.scoreFont}>{golfer.scores[i]}</Text>
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
                  {players.map((golfer, i) => {
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
                      {players.map((golfer, j) => {
                        return (
                          <TouchableOpacity
                            key={j}
                            onPress={() => changeScreen(deet, i + 9, golfer, players)}
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
