/* eslint-disable react-native/no-color-literals */
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { updateScores } from "./score";
import { useNavigation } from "@react-navigation/native";


export default function Score(
  {course, setCourse, holes, setHoles, gamePlay, setGamePlay, activeHole, setActiveHole, player, setPlayer, setScoreChange}
  ) {
  const [tempScore, setTempScore] = useState({"key": 1, "score": 0})

  const hole = hole[activeHole];
  const navigation = useNavigation();



  return (
    <View>
      <Text>
        Hole #{hole.hole}, Distance to Tee: {hole.distance}, Par: {hole.par}, Player: {gamePlay[player].player}
      </Text>
      <View style={styles.holeScore}>
        <TextInput
          style={styles.holeBox}
          keyboardType="number-pad"
          clearTextOnFocus="true"
          value={tempScore.score}
          onChangeText = {text => setTempScore({"key": activeHole, "score": Number(text)})}
        ></TextInput>
      </View>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => {
          setGamePlay(updateScores(player, gamePlay, tempScore))
          setScoreChange(true)
          console.log(gamePlay);
          navigation.nav
        }}
      >
        <Text style={styles.textStyle}>Submit score</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    elevation: 2,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  holeBox: {
    textAlign: "center",
  },
  holeScore: {
    alignItems: "center",
    border: "brown 3px solid",
    borderRadius: 2,
    flex: 1,
    justifyContent: "center",
    margin: 22,
    padding: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
