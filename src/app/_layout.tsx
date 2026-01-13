import "../../global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppContext from "../constants/AppContext";
import { initDb } from "../db/initDb";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const val = {};

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AppContext.Provider value={val}>
        <SQLiteProvider
          databaseName="app.db"
          onInit={initDb}
          options={{ useNewConnection: false }}
        >
          <Stack
            initialRouteName="(auth)"
            screenOptions={{
              headerShown: false,
              contentStyle: { paddingTop: insets.top },
              animation: "none",
            }}
          />
          <StatusBar style="auto" />
        </SQLiteProvider>
      </AppContext.Provider>
    </ThemeProvider>
  );
}
