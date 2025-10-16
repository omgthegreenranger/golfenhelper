import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import { styles } from "../login";


export default function PlayerSelect(props) {
  const { setButtonTree, buttonTree, setPlayerCount } = props;
  return (
    <View style={{ alignSelf: "center" }}>
      <Text>How many players?</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Pressable
          style={styles.playerButton}
          onPress={() => {
            setButtonTree([false, false, true, false]), setPlayerCount(1);
          }}
        >
          <Text style={styles.playercount}>1</Text>
        </Pressable>
        <Pressable
          style={styles.playerButton}
          onPress={() => {
            setButtonTree([false, false, true, false]), setPlayerCount(2);
          }}
        >
          <Text style={styles.playercount}>2</Text>
        </Pressable>
        <Pressable
          style={styles.playerButton}
          onPress={() => {
            setButtonTree([false, false, true, false]), setPlayerCount(3);
          }}
        >
          <Text style={styles.playercount}>3</Text>
        </Pressable>
        <Pressable
          style={styles.playerButton}
          onPress={() => {
            setButtonTree([false, false, true, false]), setPlayerCount(4);
          }}
        >
          <Text style={styles.playercount}>4</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function PlayerNames(props) {
  const {
    setButtonTree,
    buttonTree,
    playerCount,
    players,
    setPlayers,
  } = props;

  const playerNum = Array.from(
    { length: playerCount },
    (_, index) => index + 1
  );

  let playerNames = [];
  return (
    <View>
      {playerNum.map((player, i) => {
        if (i < playerCount) {
          playerNames[i] = "Player " + (i + 1);
          let playName = playerNames[i];
          return (
            <View style={styles.playerbox} key={i}>
              <TextInput
                style={styles.entername}
                key={i}
                defaultValue={playName}
                clearTextOnFocus="true"
                onChangeText={(playerNom) => {
                  playerNames[i] = playerNom;
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
          setButtonTree([false, false, false, true]), setPlayers(playerNames);
        }}
      ></Button>
    </View>
  );
}
