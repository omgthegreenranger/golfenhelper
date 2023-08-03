import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
  TextInput
} from "react-native";

export default function Login(props) {
  const { navigation, route } = props;
  const [buttonTree, setButtonTree] = useState([true,false,false])

  return(
    <>
      {buttonTree[0] ? <StartButton setButtonTree={setButtonTree} /> : ''}
      {buttonTree[1] ? <PlayerSelect setButtonTree = {setButtonTree} /> : ''}
      {buttonTree[2] ? <PlayerNames setButtonTree = {setButtonTree} navigation = {navigation} /> : ''}
    </>
  )

}

function StartButton(props) {  
  const { setButtonTree } = props;
  return (
    <View>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setButtonTree([false,true,false])}
      >
        <Text>Start Game</Text>
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
});


function PlayerSelect(props) {
  const{setButtonTree, buttonTree } = props
  return(
    <View>
      <View>
      <Text>
        How many players?
      </Text>
      </View>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setButtonTree([false, false, true])}
      >
        <Text>1</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setButtonTree([false, false, true])}
      >
        <Text>2</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setButtonTree([false, false, true])}
      >
        <Text>3</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setButtonTree([false, false, true])}
      >
        <Text>4</Text>
      </Pressable>
    </View>
  )
}

function PlayerNames(props) {
  const{setButtonTree, buttonTree, navigation } = props
return(
  <View>
<Pressable
style={[styles.button, styles.buttonClose]}
onPress={() => navigation.navigate("Course")}
>
<Text>First Player</Text>
</Pressable>
</View>
)
}