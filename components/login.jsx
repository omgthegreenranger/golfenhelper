import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
  TextInput,
} from "react-native";

export default function Login(props) {
  const { navigation, route } = props;
  const [buttonTree, setButtonTree] = useState([true, false, false]);
  const [playerCount, setPlayerCount] = useState();
  const [players, setPlayers] = useState([]);

  return (
    <>
      {buttonTree[0] ? <StartButton setButtonTree={setButtonTree} /> : ""}
      {buttonTree[1] ? (
        <PlayerSelect
          setButtonTree={setButtonTree}
          setPlayerCount={setPlayerCount}
        />
      ) : (
        ""
      )}
      {buttonTree[2] ? (
        <PlayerNames
          setButtonTree={setButtonTree}
          navigation={navigation}
          playerCount={playerCount}
          setPlayers={setPlayers}
          players={players}
        />
      ) : (
        ""
      )}
    </>
  );
}

function StartButton(props) {
  const { setButtonTree } = props;
  return (
    <View>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setButtonTree([false, true, false])}
      >
        <Text>Start Game</Text>
      </Pressable>
    </View>
  );
}

function PlayerSelect(props) {
  const { setButtonTree, buttonTree, setPlayerCount } = props;
  return (
    <View>
      <View>
        <Text>How many players?</Text>
      </View>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => {
          setButtonTree([false, false, true]), setPlayerCount(1);
        }}
      >
        <Text>1</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => {
          setButtonTree([false, false, true]), setPlayerCount(2);
        }}
      >
        <Text>2</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => {
          setButtonTree([false, false, true]), setPlayerCount(3);
        }}
      >
        <Text>3</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => {
          setButtonTree([false, false, true]), setPlayerCount("4");
        }}
      >
        <Text>4</Text>
      </Pressable>
    </View>
  );
}

function PlayerNames(props) {
  const {
    setButtonTree,
    buttonTree,
    navigation,
    playerCount,
    players,
    setPlayers,
  } = props;

  //Take the number of players from the last selection and create the player name prompt for each.

  const playerNum = Array.from(
    { length: playerCount },
    (_, index) => index + 1
  );

  let playerNames = [];

  function playerSubmit(playerNames) {
    navigation.navigate("Course", { players: playerNames });
  }

  return (
    <View>
      {playerNum.map((player, i) => {
        if (i < playerCount) {
          playerNames[i] = "Player " + (i + 1);
          let playName = playerNames[i];
          return (
            <View>
              <Text style={styles.playername}>{playName}</Text>
              <TextInput
                style={styles.entername}
                key={i}
                defaultValue={playName}
                onChangeText={(playerNom) => {
                  playerNames[i] = playerNom;
                }}
              ></TextInput>
            </View>
          );
        }
      })}
      <Pressable
        style={[styles.button, styles.buttonClose]}
        // onPress={() => {navigation.navigate("Course", {players: playerNames})}}
        onPress={() => playerSubmit(playerNames)}
      >
        <Text>Let's go!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
  playername: {
    fontStyle: "bold",
    fontSize: "large",
  },
  entername: {
    fontStyle: "italic",
    fontSize: "larger",
  },
});
