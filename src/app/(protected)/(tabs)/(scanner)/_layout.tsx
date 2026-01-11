import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ScannerLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default ScannerLayout;
