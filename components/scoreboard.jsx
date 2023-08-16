/* eslint-disable react-native/no-color-literals */
import React, { useState} from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Button,
} from "react-native";

export default function Scoreboard(props) {
  const { navigation, route } = props;
  const [holes, setHoles] = useState(route.params.holes);
  const players = route.params.players;
  const [progress, setProgress] = useState(0);


  const progressHole = () => {
    for(let player of players){
      console.log(player)
      if (player.scores[progress] === 0) {
        console.log("Breaking this!", player.player, player.scores[progress])
        break;
      } else {
        console.log("This has a score!")
        return(true)
      }
    }
    return (false)
  }

  function changeScreen(hole, index, player) {
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
    <View>
      <View style={styles.scorecardbox}>
        <View
          style={styles.scorecard}
        >
          <View>
            <Text style={styles.sideHoleFont}>Hole</Text>
            <Text style={styles.sideParFont}>Par</Text>
            {players.map((golfer, i) => {
              console.log(golfer.player)
              
              let initials = golfer.player.match(/(\b\S)?/g).join("").toUpperCase()
              console.log(initials)

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
                      onPress={() => changeScreen(deet, i, golfer)}
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
              console.log(golfer.player)
              
              let initials = golfer.player.match(/(\b\S)?/g).join("").toUpperCase()
              console.log(initials)

              return (
                <Text style={styles.sideNameFont} key={i}>
                  {initials}
                </Text>
              );
            })}
          </View>
          {holesIn.map((deet, i) => {
            let scorestyle;
            if (progress === i+9) {
              scorestyle = styles.scoreboxNow;
            } else {
              scorestyle = styles.scoreboxThen;
            }
            return (
              <View style={[styles.scorebox, scorestyle]} key={i+9}>
                <Text style={styles.holeFont}>{deet.hole}</Text>
                <Text style={styles.parFont}>{deet.par}</Text>
                {players.map((golfer, j) => {
                  return (
                    <TouchableOpacity
                      key={j}
                      onPress={() => changeScreen(deet, i + 9, golfer)}
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
        {progressHole() ? 
        <Button style={[styles.button, styles.goButton]}
        title="Next Hole"
        onPress={() => progressHole()}
        />
        : <></>}
      </View>
      <StatusBar style="auto" />
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
  scoreFont: {  fontSize: "22px", padding: "3px",},
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
