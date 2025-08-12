import { useAtom, useAtomValue } from "jotai";
import { useCallback } from "react";
import {
  globalLoadingAtom,
  globalErrorAtom,
  userAtom,
  themeAtom,
  isLoggedInAtom,
} from "../atoms";

// 用户相关
export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  const login = useCallback(
    (userData: NonNullable<typeof user>) => {
      setUser(userData);
    },
    [setUser],
  );

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  return { user, isLoggedIn, login, logout };
};

// 全局加载
export const useGlobalLoading = () => {
  const [loading, setLoading] = useAtom(globalLoadingAtom);

  const execWithLoading = useCallback(
    async <T>(fn: () => Promise<T>): Promise<T> => {
      setLoading(true);
      try {
        return await fn();
      } finally {
        setLoading(false);
      }
    },
    [setLoading],
  );

  return { loading, setLoading, execWithLoading };
};

// 全局错误
export const useGlobalError = () => {
  const [error, setError] = useAtom(globalErrorAtom);

  const showError = useCallback(
    (message: string, duration = 3000) => {
      setError(message);
      if (duration > 0) {
        setTimeout(() => setError(null), duration);
      }
    },
    [setError],
  );

  return { error, showError, clearError: () => setError(null) };
};

// 主题
export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "default" ? "dark" : "default"));
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
};
