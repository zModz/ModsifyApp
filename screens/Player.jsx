import {
  Button,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";

import Slider from "@react-native-community/slider";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { PlayerContext } from "../context/playerContext";
import { LinearGradient } from "expo-linear-gradient";

const Player = () => {
  const { currentTrack, isPlaying, pause, resume, next, previous } =
    useContext(PlayerContext);

  return (
    <LinearGradient colors={["#a18cd1", "#fbc2eb"]} style={styles.container}>
      <Image source={{ uri: currentTrack.albumCover }} style={styles.cover} />

      <View style={styles.info}>
        <Text style={styles.title}>{currentTrack.title}</Text>
        <Text style={styles.artist}>{currentTrack.artist}</Text>
      </View>

      <Slider
        style={styles.slider}
        value={60} // Example value, replace with actual current time
        minimumValue={0}
        // maximumValue={duration}
        // onSlidingComplete={handleSeek}
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#fff"
      />

      <View style={styles.controls}>
        <TouchableOpacity onPress={previous}>
          <MaterialCommunityIcons name="skip-backward" size={32} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={isPlaying ? pause : resume}>
          <MaterialCommunityIcons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={64}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={next}>
          <MaterialCommunityIcons name="skip-forward" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Player;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
    justifyContent: "space-between",
  },
  cover: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  info: {
    alignItems: "center",
    marginTop: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  artist: {
    fontSize: 16,
    color: "#eee",
    marginTop: 4,
  },
  slider: {
    width: "85%",
    marginTop: 32,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
    marginBottom: 40,
  },
});
