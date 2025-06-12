import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import NowPlaying from "./nowPlayingComp";

import HomeStack from "../screens/Home";
import Search from "../screens/Search";
import Library from "../screens/Library";
import Settings from "../screens/Settings";
import Player from "../screens/Player";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
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
};

export default TabNavigation;
