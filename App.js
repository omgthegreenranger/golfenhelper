import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import Score from './components/score.jsx';
import Scoreboard from './components/scoreboard.jsx';
import CourseSelect from './components/course.jsx';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Dimensions, useWindowDimensions, useScreenDimensions } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Course">
      <Stack.Screen
          name="Course"
          component={CourseSelect}
          // options={{title: route.params.title}}
          // screenOptions={{title: route.params.title}}
        />
        <Stack.Screen
          name="Scoreboard"
          component={Scoreboard}
          options={({ route }) => ({title: route.params.title})}
        />
        <Stack.Screen
          name="Score"
          component={Score}
          // options={{title: 'Enter Score'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create(
  {
  
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
