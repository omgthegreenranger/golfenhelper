import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import courses from "../course.json";

export default function Login(props) {
  const { navigation, route } = props;
  const [buttonTree, setButtonTree] = useState([true, false, false, false]);
  const [playerCount, setPlayerCount] = useState();
  const [players, setPlayers] = useState([]);
  const [pickedHole, setPickedHole] = useState();

  return (
    <View>
      <View>
        {buttonTree[0] ? (
          <CourseSelect
            setButtonTree={setButtonTree}
            navigation={navigation}
            setPickedHole={setPickedHole}
          />
        ) : (
          ""
        )}
        {buttonTree[1] ? (
          <PlayerSelect
            setButtonTree={setButtonTree}
            setPlayerCount={setPlayerCount}
          />
        ) : (
          <></>
        )}
        {buttonTree[2] ? (
          <PlayerNames
            setButtonTree={setButtonTree}
            playerCount={playerCount}
            setPlayers={setPlayers}
            players={players}
          />
        ) : (
          <></>
        )}
        {buttonTree[3] ? (
          <GameReview
            navigation={navigation}
            pickedHole={pickedHole}
            playerCount={playerCount}
            players={players}
          />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

function CourseSelect(props) {
  const { setButtonTree, buttonTree, setPickedHole } = props;

  return (
    <View>
      {courses.courses.map((course, i) => {
        return (
          <Pressable
            key={i}
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setPickedHole(i);
              setButtonTree([false, true, false, false]);
            }}
          >
            <Text>{course.name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function PlayerSelect(props) {
  const { setButtonTree, buttonTree, setPlayerCount } = props;
  return (
    <View style={{ alignSelf: "center" }}>
      <Text>How many players?</Text>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Pressable
          style={[styles.button, styles.playerButton]}
          onPress={() => {
            setButtonTree([false, false, true, false]), setPlayerCount(1);
          }}
        >
          <Text>1</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.playerButton]}
          onPress={() => {
            setButtonTree([false, false, true, false]), setPlayerCount(2);
          }}
        >
          <Text>2</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.playerButton]}
          onPress={() => {
            setButtonTree([false, false, true, false]), setPlayerCount(3);
          }}
        >
          <Text>3</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.playerButton]}
          onPress={() => {
            setButtonTree([false, false, true, false]), setPlayerCount(4);
          }}
        >
          <Text>4</Text>
        </Pressable>
      </View>
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
      <TouchableOpacity
        style={[styles.button, styles.goButton]}
        onPress={() => {
          setButtonTree([false, false, false, true]), setPlayers(playerNames);
        }}
      >
        <Text>Let's go!</Text>
      </TouchableOpacity>
    </View>
  );
}

function GameReview(props) {
  const { pickedHole, playerCount, players, navigation } = props;
  let course = courses.courses[pickedHole];
  let holeCount = course.holes.length;

  let holeValue = Array.from({ length: holeCount }, (_, index) => "0");

  const courseInfo = { name: course.name, address: course.address };
  const playerInfo = players.map((player) => {
    return {
      player: player,
      scores: holeValue,
    };
  });
  const holeInfo = course.holes.map((hole) => {
    return {
      ...hole,
      hole: hole.hole,
      distance: hole.distance,
      par: hole.par,
    };
  });
  const scoreCard = {
    course: courseInfo,
    holes: holeInfo,
    players: playerInfo,
  };
  return (
    <View>
      <View>
        <Text>{scoreCard.course.name}</Text>
        <Text>{scoreCard.course.address}</Text>
      </View>
      <View>
        {scoreCard.players.map((golfer, i) => {
          return(
        <Text>{golfer.player}</Text>
       ) })}
      </View>
      <TouchableOpacity
        style={[styles.button, styles.buttonClose]}
        onPress={() =>
          navigation.navigate("Scoreboard", {
            // scoreCard: scoreCard,
            course: courseInfo,
            players: playerInfo,
            holes: holeInfo,

          })
        }
      >
        <Text>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  playerButton: {
    backgroundColor: "#2196F3",
  },
  goButton: {
    backgroundColor: "#2196F3",
  },
  startButton: {
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
  background: {
    flex: 1,
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
