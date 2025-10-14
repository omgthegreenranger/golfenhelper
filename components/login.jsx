/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  Animated
} from "react-native";
// import courses from "../course.json";
import CourseSelect from "./course";
import { PlayerSelect, PlayerNames } from "./players";

export default function Login(props) {
  const { navigation, route } = props;
  const [buttonTree, setButtonTree] = useState([true, false, false, false]);
  // const [playerCount, setPlayerCount] = useState(); // temporary for dev
  // const [players, setPlayers] = useState([]);
  const [playerCount, setPlayerCount] = useState(1); // temporary for dev
  const [players, setPlayers] = useState(["Player 1"]) // temporary for dev
  const [pickedCourse, setPickedCourse] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseLoading, setCourseLoading] = useState(true);
  const [holeDetails, setHoleDetails] = useState([]);
  const [holeLoading, setHoleLoading] = useState(true);

  function resetButtons() {
    setButtonTree([true, false, false, false]);
    setPickedCourse();
    setCourseLoading(true);
  }

  async function courseList() {
    const coursesFetch = await fetch('https://www.overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: "[out:json][timeout:25];way(around:10000,43.6886058, -79.3004177)[\"leisure\"=\"golf_course\"];out tags;"
    })
      .then(response => response.json())
      .then(data => { console.log("Fetched data success: ", data); setCourses(data); setCourseLoading(false) })
      .catch(error => console.error("Sorry, no working.", error));
    ;

  }
  useEffect(() => { courseList() }, []);

  return (
    <View>
      <View>
        {buttonTree[0] ? (
          <CourseSelect
            setButtonTree={setButtonTree}
            navigation={navigation}
            setPickedCourse={setPickedCourse}
            courses={courses}
            setCourses={setCourses}
            courseLoading={courseLoading}
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
            pickedCourse={pickedCourse}
            playerCount={playerCount}
            players={players}
          //  holes={holes}
          //  setHoles={setHoles}
          />
        ) : (
          <></>
        )}
      </View>
      <Button
        style={[styles.button, styles.goButton]}
        title="Reset"
        onPress={() => {
          resetButtons();
        }}
      ></Button>
    </View>
  );
}

function GameReview(props) {
  const { pickedCourse, playerCount, players, navigation, courses} = props;
  const [course, setCourse] = useState([])
  const [holesLoading, setHolesLoading] = useState(true)
  let holes = [];
  async function getHoles() {
    await fetch('https://www.overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: "[out:json][timeout:25];way(" + pickedCourse.id + ");map_to_area ->.golfcourse;way[\"golf\"=\"hole\"](area.golfcourse)->.holes;.golfcourse out center;.holes out tags;"
    })
      .then(response => response.json())
      .then(data => { console.log("The data", data); setCourse(data); setHolesLoading(false) })
      .catch(error => console.error("Sorry, no working.", error));
    ;
  }
  useEffect(() => { getHoles() }, []);
  console.log("Holes Loading: ", holesLoading)
  if (!holesLoading) {
    // console.log("Let's go!", course)
    let i = 0
    course.elements.map((hole) => {
      if (hole.tags.golf === "hole") {
        console.log("hole info", i, hole.tags)
        holes[i] = { "hole": hole.tags.ref, "par": hole.tags.par };
        i++
      }
    })
  }
  holesLoading ? console.log("Still going") : console.log("Done!", holes)




  let holeCount = holes.length;

  let holeValue = Array.from({ length: holeCount }, (_, index) => 0);

  const courseInfo = { name: pickedCourse.tags.name, address: pickedCourse.address };
  const playerInfo = players.map((player, i) => {
    return {
      player: player,
      scores: holeValue,
    };
  });
  const holeInfo = holes.map((hole) => {
    return {
      ...hole,
      hole: parseInt(hole.hole),
      distance: hole.distance,
      par: hole.par,
    };
  });
  const scoreCard = {
    course: courseInfo,
    holes: holeInfo,
    players: playerInfo,
  };
  console.log(scoreCard)
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
            scoreCard: scoreCard,
            // course: courseInfo,
            // players: playerInfo,
            // holes: holeInfo,
            holes: holes,
          //  setHoles: setHoles
          })
        }
      >
        <Text>Start Game</Text>
      </Pressable>
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
