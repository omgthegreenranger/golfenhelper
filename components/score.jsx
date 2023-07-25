
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import courses from "../course.json";

export default function Score(props) {
    const { putScore, setPutScore, holeScore, setHoleScore, navigation } = props;

    console.log("Hey, we're here guy.")

    return(
    <View>
            <Text>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => navigation.navigate("Scoreboard")}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
    </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   marginTop: 22,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });