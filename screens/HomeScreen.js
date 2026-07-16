import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/globalStyles.js";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Практичне завдання 5</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Counter")}
      >
        <Text style={styles.buttonText}>
          Завдання 1 - Лічильник
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Todo")}
      >
        <Text style={styles.buttonText}>
          Завдання 2 - Список справ
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Timer")}
      >
        <Text style={styles.buttonText}>
          Завдання 3 - Таймер
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Theme")}
      >
        <Text style={styles.buttonText}>
          Завдання 4 - Тема
        </Text>
      </TouchableOpacity>
    </View>
  );
}