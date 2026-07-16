import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import global from "../styles/globalStyles.js";

export default function TimerScreen({ navigation }) {
  const [startValue, setStartValue] = useState("30");
  const [time, setTime] = useState(30);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (running && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    if (time === 0 && running) {
      setRunning(false);
      Alert.alert("Таймер", "Час закінчився!");
    }

    return () => clearInterval(interval);
  }, [running, time]);

  function startTimer() {
    setRunning(true);
  }

  function pauseTimer() {
    setRunning(false);
  }

  function resetTimer() {
    setRunning(false);
    setTime(Number(startValue));
  }

  function applyStartValue() {
    setRunning(false);
    setTime(Number(startValue));
  }

  return (
    <View style={global.container}>
      <Text style={global.title}>Таймер</Text>

      <TextInput
        style={global.input}
        keyboardType="numeric"
        placeholder="Початковий час"
        value={startValue}
        onChangeText={setStartValue}
      />

      <TouchableOpacity
        style={global.button}
        onPress={applyStartValue}
      >
        <Text style={global.buttonText}>
          Встановити час
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 60,
          textAlign: "center",
          marginVertical: 30,
        }}
      >
        {time}
      </Text>

      <TouchableOpacity
        style={global.button}
        onPress={startTimer}
      >
        <Text style={global.buttonText}>Старт</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={global.button}
        onPress={pauseTimer}
      >
        <Text style={global.buttonText}>Пауза</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={global.button}
        onPress={resetTimer}
      >
        <Text style={global.buttonText}>Скинути</Text>
      </TouchableOpacity>
    </View>
  );
}