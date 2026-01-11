import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface AuthState {
    token: string | null;
    isFirstTime: boolean;

    setToken: (token: string | null) => void;
    setIsFirstTime: (isFirstTime: boolean) => void;

}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set, get) => ({
                token: null,
                isFirstTime: true,

                setToken: (token) => set({ token }),
                setIsFirstTime: (isFirstTime) => set({ isFirstTime })
            }),
            {
                name: 'app-storage',
                storage: createJSONStorage(() => AsyncStorage),
            }
        )
    )
);
