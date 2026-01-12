import "../../global.css";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from "expo-sqlite";
import { initDb } from "../db/initDb";
import AppContext from "../constants/AppContext";

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
						screenOptions={{
							headerShown: false,
							contentStyle: { paddingTop: insets.top },
							animation: "none",
						}}
					>
						<Stack.Screen name="(onboarding)" />
						<Stack.Screen name="(auth)" />
						<Stack.Screen name="(protected)" />
					</Stack>
					<StatusBar style="auto" />
				</SQLiteProvider>
			</AppContext.Provider>
		</ThemeProvider>
	);
}
