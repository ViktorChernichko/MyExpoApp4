import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../styles/globalStyles.js";

export default function CounterScreen({ navigation }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadCounter();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("counter", count.toString());
  }, [count]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  async function loadCounter() {
    const value = await AsyncStorage.getItem("counter");

    if (value !== null) {
      setCount(Number(value));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{count}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setCount(count + 1)}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setCount(count - 1)}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setCount(0)}
      >
        <Text style={styles.buttonText}>Скинути</Text>
      </TouchableOpacity>
    </View>
  );
}