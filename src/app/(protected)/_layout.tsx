import { Stack } from "expo-router";

export const unstable_settings = {
	initialRouteName: "(tabs)", // anchor
};

export default function ProtectedLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="(tabs)"
				options={{
					headerShown: false,
					animation: "none",
				}}
			/>
		</Stack>
	);
}
