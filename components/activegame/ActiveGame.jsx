/* eslint-disable react-native/no-color-literals */
import { React, useRef, useState, useContext, createRef, createContext, useEffect } from "react";
import { Scoreboard, Score } from "../index";
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
import { FinishCheck } from "./activegame";
// import { ScoringContext } from "./activegame";

const Game = createNativeStackNavigator();

export const ScoringContext = createContext();
const ScoringContextProvider = ({ children }) => {
  const [course, setCourse] = useState([])
  const [activeHole, setActiveHole] = useState(0); // set the hole being chosen
  // const [tempScore, setTempScore] = useState(); // temporary chosen score as State
  const [player, setPlayer] = useState(0); // player State - set to one player
  const [gamePlay, setGamePlay] = useState([]); // players list for score
  const [holes, setHoles] = useState([]); // default holes reference list

  return (
    <ScoringContext.Provider value={{
      course: [
        course,
        setCourse],
      holes: [
        holes,
        setHoles
      ],
      activeHole: [
        activeHole,
        setActiveHole
      ],
      tempScore: [
        tempScore,
        setTempScore
      ],
      player: [
        player,
        setPlayer
      ],
      gamePlay: [
        gamePlay,
        setGamePlay
      ]
    }}>
      {children}
    </ScoringContext.Provider>
  )
}

export default function ActiveGame({ route }) {
  const { holesLoading } = useContext(SetupContext);
  console.log(holesLoading)
  const [course, setCourse] = useState(route.params.course)
  const [activeHole, setActiveHole] = useState(0); // set the hole being chosen
  const [tempScore, setTempScore] = useState(); // temporary chosen score as State
  const [player, setPlayer] = useState(0); // player State - set to one player
  const [gamePlay, setGamePlay] = useState(route.params.players); // players list for score
  const [holes, setHoles] = useState(route.params.holes); // default holes reference list
  const [scoreChange, setScoreChange] = useState(false);

  // Console this data for our reference
  console.log("Game level - players", gamePlay)
  console.log("Game level - holes loading", holesLoading)
  console.log("Score change", scoreChange)
  console.log("Player", player)
  scoreChange ? FinishCheck(gamePlay, player) : ""


  return (

      <View>
        <View>
          <Score
          course={course}
          holes={holes}
          setHoles={setHoles}
          gamePlay={gamePlay}
          setGamePlay={setGamePlay}
          activeHole={activeHole}
          setActiveHole={setActiveHole}
          player={player}
          setPlayer={setPlayer}
          setScoreChange = {setScoreChange}
          />
        </View>
        <View>
          <Scoreboard
          course={course}
          holes={holes}
          setHoles={setHoles}
          gamePlay={gamePlay}
          setGamePlay={setGamePlay}
          activeHole={activeHole}
          setActiveHole={setActiveHole}
          setPlayer={setPlayer}
          scoreChange={scoreChange}
          />
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
