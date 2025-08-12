import { useAtom, useAtomValue } from "jotai";
import {
  themeAtom,
  userAtom,
  globalLoadingAtom,
  globalErrorAtom,
  isLoggedInAtom,
} from "../atoms";

// 主题相关 hooks
export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  const toggleTheme = () => {
    setTheme(theme === "default" ? "dark" : "default");
  };

  return { theme, setTheme, toggleTheme };
};

// 用户相关 hooks
export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  const login = (userData: typeof user) => {
    setUser(userData);
  };

  const logout = () => {
    setUser({
      id: "",
      name: "",
      avatar: "",
      token: "",
    });
  };

  return { user, isLoggedIn, login, logout };
};

// 全局加载状态 hook
export const useGlobalLoading = () => {
  return useAtom(globalLoadingAtom);
};

// 全局错误状态 hook
export const useGlobalError = () => {
  const [error, setError] = useAtom(globalErrorAtom);

  const clearError = () => setError(null);

  return { error, setError, clearError };
};
