import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  isFirstTime: boolean;
  showGuide:boolean;
  setToken: (token: string | null) => void;
  setIsFirstTime: (isFirstTime: boolean) => void;
  setShowGuide:(showGuide:boolean) => void;
    homeStepTarget: any; 
  setHomeStepTarget: (target: any) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        token: null,
        isFirstTime: true,
        showGuide:true,
   homeStepTarget: null,
      setHomeStepTarget: (homeStepTarget) => set({ homeStepTarget }),
        setToken: (token) => set({ token }),
        setIsFirstTime: (isFirstTime) => set({ isFirstTime }),
        setShowGuide:(showGuide) => set({showGuide}) 
      }),
      {
        name: "app-storage",
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  ),
);
