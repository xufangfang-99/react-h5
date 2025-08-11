// 优化后的主题管理器
class ThemeManager {
  private root = document.documentElement;
  private loadedThemes = new Map<string, any>();

  // 动态加载主题
  async loadTheme(themeId: string) {
    if (this.loadedThemes.has(themeId)) {
      return this.loadedThemes.get(themeId);
    }

    try {
      const module = await import(`./themes/${themeId}.ts`);
      const theme = module.default;
      this.loadedThemes.set(themeId, theme);
      return theme;
    } catch (error) {
      console.error(`加载主题失败: ${themeId}`, error);
      return null;
    }
  }

  // 应用主题
  async apply(themeId: string) {
    const theme = await this.loadTheme(themeId);
    if (!theme) return;

    // 应用 CSS 变量
    Object.entries(theme.colors).forEach(([key, value]) => {
      this.root.style.setProperty(`--${key}`, String(value));
    });

    // 设置主题标识
    this.root.setAttribute("data-theme", themeId);
    localStorage.setItem("theme", themeId);
  }

  // 获取当前主题
  current(): string {
    return localStorage.getItem("theme") || "default";
  }

  // 初始化
  async init() {
    await this.apply(this.current());
  }
}

export const theme = new ThemeManager();
