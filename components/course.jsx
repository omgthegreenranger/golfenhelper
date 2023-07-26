    import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, Dimensions, useWindowDimensions, useScreenDimensions } from 'react-native';
import courses from "../course.json";

export default function CourseSelect(props) {
    const {navigation, route} = props;
console.log(navigation, route)
    return(
        <View>
            {courses.courses.map((course, i) => {
            console.log(i)
                return(
                    <Pressable
                        key={i} 
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {navigation.navigate('Scoreboard', {title: course.name, courseId: i})}}>
                        <Text>{course.name}</Text>
            </Pressable>

)})}
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