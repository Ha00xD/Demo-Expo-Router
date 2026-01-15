import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@/src/hooks/useTheme";

const NotiScreen = () => {
  const { colors } = useTheme();

  return (
    <View
      style={{ backgroundColor: colors.background }}
      className="flex-1 justify-center items-center"
    >
      <Text style={{ color: colors.text }}>NotiScreen</Text>
    </View>
  );
};

export default NotiScreen;
