import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface store {
  token: string | null;
  isFirstTime: boolean;
  showGuide:boolean;
  homeStepTarget: any; 
  userTheme: string;

  setToken: (token: string | null) => void;
  setIsFirstTime: (isFirstTime: boolean) => void;
  setShowGuide:(showGuide:boolean) => void;
  setHomeStepTarget: (target: any) => void;
  setUserTheme: (userTheme: any) => void;
}

export const useStore = create<store>()(
  devtools(
    persist(
      (set, get) => ({

        token: null,
        isFirstTime: true,
        showGuide:true,
        homeStepTarget: null,
        userTheme: 'system',

        setHomeStepTarget: (homeStepTarget) => set({ homeStepTarget }),
        setToken: (token) => set({ token }),
        setIsFirstTime: (isFirstTime) => set({ isFirstTime }),
        setShowGuide:(showGuide) => set({showGuide}) ,
        setUserTheme:(userTheme) => set({userTheme}) 

      }),
      {
        name: "app-storage",
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  ),
);
