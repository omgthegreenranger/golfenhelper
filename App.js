import { React, StrictMode, useContext, createContext, useState } from "react";
import { Login, ActiveGame} from "./components/index.js";
import {
  StyleSheet,
} from "react-native";
import {
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createRoot } from "react-dom/client";
// import { store } from './store/store';
import { Provider } from 'react-redux'


// const container = document.getElementById('root')

const Stack = createNativeStackNavigator();
export const SetupContext = createContext();
const SetupContextProvider = ({ children }) => {
  const [courseLoading, setCourseLoading] = useState(true);
  const [holesLoading, setHolesLoading] = useState(true);
  const [playerCount, setPlayerCount] = useState(2);//() disabled temporary for dev
  const [players, setPlayers] = useState(["Stephen Cardie", "Edith Cooper\-Cardie"]); //([]) disabled temporarily for dev

  return (
    <SetupContext.Provider value={{ courseLoading, setCourseLoading, holesLoading, setHolesLoading, playerCount, setPlayerCount, players, setPlayers}}>
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


// if (container) {
//   const root = createRoot(container)

//   root.render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//   )
// } else {
//   throw new Error(
//     "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
//   )
// }

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    alignItems: "center",
    backgroundColor: "#8BC34A",
    justifyContent: "center",
  },
});
