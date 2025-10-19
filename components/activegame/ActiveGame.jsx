/* eslint-disable react-native/no-color-literals */
import React, { useRef, useState, useContext } from "react";
import { Scoreboard, Score} from "../index";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Button,
} from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { progressHole } from "./activegame";
import { SetupContext } from "../../App";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Game = createNativeStackNavigator();

export default function ActiveGame({ route }) {
  const { holesLoading} = useContext(SetupContext);
  const course = route.params.course;
  const [gamePlay, setGamePlay] = useState(route.params.players); // players list for score
  const [holes, setHoles] = useState(route.params.holes); // default holes reference list
  const [holeInfo, setHoleInfo] = useState({"hole": 1, "key": 0, "player": gamePlay.player, "players": gamePlay}) // standard hole info package

  // Console this data for our reference
  console.log("Game level - players", gamePlay)
  console.log("Game level - hole", holeInfo)
  console.log("Game level - holes loading", holesLoading)

  
  // const [players, setPlayers] = useState([]);
  return (
    <View>
      <View>
        <Score course={course} holeInfo={holeInfo} setHoleInfo={setHoleInfo} gamePlay={gamePlay} setGamePlay={setGamePlay}/>
      </View>
      <View>
        <Scoreboard course={course} holes={holes} holeInfo={holeInfo} setHoles={setHoles} setHoleInfo={setHoleInfo} gamePlay={gamePlay} setGamePlay={setGamePlay} />
      </View>
    </View>
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
