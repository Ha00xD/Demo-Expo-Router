import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface AuthState {
    token: string | null;
    setToken: (token: string | null) => void;

}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set, get) => ({
                token: null,
                setToken: (token) => set({ token }),
            }),
            {
                name: 'app-storage',
                storage: createJSONStorage(() => AsyncStorage),
            }
        )
    )
);
