// apps/h5-web/uno.config.ts
import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
} from "unocss";

export default defineConfig({
  // 指定扫描的内容
  content: {
    pipeline: {
      include: [
        // 默认
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // 包含 src 下的 js/ts 文件
        "src/**/*.{js,ts}",
      ],
    },
  },

  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: false,
    }),
  ],

  shortcuts: [
    // 保持原有的 shortcuts
    ["flex-center", "flex items-center justify-center"],
    ["flex-between", "flex items-center justify-between"],
    ["flex-col-center", "flex flex-col items-center justify-center"],

    ["safe-bottom", "pb-[env(safe-area-inset-bottom)]"],
    ["safe-top", "pt-[env(safe-area-inset-top)]"],

    ["text-ellipsis", "truncate"],
    ["text-ellipsis-2", "line-clamp-2"],
  ],

  // 优化：使用 theme 配置替代部分 rules
  theme: {
    colors: {
      // 映射到 CSS 变量
      primary: "var(--color-primary)",
      "primary-light": "var(--color-primary-light)",
      "primary-dark": "var(--color-primary-dark)",
      base: "var(--color-text)",
      secondary: "var(--color-text-secondary)",
      success: "var(--color-success)",
      error: "var(--color-error)",
      warning: "var(--color-warning)",
    },
  },

  // 简化 rules，移除可以用 theme 替代的部分
  rules: [
    // 只保留背景色和边框色规则（因为 UnoCSS 默认不支持 bg-base 这种写法）
    ["bg-base", { "background-color": "var(--color-bg)" }],
    ["bg-secondary", { "background-color": "var(--color-bg-secondary)" }],
    ["border-base", { "border-color": "var(--color-border)" }],
  ],

  // 保持原有的 variants
  variants: [
    (matcher) => {
      if (!matcher.startsWith("dark:")) return matcher;
      return {
        matcher: matcher.slice(5),
        selector: (s) => `[data-theme="dark"] ${s}`,
      };
    },
  ],
});
