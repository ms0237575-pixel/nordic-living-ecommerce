import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userEmail: null,

      login: (email: string) =>
        set({ isAuthenticated: true, userEmail: email }),

      logout: () => set({ isAuthenticated: false, userEmail: null }),
    }),
    {
      name: "nordic-living-auth",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
