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
      warn: true,
    }),
  ],
  theme: {
    colors: {
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
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
    },
    breakpoints: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  shortcuts: [
    // 常用组合
    [
      "btn",
      "px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50",
    ],
    ["btn-primary", "bg-primary-500 hover:bg-primary-600 text-white"],
    ["btn-secondary", "bg-gray-500 hover:bg-gray-600 text-white"],
    [
      "icon-btn",
      "text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600",
    ],
    // 布局
    ["flex-center", "flex items-center justify-center"],
    ["flex-between", "flex items-center justify-between"],
    [
      "absolute-center",
      "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
    ],
    // 移动端适配
    ["safe-area-top", "pt-[env(safe-area-inset-top)]"],
    ["safe-area-bottom", "pb-[env(safe-area-inset-bottom)]"],
    [
      "mobile-container",
      "w-full max-w-md mx-auto bg-white min-h-screen flex flex-col",
    ],
  ],
  rules: [
    // 1px边框解决方案
    [
      "border-1px",
      {
        position: "relative",
      },
    ],
    [
      "border-1px::after",
      {
        content: '""',
        position: "absolute",
        top: "0",
        left: "0",
        width: "200%",
        height: "200%",
        border: "1px solid #e5e7eb",
        "border-radius": "inherit",
        transform: "scale(0.5)",
        "transform-origin": "0 0",
        "pointer-events": "none",
      },
    ],
    // vw 转换规则（基于 375px 设计稿）
    [
      /^w-vw-(\d+)$/,
      ([, d]) => ({ width: `${((Number(d) / 375) * 100).toFixed(3)}vw` }),
    ],
    [
      /^h-vw-(\d+)$/,
      ([, d]) => ({ height: `${((Number(d) / 375) * 100).toFixed(3)}vw` }),
    ],
    [
      /^text-vw-(\d+)$/,
      ([, d]) => ({ "font-size": `${((Number(d) / 375) * 100).toFixed(3)}vw` }),
    ],
    [
      /^p-vw-(\d+)$/,
      ([, d]) => ({ padding: `${((Number(d) / 375) * 100).toFixed(3)}vw` }),
    ],
    [
      /^m-vw-(\d+)$/,
      ([, d]) => ({ margin: `${((Number(d) / 375) * 100).toFixed(3)}vw` }),
    ],
  ],
  content: {
    pipeline: {
      include: [
        // 默认包含
        /\.(vue|svelte|[jt]sx?|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // 包含 js/ts 文件中的内容
        "src/**/*.{js,ts,jsx,tsx}",
      ],
    },
  },
});
