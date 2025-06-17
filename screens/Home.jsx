import { useState, useEffect } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";

import { fetchFromSubsonic } from "../helpers/subsonic";
import Song from "../components/songCard";

const HomeStack = () => {
  const colors = useTheme().colors;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const music = async () => {
    try {
      const response = await fetchFromSubsonic(
        "getAlbumList2",
        "type=alphabeticalByName"
      );

      setData(response?.["subsonic-response"].albumList2 || []);
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    music();
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          {data?.album?.map((song) => (
            <Song key={song.id} song={song} color={colors} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default HomeStack;
