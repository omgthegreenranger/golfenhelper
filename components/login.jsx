/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
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
          <></>
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
      <View>
      <Text>Please choose a course:</Text>
      </View>
      {courses.courses.map((course, i) => {
        return (
          <View style={styles.course} key={i}>
            <Button
              key={i}
              title={course.name}
              style={styles.button}
              onPress={() => {
                setPickedHole(i);
                setButtonTree([false, true, false, false]);
              }}
            ></Button>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Text>{course.address}</Text>
              <Text>Current weather</Text>
            </View>
          </View>
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

function GameReview(props) {
  const { pickedHole, playerCount, players, navigation } = props;
  let course = courses.courses[pickedHole];
  let holeCount = course.holes.length;

  let holeValue = Array.from({ length: holeCount }, (_, index) => 0);

  const courseInfo = { name: course.name, address: course.address };
  const playerInfo = players.map((player, i) => {
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
    <View style={styles.recapBlock}>
      <Text>Round details recap</Text>
      <View style={styles.recapCourseBlock}>
        <Text>{scoreCard.course.name}</Text>
        <Text>{scoreCard.course.address}</Text>
      </View>
      <View style={styles.recapPlayersBlock}>
        {scoreCard.players.map((golfer, i) => {
          return <Text key={i}>{golfer.player}</Text>;
        })}
      </View>
      <Pressable
        style={[styles.button, styles.goButton]}
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
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
});
