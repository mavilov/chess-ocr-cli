import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import HomeScreen from "./screens/HomeScreen";
import ProcessingScreen from "./screens/ProcessingScreen";
import ResultScreen from "./screens/ResultScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { colors } from "./theme/colors";

/** Navigation param list — defines every route + its params. */
export type RootStackParamList = {
  Home: undefined;
  Processing: { imageUri: string };
  Result: { pgn: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const darkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.accent,
    background: colors.background,
    card: colors.surfaceElevated,
    text: colors.textPrimary,
    border: colors.border,
    notification: colors.accent,
  },
};

/**
 * Root application component with stack navigation.
 */
export default function App() {
  return (
    <NavigationContainer theme={darkTheme}>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: colors.surfaceElevated },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: { fontWeight: "600" },
          contentStyle: { backgroundColor: colors.background },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Chess OCR",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Settings")}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={{ fontSize: 22 }}>⚙️</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Processing"
          component={ProcessingScreen}
          options={{
            title: "Processing",
            headerBackVisible: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{
            title: "Result",
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Settings" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
