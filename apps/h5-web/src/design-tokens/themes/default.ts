import type { ThemeConfig } from "./index";

const theme: ThemeConfig = {
  id: "default",
  name: "默认主题",
  colors: {
    // 主色
    "color-primary": "#2563eb",
    "color-primary-light": "#3b82f6",
    "color-primary-dark": "#1d4ed8",

    // 背景色
    "color-bg": "#ffffff",
    "color-bg-secondary": "#f9fafb",

    // 文字色
    "color-text": "#111827",
    "color-text-secondary": "#6b7280",

    // 边框色
    "color-border": "#e5e7eb",

    // 状态色
    "color-success": "#10b981",
    "color-error": "#ef4444",
    "color-warning": "#f59e0b",
  },
};

export default theme;
