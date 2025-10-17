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

export default function Score({course, holeInfo, setHoleInfo, gamePlay, setGamePlay}) {
  // const { route } = props;
  // const { key, hole, player, players } = route.params
  const {hole, key, player, players} = holeInfo[0];
  const [tempScore, setTempScore] = useState();
  const navigation = useNavigation();



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
            setTempScore(Number(scoreNum))
          }
          }
          clearTextOnFocus="true"
        ></TextInput>
      </View>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => {
          let scores = updateScores(player, players, key, tempScore);
          navigation.popTo('scoreboard', {

          // navigation.setParams({
            players: scores
        })
        // navigation.goBack();
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
