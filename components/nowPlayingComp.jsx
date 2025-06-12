import { View, Image } from "react-native";

export default function NowPlaying({ color, size }) {
  const colors = useTheme().colors;

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
        source={{ uri: "https://i.imgur.com/UIoEWrj.jpeg" }}
        style={{ width: 50, height: 50, borderRadius: 50 }}
      />
    </View>
  );
}
