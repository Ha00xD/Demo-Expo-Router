import "../../global.css";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppContext from "../constants/AppContext";
import { initDb } from "../db/initDb";
import { useTheme } from "../hooks/useTheme";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const val = {};
  const { isDark } = useTheme();

  return (
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
        <StatusBar style={isDark ? "dark" : "light"} animated={true} />
      </SQLiteProvider>
    </AppContext.Provider>
  );
}
