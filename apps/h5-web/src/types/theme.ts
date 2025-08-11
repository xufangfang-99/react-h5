/**
 * 主题相关类型定义
 */

// 主题配置接口 - design-tokens/themes/index.ts 中使用
export interface ThemeConfig {
  id: string;
  name: string;
  colors: Record<string, string>;
}

// 主题模式 - 可能后续会用到
export type ThemeMode = "default" | "dark";
