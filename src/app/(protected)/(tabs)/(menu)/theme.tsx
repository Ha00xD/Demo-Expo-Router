import Header from "@/src/components/Header";
import { useTheme } from "@/src/hooks/useTheme";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useStore } from "@/src/store/useStore";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function ThemeScreen() {
  const { colors } = useTheme();
  const { userTheme, setUserTheme } = useStore();

  const RadioButton = ({ selected }: { selected: boolean }) => (
    <MaterialCommunityIcons
      name={selected ? "radiobox-marked" : "radiobox-blank"}
      size={24}
      color={selected ? colors.green : colors.text}
    />
  );

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Header title="Theme Setting" />
      <View className="p-5 gap-3">
        <TouchableOpacity
          className="flex-row items-center justify-between rounded-xl p-3"
          onPress={() => setUserTheme("dark")}
          style={{ backgroundColor: colors.card }}
        >
          <View className="flex-row items-center gap-3">
            <MaterialIcons name="dark-mode" size={24} color={colors.text} />
            <Text style={{ color: colors.text }}>Dark Mode</Text>
          </View>
          <RadioButton selected={userTheme === "dark"} />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-between rounded-xl p-3"
          onPress={() => setUserTheme("light")}
          style={{ backgroundColor: colors.card }}
        >
          <View className="flex-row items-center gap-3">
            <Entypo name="light-up" size={24} color={colors.text} />
            <Text style={{ color: colors.text }}>Light Mode</Text>
          </View>
          <RadioButton selected={userTheme === "light"} />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-between rounded-xl p-3"
          onPress={() => setUserTheme("system")}
          style={{ backgroundColor: colors.card }}
        >
          <View className="flex-row items-center gap-3">
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={24}
              color={colors.text}
            />
            <Text style={{ color: colors.text }}>System Default</Text>
          </View>
          <RadioButton selected={userTheme === "system"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
