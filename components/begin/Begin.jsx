import { React, StrictMode, useContext, createContext, useState } from "react";
import Login from "../login/Login"
import ActiveGame from "../activegame/ActiveGame";
import {
    StyleSheet,
    LogBox,
    Switch,
    View,
    Text
} from "react-native";
import {
    NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function Begin() {
    return (
        // <StrictMode>
        <NavigationContainer
            style={styles.container}
        >
            <Stack.Navigator initialRouteName="Login"
                style={styles.container}
                screenOptions={{
                    headerStyle: { elevation: 0 },
                }}
            >
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="ActiveGame"
                    component={ActiveGame}
                />
                {/* <Stack.Screen
          name="End"
          component={End}
        /> */}
            </Stack.Navigator>
        </NavigationContainer>

        // </StrictMode>
    );
}


const styles = StyleSheet.create({
    // eslint-disable-next-line react-native/no-color-literals
    container: {
        alignItems: "center",
        backgroundColor: "#8BC34A",
        justifyContent: "center",
    },
});
