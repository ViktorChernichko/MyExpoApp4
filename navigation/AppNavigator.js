import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen.js";
import CounterScreen from "../screens/CounterScreen.js";
import TodoScreen from "../screens/TodoScreen.js";
import TimerScreen from "../screens/TimerScreen.js";
import ThemeScreen from "../screens/ThemeScreen.js";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Головне меню" }}
        />

        <Stack.Screen
          name="Counter"
          component={CounterScreen}
          options={{ title: "Завдання 1" }}
        />

        <Stack.Screen
          name="Todo"
          component={TodoScreen}
          options={{ title: "Завдання 2" }}
        />

        <Stack.Screen
          name="Timer"
          component={TimerScreen}
          options={{ title: "Завдання 3" }}
        />

        <Stack.Screen
          name="Theme"
          component={ThemeScreen}
          options={{ title: "Завдання 4" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}