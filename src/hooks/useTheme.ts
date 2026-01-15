import { useColorScheme } from "react-native";
import { useStore } from "../store/useStore";
import { useShallow } from "zustand/react/shallow";
import { dark, light } from "../constants/theme";

export function useTheme() {
  const { userTheme } = useStore(
    useShallow((state) => ({
      userTheme: state.userTheme,
    }))
  );
  const colorScheme = useColorScheme();
  const themeName = userTheme === "system" ? colorScheme : userTheme;
  const isDark = themeName === "dark";
  const colors = isDark ? dark : light;

  return {
    colors,
    themeName,
    isDark,
    isLight: !isDark,
  };
}
