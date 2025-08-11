// apps/h5-web/uno.config.ts
import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(), // 提供默认的原子化 CSS
    presetAttributify(), // 支持属性模式
    presetIcons({
      // 图标支持
      scale: 1.2,
      warn: false,
    }),
  ],

  shortcuts: [
    // 布局相关 - 这些是常用的组合，适合放在这里
    ["flex-center", "flex items-center justify-center"],
    ["flex-between", "flex items-center justify-between"],
    ["flex-col-center", "flex flex-col items-center justify-center"],

    // 移动端常用
    ["safe-bottom", "pb-[env(safe-area-inset-bottom)]"],
    ["safe-top", "pt-[env(safe-area-inset-top)]"],

    // 文字省略
    ["text-ellipsis", "truncate"],
    ["text-ellipsis-2", "line-clamp-2"],
  ],

  // 只定义简单的 CSS 变量映射规则
  rules: [
    // 文字颜色 - 简单映射到 CSS 变量
    ["text-primary", { color: "var(--color-primary)" }],
    ["text-base", { color: "var(--color-text)" }],
    ["text-secondary", { color: "var(--color-text-secondary)" }],
    ["text-success", { color: "var(--color-success)" }],
    ["text-error", { color: "var(--color-error)" }],
    ["text-warning", { color: "var(--color-warning)" }],

    // 背景颜色
    ["bg-base", { "background-color": "var(--color-bg)" }],
    ["bg-secondary", { "background-color": "var(--color-bg-secondary)" }],
    ["bg-primary", { "background-color": "var(--color-primary)" }],

    // 边框颜色
    ["border-base", { "border-color": "var(--color-border)" }],
    ["border-primary", { "border-color": "var(--color-primary)" }],
  ],

  // 主题变体
  variants: [
    // 暗色模式支持
    (matcher) => {
      if (!matcher.startsWith("dark:")) return matcher;
      return {
        matcher: matcher.slice(5),
        selector: (s) => `[data-theme="dark"] ${s}`,
      };
    },
  ],
});
