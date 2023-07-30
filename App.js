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
  Alert,
} from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const ThemeContext = React.createContext();

const Song = ({ song, color }) => (
  <View
    style={{
      height: 100,
      backgroundColor: color.card,
      margin: 5,
      flexDirection: "row",
      borderLeftWidth: 5,
      borderLeftColor: color.primary,
    }}
  >
    <Image source={{ uri: song.images.coverart }} width={100} height={100} />
    <View style={{ flexShrink: 1, margin: 5, justifyContent: "center" }}>
      <Text style={{ color: color.text }}>{song.title}</Text>
      <Text style={{ color: color.text, fontWeight: 200 }}>
        {song.subtitle}
      </Text>
    </View>
  </View>
);

function HomeStack() {
  const colors = useTheme().colors;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const music = async () => {
    const url =
      "https://shazam.p.rapidapi.com/charts/track?listId=ip-country-chart-PT";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.EXPO_PUBLIC_XRapidAPIKey,
        "X-RapidAPI-Host": process.env.EXPO_PUBLIC_XRapidAPIHost,
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      // console.log(result);
      setData(result.tracks);
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    music();
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          {data?.map((song) => (
            <Song key={song.key} song={song} color={colors} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

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

function Settings() {
  const { setTheme, theme } = React.useContext(ThemeContext);
  const colors = useTheme().colors;

  return (
    <View>
      <StatusBar style="auto" />
      <View
        style={{
          padding: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Text style={{ color: colors.text, fontWeight: 400, fontSize: 20 }}>
            Theme
          </Text>
          <Text style={{ color: colors.text, fontWeight: 100, fontSize: 10 }}>
            Insert extra info here
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setTheme(theme === "Light" ? "Dark" : "Light")}
          style={{
            alignItems: "center",
            backgroundColor: colors.border,
            borderRadius: 50,
            padding: 5,
          }}
        >
          {theme === "Light" ? (
            <MaterialCommunityIcons
              name="weather-night"
              size={26}
              color={colors.text}
            />
          ) : (
            <MaterialCommunityIcons
              name="weather-sunny"
              size={26}
              color={colors.text}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

function NowPlaying({ color, size }) {
  const colors = useTheme().colors;

  return (
    <View
      style={{
        width: 55,
        height: 55,
        borderRadius: 50,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 25,
      }}
    >
      <Image
        source={{ uri: "https://i.imgur.com/UIoEWrj.jpeg" }}
        style={{ width: 50, height: 50, borderRadius: 50 }}
      />
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

function TabNavigation() {
  const colors = useTheme().colors;

  return (
    <Tab.Navigator
      shifting={true}
      screenOptions={{
        tabBarStyle: {
          height: 60,
          position: "absolute",
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 15,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "#1ac6d9",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" size={26} color={color} />
          ),
        }}
      />
      <Tab.Group screenOptions={{ presentation: "modal" }}>
        <Tab.Screen
          name="Playing"
          component={Search}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <NowPlaying color={color} size={size} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("player");
            },
          })}
        />
      </Tab.Group>

      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="music-box-multiple"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
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
