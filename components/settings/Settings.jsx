import { React, StrictMode, useContext, createContext, useState } from "react";
import {
  StyleSheet,
  LogBox,
  Switch,
  View,
  Text
} from "react-native";
import { SetupContext } from "../../App";

export default function Settings() {
    const { tempApi, setTempApi } = useContext(SetupContext);

  return(
    // <SetupContextProvider>
    <View>
        <View>
            <Switch
                onValueChange={() => {setTempApi(previousState => !previousState)}}
                value={tempApi}
            />
        </View>
        <View>
            <Text>Use TempData? {String(tempApi).toUpperCase()}</Text>
        </View>
      </View>
    // </SetupContextProvider>
  )
}
