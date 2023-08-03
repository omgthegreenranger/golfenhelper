import { StyleSheet, Text, View, TextInput, Pressable, useWindowDimensions } from "react-native";
import courses from "../course.json";
import React, {useState} from 'react';


export default function Score(props) {
  const { navigation, route } = props;
  const [hole, setHole ] = useState(route.params.key);
  const [holeScore, setHoleScore ] = useState(route.params.holeScore[hole]);
  const [tempScore, setTempScore ] = useState([]);

  const player = holeScore.playerScore.filter(golfer =>
    {
      if(golfer.player === route.params.player) {
        console.log("This worked!")
        return(golfer)
      } else {
        console.log("We'll do something about this soon")
      }
      return
    }
    )
  function updateScores() {

    const newScore = holeScore.map(score => {
      if(tempScore.hole === score.hole) {
        console.log("YASSSS")
        return {...score, score: tempScore.score}
      }
      return score;
    });

    setHoleScore(newScore)
    console.log(newScore)
    navigation.navigate('Scoreboard', {title: route.params.title, scoreReturn: newScore})
  }
  return (
    <View>
      <Text>
        Hole #{holeScore.hole}, Distance to Tee: {holeScore.distance}, Par: {holeScore.par}
      </Text>
      <View style={styles.holeScore}>
        <TextInput style={styles.holeBox} onChangeText={scoreNum => setTempScore({hole: holeScore.hole, distance: holeScore.distance, par: holeScore.par, score: scoreNum})} defaultValue={holeScore.score} clearTextOnFocus="true"></TextInput>
      </View>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        // onPress={() => navigation.navigate('Scoreboard', {title: route.params.title, hole: hole})
        onPress={() => updateScores()
        }
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
})
