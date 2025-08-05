import { create } from "zustand";
import { localStorage } from "@packages/mobile-utils";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  permissions: string[];
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setPermissions: (permissions: string[]) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: localStorage.get("user") || null,
  token: localStorage.get("token") || null,
  isAuthenticated: !!localStorage.get("token"),
  permissions: localStorage.get("permissions") || [],

  login: (user, token) => {
    localStorage.set("user", user);
    localStorage.set("token", token);
    set({
      user,
      token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.remove("user");
    localStorage.remove("token");
    localStorage.remove("permissions");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      permissions: [],
    });
  },

  updateUser: (userData) => {
    set((state) => {
      const updatedUser = { ...state.user, ...userData } as User;
      localStorage.set("user", updatedUser);
      return { user: updatedUser };
    });
  },

  setPermissions: (permissions) => {
    localStorage.set("permissions", permissions);
    set({ permissions });
  },
}));
