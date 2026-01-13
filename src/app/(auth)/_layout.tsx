import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "@/src/store/useAuthStore";

const AuthLayout = () => {
  const { isFirstTime, token } = useAuthStore();

  console.log("Is first time", isFirstTime);

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
