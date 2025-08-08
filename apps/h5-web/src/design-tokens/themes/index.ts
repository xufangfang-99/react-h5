// 主题类型
export interface ThemeConfig {
  id: string;
  name: string;
  colors: Record<string, string>;
}

// 自动导入所有主题
const modules = import.meta.glob<{ default: ThemeConfig }>("./*.ts", {
  eager: true,
});

// 主题映射表
export const themes = new Map<string, ThemeConfig>();

// 注册所有主题
Object.entries(modules).forEach(([path, module]) => {
  if (path === "./index.ts") return;

  const theme = module.default;
  if (theme?.id) {
    themes.set(theme.id, theme);
  }
});
