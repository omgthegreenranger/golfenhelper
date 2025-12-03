import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
} from "react-native";
// import { styles } from "../login";
import { SetupContext } from "../../App";
import playersJSON from "../../test-data/players.json" with { type: 'json' }
import { useNavigation } from "@react-navigation/native";

// create primary Players component here

export default function Players({ route }) {
  const { pickedCourse } = route.params;
  const navigation = useNavigation(); // for screen navigation
  const { tempApi } = useContext(SetupContext);
  const [players, setPlayers] = useState([])

  useEffect(() => {
    if (tempApi === true) { setPlayers(playersJSON.players) }
    if (!tempApi) { setPlayers(["","","",""])}
  }, [])
  return (
    <View>
      {players.map((player, i) => {
        let playName;
        console.log("The Players", players)
        if (i < 4) {
          if (tempApi) {
            playName = player
          } else {
            // playerNames[i] = "Player " + (i + 1);
            playName = "Player " + (i + 1);
          }
          return (
            <View style={styles.playerbox} key={i}>
              <TextInput
                style={styles.entername}
                key={i}
                defaultValue={playName}
                clearTextOnFocus="true"
                onChangeText={(playerNom) => {
                  players[i] = playerNom;
                }}
              ></TextInput>
            </View>
          );
        }
      })}
      <Button
        style={[styles.button, styles.goButton]}
        title="Start Game!"
        onPress={() => {
          navigation.navigate("confirm",
            {
              pickedCourse: pickedCourse,
              players: players
            }
          )
        }}
      ></Button>
    </View>
  );
}

export const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    elevation: 2,
    margin: 10,
    padding: 20,
  },
  course: {
    padding: 10,
  },
  entername: {
    borderColor: "black",
    borderWidth: 1,
    fontSize: "larger",
    fontStyle: "italic",
  },
  goButton: {
    backgroundColor: "#2196F3",
  },
  playerButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    elevation: 2,
    margin: 5,
    padding: 5,
  },
  playerbox: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  playercount: {
    fontSize: "xxx-large",
    fontStyle: "bold",
    margin: 10,
    padding: 10,
  },
  recapBlock: {
    backgroundColor: "green",
    flexDirection: "column",
    padding: 15,
  },
  recapCourseBlock: {
    backgroundColor: "#C2B280",
    borderColor: "brown",
    borderRadius: 10,
    borderWidth: 2,
    margin: 15,
    padding: 5,
  },
  recapPlayersBlock: {
    backgroundColor: "#C2B280",
    borderColor: "brown",
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: "row",
    margin: 15,
    padding: 5,
  }

});
