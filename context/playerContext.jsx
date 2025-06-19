import React, { createContext, useState, useRef, useEffect } from "react";
import { Audio } from "expo-av";
import scrobbleTrack from "../helpers/scrobbleTrack";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);

  // Play a specific track
  const play = async (trackList, index = 0) => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: trackList[index].streamUrl },
        { shouldPlay: true }
      );

      soundRef.current = sound;
      setPlaylist(trackList);
      setCurrentIndex(index);
      setIsPlaying(true);

      scrobbleTrack(trackList[index].id);

      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          // Auto-Next
          if (index + 1 < trackList.length) {
            play(trackList, index + 1);
          } else {
            setIsPlaying(false);
          }
        }
      });
    } catch (error) {
      console.log("Error Playing Track", error);
    }
  };

  const pause = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const resume = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const next = () => {
    if (currentIndex + 1 < playlist.length) {
      play(playlist, currentIndex + 1);
    }
  };

  const previous = () => {
    if (currentIndex > 0) {
      play(playlist, currentIndex - 1);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        playlist,
        currentTrack: playlist[currentIndex],
        currentIndex,
        isPlaying,
        play,
        pause,
        resume,
        next,
        previous,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
