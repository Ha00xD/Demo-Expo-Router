import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const MenuScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Menu</Text>
      <TouchableOpacity onPress={() => router.push("/theme")}>
        <Text>Change Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuScreen;
