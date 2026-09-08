import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginUser } from "@/types/auth";

interface RememberedCredentials {
  username: string;
  password: string;
}

interface AuthState {
  token: string | null;
  user: LoginUser | null;
  rememberPassword: boolean;
  remembered: RememberedCredentials | null;
  setAuth: (payload: { token: string; user: LoginUser }) => void;
  clearAuth: () => void;
  setRememberPassword: (
    remember: boolean,
    credentials?: RememberedCredentials,
  ) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      user: null,
      rememberPassword: false,
      remembered: null,
      setAuth: ({ token, user }) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
      setRememberPassword: (remember, credentials) =>
        set({
          rememberPassword: remember,
          remembered: remember && credentials ? credentials : null,
        }),
    }),
    {
      name: "solinteg-auth",
      partialize: state => ({
        token: state.token,
        user: state.user,
        rememberPassword: state.rememberPassword,
        remembered: state.remembered,
      }),
    },
  ),
);
