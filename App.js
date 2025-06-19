import "react-native-gesture-handler";
import React, { useState } from "react";

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./components/tabComponent";
import Player from "./screens/Player";
import { PlayerProvider } from "./context/playerContext";

const Stack = createStackNavigator();
const ThemeContext = React.createContext();

export default function App() {
  const [theme, setTheme] = useState("Light");
  const themeData = { theme, setTheme };

  return (
    <ThemeContext.Provider value={themeData}>
      <PlayerProvider>
        <NavigationContainer
          theme={theme === "Dark" ? DarkTheme : DefaultTheme}
        >
          <Stack.Navigator>
            <Stack.Screen
              name="main"
              component={TabNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
              <Stack.Screen
                name="player"
                component={Player}
                options={{ headerShown: false }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </PlayerProvider>
    </ThemeContext.Provider>
  );
}
