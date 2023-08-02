import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import {
  NavigationContainer,
  Linking,
  Platform,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Score from './components/score.jsx';
import Scoreboard from './components/scoreboard.jsx';
import CourseSelect from './components/course.jsx';
import Login from './components/login.jsx';

const Stack = createNativeStackNavigator();


export default function App(props) {
  return (
    <NavigationContainer >
      <Stack.Navigator initalRouteName="Menu">
      <Stack.Screen
          name="Menu"
          component={Menu}
        />
      <Stack.Screen
          name="Login"
          component={Login}
          options={({ route }) => ({ type: route.params.type })}
        />
        {/* <Stack.Screen
          name="Join"
          component={Login}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Menu(props) {
  return (
    <View>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => navigation.navigate('Login', { type: "newgame" })}
      >
        <Text>Start a new game</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => navigation.navigate('Join', { type: "join" })}
      >
        <Text>Join a game</Text>
      </Pressable>
    </View>
  );
}

// function Login(props) {
//   const { navigation, route } = props;
//   console.log(route);
//   return route.params.type == "newgame" ? (
//       <Stack.Navigator independent={true}>
//         <Stack.Screen
//           name="Course"
//           component={CourseSelect}
//           // options={{ title: route.params.title }}
//           //   screenOptions={{title: route.params.title}}
//         />
//         <Stack.Screen
//           name="Scoreboard"
//           component={Scoreboard}
//           options={({ route }) => ({ title: route.params.title })}
//         />
//         <Stack.Screen
//           name="Score"
//           component={Score}
//           options={({ route }) => ({ scoreHole: route.params.scoreHole })}
//         />
//       </Stack.Navigator>
//   ) : (
//     <View>
//       <Text>Nah it's wrong.</Text>
//     </View>
//   );
// }
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //   marginTop: 22,
  },
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
});
