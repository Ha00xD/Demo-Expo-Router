import { useStore } from "@/src/store/useStore";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const OnBoardingScreen = () => {
  const router = useRouter();
  const { setIsFirstTime } = useStore();

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
        // onPress={() => router.push("/test")}
      >
        <Text>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnBoardingScreen;
