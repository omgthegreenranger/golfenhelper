import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Dimensions, useWindowDimensions } from 'react-native';
import courses from "./course.json";
import Score from "./components/score.jsx";


export default function App() {
  const {height, width} = useWindowDimensions()
  const [course, setCourse] = useState(courses.courses[0]);
  const [holeScore, setHoleScore] = useState({})
  const [putScore, setPutScore] = useState([false, 0])
  console.log(course);
  console.log(useWindowDimensions().height)
  // let totalScore = course.reduce((course.))

  function pressScore(hole) {
    setPutScore([true, hole]);
    var hole = hole;
    console.log("Yes!", putScore, hole)

  }
  

  return (
    <View style={[styles.container, {height: useWindowDimensions().height}, {width: useWindowDimensions().width}]}>
      <Text style={styles.courseName}>{course.name}</Text>
      <View style={[styles.scorecard, {width: useWindowDimensions().width}]}>
      {course.holes.map(hole => (
        <TouchableOpacity
          key={hole.number}
          style={[styles.scorebox, {borderLeft: 'black 1px solid', borderRight: 'black 1px solid', borderTop: 'black 1px solid', borderBottom: 'black 1px solid'}]}
          onPress={() => pressScore(hole.number)}
            >
          <Text style={{backgroundColor: '#FFC300', paddingTop: 3, borderBottom: 'black 2px solid'}}>{hole.number}</Text>
          <Text style={{padding: '3px', borderBottom: 'black 1px dotted'}}>{hole.par}</Text>
          <Text style={{padding: '3px'}}>0</Text>
        </TouchableOpacity>))}
      </View>
      <Score putScore={putScore} setPutScore={setPutScore} holeScore={holeScore} setHoleScore={setHoleScore}/>
      <View style={styles.container}>
        <Text>Total Score</Text>
        <Text>Course Par</Text>
      </View>
      <StatusBar style="auto" />
    </View>

  );

}

const styles = StyleSheet.create(
  {
  
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'black 2px solid',
  },
  courseName: {
    padding: 10,
    fontWeight: 'bold'
  },
  scorecard: {
    flex: 10,
    flexDirection: 'row',
    backgroundColor: 'grey',
    alignItems: 'center',
    padding: 10
    // justifyContent: 'space-evenly',
    // alignSelf: 'stretch'
  },
  scorebox: {
    flex: 1,
    backgroundColor: 'white',
    margin: 0,
    justifyContent: 'stretch',
    textAlign: 'center'
  }
});
