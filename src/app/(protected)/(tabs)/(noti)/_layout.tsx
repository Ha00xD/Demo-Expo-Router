import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { fa } from "zod/v4/locales";

const NotiLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default NotiLayout;
