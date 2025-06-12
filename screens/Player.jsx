import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";

const Player = () => {
  return (
    <View style={{ paddingTop: StatusBar.currentHeight }}>
      <Text style={{ fontSize: 20 }}>This is the NowPlaying screen</Text>
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({});
