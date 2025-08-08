import type { ThemeConfig } from "./index";

const theme: ThemeConfig = {
  id: "dark",
  name: "深色主题",
  colors: {
    // 主色
    "color-primary": "#60a5fa",
    "color-primary-light": "#93c5fd",
    "color-primary-dark": "#3b82f6",

    // 背景色
    "color-bg": "#111827",
    "color-bg-secondary": "#1f2937",

    // 文字色
    "color-text": "#f9fafb",
    "color-text-secondary": "#d1d5db",

    // 边框色
    "color-border": "#374151",

    // 状态色
    "color-success": "#34d399",
    "color-error": "#f87171",
    "color-warning": "#fbbf24",
  },
};

export default theme;
