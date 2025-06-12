import { View, StatusBar, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Settings = () => {
  const { setTheme, theme } = React.useContext(ThemeContext);
  const colors = useTheme().colors;

  return (
    <View>
      <StatusBar style="auto" />
      <View
        style={{
          padding: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Text style={{ color: colors.text, fontWeight: 400, fontSize: 20 }}>
            Theme
          </Text>
          <Text style={{ color: colors.text, fontWeight: 100, fontSize: 10 }}>
            Insert extra info here
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setTheme(theme === "Light" ? "Dark" : "Light")}
          style={{
            alignItems: "center",
            backgroundColor: colors.border,
            borderRadius: 50,
            padding: 5,
          }}
        >
          {theme === "Light" ? (
            <MaterialCommunityIcons
              name="weather-night"
              size={26}
              color={colors.text}
            />
          ) : (
            <MaterialCommunityIcons
              name="weather-sunny"
              size={26}
              color={colors.text}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
