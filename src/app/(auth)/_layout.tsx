import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "@/src/constants/useAuthStore";

const AuthLayout = () => {
  const { token } = useAuthStore();

  if (token) return <Redirect href="/(tabs)/home" />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default AuthLayout;
