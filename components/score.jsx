import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import courses from "../course.json";

export default function Score(props) {
  const { navigation, route } =
    props;
  let hole = route.params.hole
  return (
    <View>
      <Text>Hole #{hole.hole}, Distance to Tee: {hole.distance}, Par: {hole.par}</Text>
      <View style={styles.centeredView}>
        <TextInput defaultValue="0"></TextInput>
      </View>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => navigation.navigate('Scoreboard', {title: route.params.title})}
      >
        <Text style={styles.textStyle}>Submit score</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
