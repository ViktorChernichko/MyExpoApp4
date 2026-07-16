import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import global from "../styles/globalStyles.js";

export default function TodoScreen({ navigation }) {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  async function loadTasks() {
    const data = await AsyncStorage.getItem("tasks");

    if (data) {
      setTasks(JSON.parse(data));
    }
  }

  function addTask() {
    if (text.trim() === "") return;

    if (editId) {
      const updated = tasks.map((item) =>
        item.id === editId ? { ...item, title: text } : item
      );

      setTasks(updated);
      setEditId(null);
      Alert.alert("Успіх", "Завдання змінено");
    } else {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          title: text,
        },
      ]);

      Alert.alert("Успіх", "Завдання додано");
    }

    setText("");
  }

  function removeTask(id) {
    setTasks(tasks.filter((item) => item.id !== id));
    Alert.alert("Видалено", "Завдання видалено");
  }

  function editTask(item) {
    setText(item.title);
    setEditId(item.id);
  }

  return (
    <View style={global.container}>
      <Text style={global.title}>Список справ</Text>

      <TextInput
        style={global.input}
        placeholder="Нова справа"
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity
        style={global.button}
        onPress={addTask}
      >
        <Text style={global.buttonText}>
          {editId ? "Зберегти" : "Додати"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.title}</Text>

            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.edit}
                onPress={() => editTask(item)}
              >
                <Text>✏️</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.delete}
                onPress={() => removeTask(item.id)}
              >
                <Text>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  text: {
    fontSize: 18,
    flex: 1,
  },

  buttons: {
    flexDirection: "row",
  },

  edit: {
    marginRight: 15,
  },

  delete: {},
});