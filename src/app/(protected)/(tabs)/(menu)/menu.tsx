import { useTheme } from "@/src/hooks/useTheme";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const MenuScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <View
        className="h-14 items-center justify-center"
        style={{ backgroundColor: colors.card }}
      >
        <Text style={{ color: colors.text }} className="text-lg font-semibold">
          Menu
        </Text>
      </View>
      <View className="p-5">
        <TouchableOpacity onPress={() => router.push("/theme")}>
          <Text style={{ color: colors.text }}>Change Theme</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuScreen;
