/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

export const dark = {
  primary: "#000000",
  secondary: "#92929b",
  background: "#09090A",
  card: "#1d1d21",
  red: "#e50914",
  green: "#169127",
  text: "#ffffff",
  border: "rgb(199, 199, 204)",
  button: "#FFFFFF",
  box: "#0c0c0e",
  signInBtn: "#121212",
  borderBottomColor: "rgba(255, 255, 255,0.1)",
  modalbg: "#1d1d21",
  modalcard: "#0c0c0e",
  toast: "#fff",
  tomatoToast: "#E50914",
  successText: "#47e291",
  warning: "#342c23",
  warningText: "#e9ac4a",
  tint: "rgb(242, 242, 242)",
};

export const light = {
  primary: "#FFFFFF",
  background: "#FFFFFF",
  card: "#E4E4E4",
  red: "#e50914",
  green: "#169127",
  text: "#09090A",
  border: "rgb(0, 0, 0)",
  secondary: "#92929b",
  button: "#222222",
  signInBtn: "#E4E4E4",
  box: "#0c0c0e",
  modalbg: "#ffffff",
  modalcard: "#E4E4E4",
  toast: "#E4E4E4",
  tomatoToast: "#92929b",
  successText: "#47e291",
  warning: "#342c23",
  warningText: "#e9ac4a",
  tint: "rgb(1, 1, 1)",
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
