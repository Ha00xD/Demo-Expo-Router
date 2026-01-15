import { Redirect, Stack } from "expo-router";
import { useStore } from "@/src/store/useStore";

const AuthLayout = () => {
  const { isFirstTime, token } = useStore();

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
