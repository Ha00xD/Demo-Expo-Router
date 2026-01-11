import { Stack } from "expo-router";

const OnBoardingLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    />
  );
};

export default OnBoardingLayout;
