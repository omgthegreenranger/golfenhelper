import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function Score(props) {
  const { navigation, route } = props;
  const [key, setKey] = useState(route.params.key);
  const [hole, setHole] = useState(route.params.hole);
  const [player, setPlayer] = useState(route.params.player);
  const [players, setPlayers] = useState(route.params.players)
  const [tempScore, setTempScore] = useState();

  function updateScores() {
    const playerScore = player.scores.map((score, i) => {
      if (i === key) {
        return(tempScore)
      }
        
      return(score)
    })
    const playerList = players.map((playName) => {
      if(playName.player == player.player) {
        return({
          player: player.player,
          scores: playerScore}
        )
      } else {
        return({
          player: playName.player,
          scores: playName.scores}
        )
      }
    })

    navigation.navigate("Scoreboard", {
      players: playerList,
      });
  }
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
            setTempScore(scoreNum)}
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
  holeScore: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 22,
    padding: 15,
    border: "brown 3px solid",
    borderRadius: 2,
  },
  holeBox: {
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
