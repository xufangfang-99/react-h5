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
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
  safelist: [
    "animate-spin",
    "animate-pulse",
    // 添加主题相关的安全类名
    ...Array.from({ length: 10 }, (_, i) => {
      const level = (i + 1) * 100 - 50;
      return [
        `bg-primary-${level}`,
        `text-primary-${level}`,
        `border-primary-${level}`,
        `shadow-primary-${level}`,
      ];
    }).flat(),
  ],
  blocklist: [
    "container",
    "return",
    "function",
    "try",
    "export",
    "import",
    "const",
    "let",
    "var",
    "if",
    "else",
    "for",
    "while",
    "do",
    "switch",
    "case",
    "default",
    "break",
    "continue",
  ],
  theme: {
    colors: {
      // 使用 CSS 变量，支持主题切换
      primary: {
        50: "var(--color-primary-50)",
        100: "var(--color-primary-100)",
        200: "var(--color-primary-200)",
        300: "var(--color-primary-300)",
        400: "var(--color-primary-400)",
        500: "var(--color-primary-500)",
        600: "var(--color-primary-600)",
        700: "var(--color-primary-700)",
        800: "var(--color-primary-800)",
        900: "var(--color-primary-900)",
      },
      gray: {
        50: "var(--color-gray-50)",
        100: "var(--color-gray-100)",
        200: "var(--color-gray-200)",
        300: "var(--color-gray-300)",
        400: "var(--color-gray-400)",
        500: "var(--color-gray-500)",
        600: "var(--color-gray-600)",
        700: "var(--color-gray-700)",
        800: "var(--color-gray-800)",
        900: "var(--color-gray-900)",
      },
      success: {
        50: "var(--color-success-50)",
        100: "var(--color-success-100)",
        200: "var(--color-success-200)",
        300: "var(--color-success-300)",
        400: "var(--color-success-400)",
        500: "var(--color-success-500)",
        600: "var(--color-success-600)",
        700: "var(--color-success-700)",
        800: "var(--color-success-800)",
        900: "var(--color-success-900)",
      },
      warning: {
        50: "var(--color-warning-50)",
        100: "var(--color-warning-100)",
        200: "var(--color-warning-200)",
        300: "var(--color-warning-300)",
        400: "var(--color-warning-400)",
        500: "var(--color-warning-500)",
        600: "var(--color-warning-600)",
        700: "var(--color-warning-700)",
        800: "var(--color-warning-800)",
        900: "var(--color-warning-900)",
      },
      error: {
        50: "var(--color-error-50)",
        100: "var(--color-error-100)",
        200: "var(--color-error-200)",
        300: "var(--color-error-300)",
        400: "var(--color-error-400)",
        500: "var(--color-error-500)",
        600: "var(--color-error-600)",
        700: "var(--color-error-700)",
        800: "var(--color-error-800)",
        900: "var(--color-error-900)",
      },
      info: {
        50: "var(--color-info-50)",
        100: "var(--color-info-100)",
        200: "var(--color-info-200)",
        300: "var(--color-info-300)",
        400: "var(--color-info-400)",
        500: "var(--color-info-500)",
        600: "var(--color-info-600)",
        700: "var(--color-info-700)",
        800: "var(--color-info-800)",
        900: "var(--color-info-900)",
      },
    },
    // 添加阴影配置
    boxShadow: {
      xs: "var(--shadow-xs)",
      sm: "var(--shadow-sm)",
      md: "var(--shadow-md)",
      lg: "var(--shadow-lg)",
      xl: "var(--shadow-xl)",
      "2xl": "var(--shadow-2xl)",
      inner: "var(--shadow-inner)",
      primary: "var(--shadow-primary)",
      success: "var(--shadow-success)",
      error: "var(--shadow-error)",
      none: "none",
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
    // 主题感知的按钮
    [
      "btn-primary",
      "bg-primary-500 hover:bg-primary-600 text-white shadow-sm hover:shadow-md transition-all",
    ],
    [
      "btn-secondary",
      "bg-gray-500 hover:bg-gray-600 text-white shadow-sm hover:shadow-md transition-all",
    ],
    [
      "btn-ghost",
      "bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-all",
    ],
    // 卡片样式
    ["card", "bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"],
    ["card-bordered", "bg-white rounded-lg border border-gray-200"],
    // 语义化背景
    ["bg-surface", "bg-[var(--color-background-primary)]"],
    ["bg-surface-secondary", "bg-[var(--color-background-secondary)]"],
    // 语义化文本
    ["text-primary", "text-[var(--color-text-primary)]"],
    ["text-secondary", "text-[var(--color-text-secondary)]"],
    ["text-tertiary", "text-[var(--color-text-tertiary)]"],
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
    // 动态颜色规则
    [
      /^theme-color-(.+)$/,
      ([, color]) => ({
        color: `var(--color-primary-${color})`,
      }),
    ],
    [
      /^theme-bg-(.+)$/,
      ([, color]) => ({
        "background-color": `var(--color-primary-${color})`,
      }),
    ],
    [
      /^theme-border-(.+)$/,
      ([, color]) => ({
        "border-color": `var(--color-primary-${color})`,
      }),
    ],
    // 动态阴影规则
    [
      /^theme-shadow-(.+)$/,
      ([, shadow]) => ({
        "box-shadow": `var(--shadow-${shadow})`,
      }),
    ],
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
        border: "1px solid var(--color-border-default)",
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
