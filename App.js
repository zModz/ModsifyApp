import "react-native-gesture-handler";
import React, { useEffect, useState, Component, createContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  RefreshControl,
  Dimensions,
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

import store from "./src/app/store";
import { Provider } from "react-redux";

import { playPause, setActiveSong } from "./src/app/playerSlice";
import { useGetChartsQuery } from "./ShazamCore";
import { useDispatch, useSelector } from "react-redux";
import Player from "./src/app/Player";
import AudioProvider, { AudioContext } from "./AudioProvider";
import { LayoutProvider, RecyclerListView } from 'recyclerlistview'

import * as MediaLibrary from 'expo-media-library'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const ThemeContext = React.createContext();

function Song({ song, color, isPlaying, activeSong, i, data }) {
  const dispatch = useDispatch();
  let currentlyPlaying = ''
  
  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i}))
    dispatch(playPause(true))
  }
  
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  activeSong?.title === song?.title ? currentlyPlaying = 'yellow' : currentlyPlaying = color.primary

  return (
    <TouchableOpacity
      style={{
        height: 100,
        backgroundColor: color.card,
        margin: 5,
        flexDirection: "row",
        borderLeftWidth: 5,
        borderLeftColor: currentlyPlaying,
      }}
      onPress={() => handlePlayClick()}
    >
      <Image source={{ uri: song.images?.coverart }} width={100} height={100} />
      <View style={{ flexShrink: 1, margin: 5, justifyContent: "center" }}>
        <Text style={{ color: color.text }}>{song.title}</Text>
        <Text style={{ color: color.text, fontWeight: 200 }}>
          {song.subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

function HomeStack() {
  const colors = useTheme().colors;
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetChartsQuery();

  if (error) return alert(error);

  const refreshControl = () => {
    if(!isFetching){
      return;
    }
  }

  return (
    <View>
      {isFetching ? (
        <ActivityIndicator />
      ) : (
        <ScrollView 
          contentContainerStyle={{ paddingBottom: 80 }}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refreshControl}/>
          }
        >
          {data.tracks?.map((song, i) => (
            <Song 
            key={song.key}
            song={song}
            color={colors}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}  />
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

function SecondsToHms(d) {
  d = Number(d);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  if(m < 10 && s < 10)
    return `0${m}:0${s}`
  
  
  if(m < 10)
    return `0${m}:${s}`

    
  if(s < 10)
    return `${m}:0${s}`
}

function File({song, i}) {
  const colors = useTheme().colors;

  return (
    <>
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: colors.card,
          margin: 5,
          flexDirection: "row",
          borderLeftWidth: 5,
          borderColor: colors.primary,
        }}
      >
        <Image source={{ uri: "https://i.imgur.com/UIoEWrj.jpeg" }} width={100} height={100} />
        <View style={{ flexShrink: 1, margin: 5, justifyContent: "center" }}>
          <Text style={{ color: colors.text }}>{song.filename}</Text>
          <Text style={{ color: colors.text, fontWeight: 200 }}>
            {SecondsToHms(song.duration)}
          </Text>
        </View>
      </TouchableOpacity>
      {/* <View style={{height: 10, backgroundColor: colors.background, alignSelf: 'center'}} /> */}
    </>
  )
}

class LibraryList extends Component {
  static contextType = AudioContext

  layoutProvider = new LayoutProvider(i => 'audio', (type, dim) => {
    switch (type) {
      case 'audio':
        dim.width = Dimensions.get('window').width;
        dim.height = 110;
        break;
      default:
        dim.width = 0;
        dim.height = 0;
        break;
    }
  })

  rowRenderer = (type, item) => {
    // {"albumId": "1534994081", "creationTime": 0, "duration": 242.756, "filename": "Anthem Of The Angels.mp3", "height": 0, "id": "330", "mediaType": "audio", "modificationTime": 1561448312000, "uri": "file:///storage/6027-DCFD/Music/2009 - Dear Agony/Anthem Of The Angels.mp3", "width": 0}
    return (
      <File key={item.id} song={item} />
    )
  }

  render(){
    return (
      <AudioContext.Consumer>
        {({dataProvider}) => {
          return(
            <View style={{flex: 1, paddingBottom: 80}}>
              <RecyclerListView dataProvider={dataProvider} layoutProvider={this.layoutProvider} rowRenderer={this.rowRenderer} />
            </View>
          )
        }}
      </AudioContext.Consumer>
    )
  }
}

function Library() {
  return(
    <LibraryList />
  )
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
  const { activeSong, isPlaying } = useSelector((state) => state.player);

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
    <Provider store={store}>
      <AudioProvider>
        <ThemeContext.Provider value={themeData}>
          <NavigationContainer
            theme={theme === "Dark" ? DarkTheme : DefaultTheme}
          >
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
      </AudioProvider>
    </Provider>
  );
}
