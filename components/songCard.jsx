import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { fetchFromSubsonic } from "../helpers/subsonic";

const Song = ({ song, color }) => {
  const [coverArt, setCoverArt] = useState("https://i.imgur.com/UIoEWrj.jpeg"); // Default cover art

  const getcoverArt = async () => {
    try {
      const data = await fetchFromSubsonic("getAlbumInfo2", `id=${song.id}`);
      return data?.["subsonic-response"]?.albumInfo?.smallImageUrl;
    } catch (error) {
      console.error("Error fetching cover art:", error);
      return "https://i.imgur.com/UIoEWrj.jpeg"; // Fallback cover art
    }
  };

  useEffect(() => {
    getcoverArt().then((uri) => {
      setCoverArt(uri);
    });
  }, []);

  return (
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
      <Image source={{ uri: coverArt }} width={100} height={100} />
      <View style={{ flexShrink: 1, margin: 5, justifyContent: "center" }}>
        <Text style={{ color: color.text }}>{song.name}</Text>
        <Text style={{ color: color.text, fontWeight: 200 }}>
          {song.artist}
        </Text>
        <Text style={{ color: color.text, fontWeight: 200 }}>{song.year}</Text>
      </View>
    </View>
  );
};

export default Song;
