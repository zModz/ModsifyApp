import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StatusBar,
  ScrollView,
} from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { fetchFromSubsonic } from "./helpers/subsonic";
import TabNavigation from "./components/tabComponent";

const Stack = createStackNavigator();
const ThemeContext = React.createContext();

function Search() {
  const colors = useTheme().colors;

  return (
    <View>
      <Text style={{ fontSize: 20, color: colors.text }}>
        This is the Search screen
      </Text>
    </View>
  );
}

function Library() {
  const colors = useTheme().colors;

  return (
    <View>
      <Text style={{ fontSize: 20, color: colors.text }}>
        This is the Library screen
      </Text>
    </View>
  );
}

function NowPlayingScreen() {
  return (
    <View style={{ paddingTop: StatusBar.currentHeight }}>
      <Text style={{ fontSize: 20 }}>This is the NowPlaying screen</Text>
    </View>
  );
}

export default function App() {
  const [theme, setTheme] = useState("Light");
  const themeData = { theme, setTheme };

  return (
    <ThemeContext.Provider value={themeData}>
      <NavigationContainer theme={theme === "Dark" ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="main"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
              name="player"
              component={NowPlayingScreen}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
