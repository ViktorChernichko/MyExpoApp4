import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ThemeScreen() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("theme", JSON.stringify(dark));
  }, [dark]);

  async function loadTheme() {
    const value = await AsyncStorage.getItem("theme");

    if (value !== null) {
      setDark(JSON.parse(value));
    }
  }

  function changeTheme() {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );

    setDark(!dark);
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: dark ? "#222" : "#fff",
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: dark ? "#fff" : "#000",
          },
        ]}
      >
        {dark ? "Темна тема" : "Світла тема"}
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: dark ? "#555" : "#2196F3",
          },
        ]}
        onPress={changeTheme}
      >
        <Text style={styles.buttonText}>
          Змінити тему
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },

  button: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});