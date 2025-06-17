import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { BASE_URL, CLIENT_NAME, API_VERSION, USERS } from "../config";
import { fetchFromSubsonic } from "../helpers/subsonic";
import { PlayerContext } from "../context/playerContext";

const Song = ({ song, color }) => {
  const [coverArt, setCoverArt] = useState("https://i.imgur.com/UIoEWrj.jpeg"); // Default cover art
  const users = USERS["nonadmin"];

  const { currentTrack, isPlaying, play } = useContext(PlayerContext);

  const getcoverArt = async () => {
    try {
      const data = await fetchFromSubsonic("getAlbumInfo2", `id=${song.id}`);
      return data?.["subsonic-response"]?.albumInfo?.smallImageUrl;
    } catch (error) {
      console.error("Error fetching cover art:", error);
      return "https://i.imgur.com/UIoEWrj.jpeg"; // Fallback cover art
    }
  };

  const getAlbumSongs = async (albumId) => {
    try {
      const data = await fetchFromSubsonic("getAlbum", `id=${albumId}`);
      const songs = data?.["subsonic-response"]?.album?.song;

      return songs?.map((_song) => ({
        id: _song.id,
        title: _song.title,
        artist: _song.artist,
        albumCover: coverArt,
        streamUrl: `${BASE_URL}/rest/stream?id=${_song.id}&u=${users.username}&t=${users.password}&v=${API_VERSION}&c=${CLIENT_NAME}&f=json`,
      }));
    } catch (error) {
      console.log("There was an error getting album songs", error);
    }
  };

  useEffect(() => {
    getcoverArt().then((uri) => {
      setCoverArt(uri);
    });
  }, []);

  const onSongClick = async (playlist) => {
    play(playlist);
    console.log("Playing playlist:", playlist);
  };

  return (
    <TouchableOpacity
      onPress={async () => {
        const playlist = await getAlbumSongs(song.id);
        if (playlist) {
          onSongClick(playlist);
        }
      }}
    >
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
          <Text style={{ color: color.text, fontWeight: 200 }}>
            {song.year}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Song;
