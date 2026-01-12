import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "@/src/store/useAuthStore";

const OnBoardingScreen = () => {
	const router = useRouter();
	const { setIsFirstTime } = useAuthStore();

	const handleSkip = () => {
		setIsFirstTime(false);
		router.replace("/(auth)");
	};

	return (
		<View className="flex-1 bg-slate-500 justify-center items-center gap-3">
			<Text>OnBoarding Screen</Text>

			<TouchableOpacity
				className="bg-slate-300 px-4 py-2 rounded-md"
				onPress={handleSkip}
			>
				<Text>Skip</Text>
			</TouchableOpacity>
		</View>
	);
};

export default OnBoardingScreen;
