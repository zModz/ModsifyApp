import { Button, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { PlayerContext } from "../context/playerContext";

const Player = () => {
  const { currentTrack, isPlaying, pause, resume, next } =
    useContext(PlayerContext);

  return (
    <View style={{ paddingTop: StatusBar.currentHeight }}>
      <Text style={{ fontSize: 20 }}>NOW PLAYING: </Text>
      <Image
        source={{ uri: currentTrack?.albumCover }}
        width={100}
        height={100}
      />
      <Text style={{ fontSize: 20 }}>{currentTrack?.title || ""}</Text>
      <Text style={{ fontSize: 20 }}>{currentTrack?.artist || ""}</Text>

      <Button
        title={isPlaying ? "Pause" : "Play"}
        onPress={isPlaying ? pause : resume}
      />
      <Button title={"Next"} onPress={next} />
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({});
