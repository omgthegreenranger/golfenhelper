import { React, StrictMode, useContext, createContext, useState } from "react";
import Login from "./components/login/Login"
import ActiveGame from "./components/activegame/ActiveGame";
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
import { createRoot } from "react-dom/client";
// import { store } from './store/store';
// import { Provider } from 'react-redux'
LogBox.ignoreLogs(['Require cycle:']); 



// Context provider for default data - dev and otherwise 

const Stack = createNativeStackNavigator();
export const SetupContext = createContext();
const SetupContextProvider = ({ children }) => {
  const [courseLoading, setCourseLoading] = useState(true); // loading toggle for course API call
  const [holesLoading, setHolesLoading] = useState(true); // loading toggle for hole data API call
  const [playerCount, setPlayerCount] = useState(1);// hardcoded for dev - revert to () on production (or set further down tree)
  const [players, setPlayers] = useState(["Stephen Cardie"]); // hardcoded for dev - revert to ([]) on production (or set further down tree)
  const [tempApi, setTempApi] = useState(true);
  const [searchToggle, setSearchToggle] = useState(false);
  // const holesJSON = import('./test-data/course-data.json', { with: { type: 'json' } });
  return (
    <SetupContext.Provider value={{ courseLoading, setCourseLoading, holesLoading, setHolesLoading, playerCount, setPlayerCount, players, setPlayers, tempApi, setTempApi, searchToggle, setSearchToggle}}>
      {children}
    </SetupContext.Provider>
  )
}

export default function App() {
  const SetupContext = createContext(null);
  return (
    // <StrictMode>
    <SetupContextProvider>
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

    </SetupContextProvider>
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
