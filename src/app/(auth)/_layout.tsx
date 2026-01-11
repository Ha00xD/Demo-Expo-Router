import { useAuthStore } from "@/src/store/useAuthStore";
import { Redirect, Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  const { isFirstTime, token } = useAuthStore();

  if (isFirstTime) return <Redirect href="/(onboarding)/" />;

  if (token) return <Redirect href="/(protected)/(tabs)/(home)/" />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    />
  );
};

export default AuthLayout;
