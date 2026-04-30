// src/shared/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockAuthApi } from '@/mocks/auth'; // we'll create this next
import type { User } from '@/features/auth/types';
import { useOnboardingStore } from './onboardingStore';


interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;


  login: (email: string, password: string) => Promise<{ success: boolean }>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await mockAuthApi.login(email, password);
          useOnboardingStore
            .getState()
            .setOnboarded(res.data?.isOnboarded ?? false);
          set({
            user: res.data,
            isAuthenticated: true,
            isLoading: false
          });
          return { success: true };
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
          return { success: false };
        }
      },

      signup: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
          const res = await mockAuthApi.signup(email, password, name);
          useOnboardingStore.getState().setOnboarded(false);
          set({ user: res.data, isAuthenticated: true, isLoading: false });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },

      logout: async () => {
        await mockAuthApi.logout();
        useOnboardingStore.getState().reset();
        set({ user: null, isAuthenticated: false, error: null });
      },

      clearError: () => set({ error: null }),

    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),

    }
  )
);