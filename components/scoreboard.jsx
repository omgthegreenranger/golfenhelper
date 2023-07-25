import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Dimensions, useWindowDimensions, useScreenDimensions } from 'react-native';
import courses from "../course.json";


export default function Scoreboard(props) {
  const {navigation, route} = props;
  const {title} = route.params;
  console.log(route, navigation);
  // const {height, width} = useScreenDimensions()
  const [course, setCourse] = useState(courses.courses[route.params.courseId]);
  const [holeScore, setHoleScore] = useState({})
  const [putScore, setPutScore] = useState([false, 0])
  console.log(course);
  console.log(useWindowDimensions(window).width)
  // let totalScore = course.reduce((course.))

  

  return (
    <View style={[styles.container, {height: useWindowDimensions(window).height}, {width: useWindowDimensions().width}]}>
      <Text style={styles.courseName}>{course.name}</Text>
      <View style={[styles.scorecard, {width: useWindowDimensions().width}]}>
      {course.holes.map(hole => (
        <TouchableOpacity
          key={hole.number}
          style={[styles.scorebox, {borderLeft: 'black 1px solid', borderRight: 'black 1px solid', borderTop: 'black 1px solid', borderBottom: 'black 1px solid'}]}
          onPress={() => navigation.navigate('Score')}
            >
          <Text style={{backgroundColor: '#FFC300', paddingTop: 3, borderBottom: 'black 2px solid'}}>{hole.number}</Text>
          <Text style={{padding: '3px', borderBottom: 'black 1px dotted'}}>{hole.par}</Text>
          <Text style={{padding: '3px'}}>0</Text>
        </TouchableOpacity>))}
      </View>
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
