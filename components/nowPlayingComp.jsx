import { View, Text, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import React, { useContext } from "react";
import { PlayerContext } from "../context/playerContext";

export default function NowPlaying(color, size) {
  const colors = useTheme().colors;
  const { currentTrack, isPlaying } = useContext(PlayerContext);

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
        source={{ uri: currentTrack?.albumCover }}
        style={{ width: 50, height: 50, borderRadius: 50 }}
      />
    </View>
  );
}
