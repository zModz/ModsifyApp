import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { PlayerContext } from "../context/playerContext";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function MiniPlayer() {
  const navigation = useNavigation();
  const { currentTrack, isPlaying, play, pause } = useContext(PlayerContext);

  if (!currentTrack) return null;

  return (
    <TouchableOpacity onPress={() => navigation.navigate("player")}>
      <LinearGradient
        colors={["#a18cd1", "#fbc2eb"]}
        start={[0, 0]}
        end={[1, 0]}
        style={style.container}
      >
        <Image
          source={{ uri: currentTrack.albumCover }}
          style={style.albumCover}
        />

        <View style={{ flex: 1 }}>
          <Text style={style.songTitle} numberOfLines={1}>
            {currentTrack.title}
          </Text>
          <Text style={style.songArtist} numberOfLines={1}>
            {currentTrack.artist}
          </Text>
        </View>

        <TouchableOpacity>
          <MaterialCommunityIcons
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="#fff"
            onPress={isPlaying ? pause : play}
          />
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 65,
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  albumCover: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  songTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 2,
  },
  songArtist: {
    color: "#eee",
    fontSize: 12,
  },
});
