import "../../global.css";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppContext from "../constants/AppContext";
import { initDb } from "../db/initDb";
import { StatusBar } from "react-native";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const val = {};

  return (
    <AppContext.Provider value={val}>
      <SQLiteProvider
        databaseName="app.db"
        onInit={initDb}
        options={{ useNewConnection: false }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { paddingTop: insets.top },
            animation: "none",
          }}
        />
        <StatusBar barStyle={"default"} />
      </SQLiteProvider>
    </AppContext.Provider>
  );
}
