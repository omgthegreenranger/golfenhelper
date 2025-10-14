/* eslint-disable react-native/no-color-literals */
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { updateScores } from "./score";

export default function Score(props) {
  const { navigation, route } = props;
  const [key, setKey] = useState(route.params.key);
  const [hole, setHole] = useState(route.params.hole);
  const [player, setPlayer] = useState(route.params.player);
  const [players, setPlayers] = useState(route.params.players)
  const [tempScore, setTempScore] = useState();

  return (
    <View>
      <Text>
        Hole #{hole.hole}, Distance to Tee: {hole.distance}, Par: {hole.par}
      </Text>
      <View style={styles.holeScore}>
        <TextInput
          style={styles.holeBox}
          keyboardType="number-pad"
          onChangeText={(scoreNum) => {
            setTempScore(Number(scoreNum))}
          }
          // defaultValue={player.hole[key].score}
          clearTextOnFocus="true"
        ></TextInput>
      </View>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => updateScores()}
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
