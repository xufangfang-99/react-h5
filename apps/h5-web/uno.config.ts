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

  // 不再定义静态颜色，因为我们使用 CSS 变量
  theme: {
    // 可以定义其他不需要主题切换的设计令牌
    // 比如间距、字体大小等
  },

  shortcuts: [
    // 布局相关
    ["flex-center", "flex items-center justify-center"],
    ["flex-between", "flex items-center justify-between"],
    ["flex-col-center", "flex flex-col items-center justify-center"],

    // 基础组件样式 - 使用 CSS 变量
    [
      "btn",
      "px-4 py-2 rounded transition-colors cursor-pointer bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]",
    ],
    [
      "btn-outline",
      "px-4 py-2 rounded transition-colors cursor-pointer border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white",
    ],
    [
      "card",
      "bg-[var(--color-bg)] rounded-lg shadow-sm border border-[var(--color-border)]",
    ],

    // 文字颜色 - 使用 CSS 变量
    ["text-primary", "text-[var(--color-primary)]"],
    ["text-base", "text-[var(--color-text)]"],
    ["text-secondary", "text-[var(--color-text-secondary)]"],
    ["text-success", "text-[var(--color-success)]"],
    ["text-error", "text-[var(--color-error)]"],
    ["text-warning", "text-[var(--color-warning)]"],

    // 背景颜色 - 使用 CSS 变量
    ["bg-base", "bg-[var(--color-bg)]"],
    ["bg-secondary", "bg-[var(--color-bg-secondary)]"],
    ["bg-primary", "bg-[var(--color-primary)]"],

    // 边框 - 使用 CSS 变量
    ["border-base", "border-[var(--color-border)]"],
    ["border-primary", "border-[var(--color-primary)]"],

    // 移动端常用
    ["safe-bottom", "pb-[env(safe-area-inset-bottom)]"],
    ["safe-top", "pt-[env(safe-area-inset-top)]"],

    // 1px 边框（移动端）
    [
      "hairline-t",
      "relative before:absolute before:left-0 before:top-0 before:right-0 before:h-px before:bg-[var(--color-border)] before:scale-y-50",
    ],
    [
      "hairline-b",
      "relative after:absolute after:left-0 after:bottom-0 after:right-0 after:h-px after:bg-[var(--color-border)] after:scale-y-50",
    ],

    // 文字省略
    ["text-ellipsis", "truncate"],
    ["text-ellipsis-2", "line-clamp-2"],

    // 动画
    ["transition-base", "transition-all duration-300 ease-in-out"],
    ["animate-in", "animate-fade-in animate-duration-300"],
  ],

  // 自定义规则 - 支持 CSS 变量的更多用法
  rules: [
    // 支持 text-primary/50 这样的透明度写法
    [
      /^text-primary\/(\d+)$/,
      ([, d]) => ({ color: `rgb(var(--color-primary-rgb) / ${d}%)` }),
    ],
    [
      /^bg-primary\/(\d+)$/,
      ([, d]) => ({ background: `rgb(var(--color-primary-rgb) / ${d}%)` }),
    ],
  ],

  // 预设一些有用的变体
  variants: [
    // 暗色模式 - 基于 data-theme 属性
    {
      name: "dark",
      match(matcher) {
        return {
          matcher,
          selector: (s) => `[data-theme="dark"] ${s}`,
        };
      },
    },
  ],
});
