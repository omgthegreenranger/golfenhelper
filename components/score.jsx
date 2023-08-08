import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  useWindowDimensions,
} from "react-native";
import courses from "../course.json";
import React, { useState } from "react";

export default function Score(props) {
  const { navigation, route } = props;
  const [hole, setHole] = useState(route.params.key);
  const [holeInfo, setHoleInfo] = useState(route.params.holeScore);
  const [holeScore, setHoleScore] = useState(holeInfo[hole]);
  const [tempScore, setTempScore] = useState([]);
  const playerName = route.params.player;

  console.log(playerName, route.params.player);

  const player = holeScore.playerScore.filter((golfer, i) => {
    if (golfer.player === route.params.player) {
      console.log("This worked!");
      return golfer;
    } else {
      console.log("We'll do something about this soon");
    }
    return;
  });

  console.log(player);
  function updateScores() {
    console.log(tempScore);
    // We're going to have to reassemble the entire thing again. Let's get our whole thing together.
    // let's update and reassemble the player scores

    const playerScore = holeScore.playerScore.map((player) => {
      console.log(player);
      console.log(tempScore);
      if (player.player === tempScore.player) {
        console.log(tempScore);
        return {
          ...playerScore,
          player: tempScore.player,
          score: tempScore.score,
        };
      } else {
        return {
          ...playerScore,
          player: player.player,
          score: player.score,
        };
      }
    });

    const holeUpdate = { ...holeScore, playerScore: playerScore };

    console.log(tempScore);
    console.log(playerScore);
    console.log(holeInfo);

    const holeList = holeInfo.map((hole) => {
      let holeDeets;
      console.log(hole);
      console.log(holeUpdate);
      if (hole.hole == holeUpdate.hole) {
        holeDeets = holeUpdate;
        console.log("yes", holeUpdate);
      } else {
        holeDeets = hole;
        console.log("no", holeDeets);
      }
      return {
        hole: holeDeets.hole,
        distance: holeDeets.distance,
        par: holeDeets.par,
        playerScore: holeDeets.playerScore,
      };
    });

    console.log(holeList);

    navigation.navigate("Scoreboard", {scoreReturn: holeList})
  }

  console.log(player);
  return (
    <View>
      <Text>
        Hole #{holeScore.hole}, Distance to Tee: {holeScore.distance}, Par:{" "}
        {holeScore.par}
      </Text>
      <View style={styles.holeScore}>
        <TextInput
          style={styles.holeBox}
          keyboardType="number-pad"
          onChangeText={(scoreNum) =>
            // setTempScore({player: player[0].player, score: scoreNum })
            setTempScore({ player: player[0].player, score: scoreNum })
          }
          defaultValue={holeScore.score}
          clearTextOnFocus="true"
        ></TextInput>
      </View>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        // onPress={() => navigation.navigate('Scoreboard', {title: route.params.title, hole: hole})
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
