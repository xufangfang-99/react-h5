// src/components/ThemeProvider/index.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { localStorage } from "@packages/mobile-utils";

// 可用的主题列表
export const THEMES = {
  default: {
    name: "默认蓝",
    primary: "#3b82f6",
    mode: "light",
  },
  dark: {
    name: "深色",
    primary: "#3b82f6",
    mode: "dark",
  },
  emerald: {
    name: "翡翠绿",
    primary: "#22c55e",
    mode: "light",
  },
  violet: {
    name: "优雅紫",
    primary: "#8b5cf6",
    mode: "light",
  },
  orange: {
    name: "活力橙",
    primary: "#f97316",
    mode: "light",
  },
  rose: {
    name: "玫瑰粉",
    primary: "#f43f5e",
    mode: "light",
  },
} as const;

export type ThemeName = keyof typeof THEMES;

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themes: typeof THEMES;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "default",
}) => {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    // 从本地存储读取主题
    const savedTheme = localStorage.get<ThemeName>("theme");
    return savedTheme || defaultTheme;
  });

  // 设置主题
  const setTheme = (newTheme: ThemeName) => {
    // 添加过渡效果类
    document.body.classList.add("theme-transitioning");

    setThemeState(newTheme);
    localStorage.set("theme", newTheme, 365 * 24 * 60 * 60 * 1000); // 保存一年

    // 移除过渡效果类
    setTimeout(() => {
      document.body.classList.remove("theme-transitioning");
    }, 300);
  };

  // 应用主题到 DOM
  useEffect(() => {
    const root = document.documentElement;

    // 移除所有主题类
    Object.keys(THEMES).forEach(() => {
      root.removeAttribute(`data-theme`);
    });

    // 设置当前主题
    root.setAttribute("data-theme", theme);

    // 设置 meta theme-color
    const themeColor = THEMES[theme].primary;
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", themeColor);
    }

    // 更新 Mantine 主题
    const mantineTheme = {
      primaryColor: theme === "dark" ? "blue" : theme,
      colorScheme: THEMES[theme].mode,
    };

    // 触发自定义事件，让 Mantine Provider 响应
    window.dispatchEvent(
      new CustomEvent("theme-change", { detail: mantineTheme }),
    );
  }, [theme]);

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      // 如果用户没有手动设置过主题，则跟随系统
      const savedTheme = localStorage.get<ThemeName>("theme");
      if (!savedTheme) {
        setTheme(e.matches ? "dark" : "default");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook 使用主题
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// 主题切换器组件
export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="flex gap-2 p-4">
      {Object.entries(themes).map(([key, config]) => (
        <button
          key={key}
          onClick={() => setTheme(key as ThemeName)}
          className={`
            w-10 h-10 rounded-full border-2 transition-all
            ${theme === key ? "scale-110 border-gray-800" : "border-gray-300"}
          `}
          style={{ backgroundColor: config.primary }}
          title={config.name}
        >
          {theme === key && (
            <span className="block w-full h-full rounded-full bg-white/30" />
          )}
        </button>
      ))}
    </div>
  );
};
