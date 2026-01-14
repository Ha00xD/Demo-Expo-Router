import Header from "@/src/components/HeaderBack";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Appearance,
  useColorScheme,
} from "react-native";

type ThemeOption = "light" | "dark" | "system";

export default function ThemeScreen() {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeOption>("system");

  useEffect(() => {
    if (theme === "system") {
      Appearance.setColorScheme(null);
    } else {
      Appearance.setColorScheme(theme);
    }
  }, [theme]);

  const isDark = theme === "system" ? systemTheme === "dark" : theme === "dark";

  const iconColor = isDark ? "white" : "black";

  const renderIcon = (value: ThemeOption) => {
    switch (value) {
      case "light":
        return <Entypo name="light-up" size={20} color={iconColor} />;
      case "dark":
        return <MaterialIcons name="dark-mode" size={20} color={iconColor} />;
      case "system":
        return (
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={20}
            color={iconColor}
          />
        );
    }
  };

  const RadioItem = ({
    label,
    value,
  }: {
    label: string;
    value: ThemeOption;
  }) => {
    const active = theme === value;

    return (
      <TouchableOpacity
        onPress={() => setTheme(value)}
        className={`flex-row items-center justify-between rounded-xl p-4
          ${isDark ? "bg-zinc-800" : "bg-zinc-100"}`}
      >
        <View className="flex-row items-center">
          {renderIcon(value)}

          <Text
            className={`ml-3 text-base ${isDark ? "text-white" : "text-black"}`}
          >
            {label}
          </Text>
        </View>

        <View
          className={`h-5 w-5 rounded-full border-2 items-center justify-center
            ${active ? "border-emerald-500" : "border-gray-400"}`}
        >
          {active && (
            <View className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className={`flex-1  gap-4 ${isDark ? "bg-zinc-900" : "bg-white"}`}>
      <Header />
      <Text
        className={`text-2xl font-bold mb-4 ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        Theme Settings
      </Text>

      <RadioItem label="Light Mode" value="light" />
      <RadioItem label="Dark Mode" value="dark" />
      <RadioItem label="System Default" value="system" />
    </View>
  );
}
