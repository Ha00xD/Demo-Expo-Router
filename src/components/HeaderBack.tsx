import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
	title?: string;
	showBack?: boolean;
	right?: React.ReactNode;
};

export default function Header({
	title = "",
	showBack = true,
	right,
}: HeaderProps) {
	return (
		<View className="flex-row justify-center items-center py-3 bg-white">
			<View style={styles.side}>
				{showBack && (
					<TouchableOpacity onPress={() => router.back()}>
						<Ionicons name="chevron-back" size={26} />
					</TouchableOpacity>
				)}
			</View>

			<View style={styles.center}>
				<Text numberOfLines={1} style={styles.title}>
					{title}
				</Text>
			</View>

			<View style={styles.sideRight}>{right ? right : null}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	side: {
		width: 50,
		alignItems: "flex-start",
	},
	sideRight: {
		width: 50,
		alignItems: "flex-end",
	},
	center: {
		flex: 1,
		alignItems: "center",
	},
	title: {
		fontSize: 18,
		fontWeight: "600",
	},
});
