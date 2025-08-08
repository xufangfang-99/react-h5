// apps/h5-web/uno.config.ts
import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: false,
    }),
  ],

  theme: {
    colors: {
      // 只保留主色调，其他用 UnoCSS 默认的
      primary: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
      },
    },
  },

  shortcuts: [
    // 只保留最常用的
    ["btn", "px-4 py-2 rounded transition-colors cursor-pointer"],
    ["card", "bg-white rounded-lg shadow-sm"],
    ["flex-center", "flex items-center justify-center"],
    ["flex-between", "flex items-center justify-between"],
  ],
});
