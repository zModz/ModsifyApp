import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import NowPlaying from "./nowPlayingComp";

import HomeStack from "../screens/Home";
import Search from "../screens/Search";
import Library from "../screens/Library";
import Settings from "../screens/Settings";
import Player from "../screens/Player";
import { LinearGradient } from "expo-linear-gradient";
import MiniPlayer from "./miniPlayer";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const colors = useTheme().colors;

  return (
    <>
      <Tab.Navigator
        shifting={true}
        screenOptions={{
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 70,
            backgroundColor: "transparent", // To let gradient through
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarBackground: () => (
            <LinearGradient
              colors={["#ffffff00", "#695CFE"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.95 }}
              style={{
                flex: 1,
                overflow: "hidden",
              }}
            />
          ),
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: "Home",
            tabBarColor: "#695CFE",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={26} color={"#695CFE"} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="magnify" size={26} color={"#fff"} />
            ),
          }}
        />

        {/* <Tab.Group screenOptions={{ presentation: "modal" }}>
        <Tab.Screen
          name="Playing"
          component={Player}
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
      </Tab.Group> */}

        <Tab.Screen
          name="Library"
          component={Library}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="music-box-multiple"
                size={26}
                color={"#fff"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cog" size={26} color={"#fff"} />
            ),
          }}
        />
      </Tab.Navigator>

      <MiniPlayer />
    </>
  );
};

export default TabNavigation;
