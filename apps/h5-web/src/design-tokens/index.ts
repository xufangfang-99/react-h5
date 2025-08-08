// 极简的主题管理器
class ThemeManager {
  private root = document.documentElement;

  // 应用主题
  async apply(themeId: string) {
    try {
      const { themes } = await import("./themes/index");
      const theme = themes.get(themeId);

      if (!theme) {
        console.warn(`主题 ${themeId} 不存在`);
        return;
      }

      // 应用 CSS 变量
      Object.entries(theme.colors).forEach(([key, value]) => {
        this.root.style.setProperty(`--${key}`, String(value));
      });

      // 设置主题标识
      this.root.setAttribute("data-theme", themeId);

      // 保存到本地
      localStorage.setItem("theme", themeId);
    } catch (error) {
      console.error("应用主题失败:", error);
    }
  }

  // 获取当前主题
  current(): string {
    return localStorage.getItem("theme") || "default";
  }

  // 初始化
  init() {
    this.apply(this.current());
  }
}

export const theme = new ThemeManager();
