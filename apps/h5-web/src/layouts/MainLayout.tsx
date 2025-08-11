import { Outlet, NavLink } from "react-router-dom";
import { theme } from "@/design-tokens";

export const MainLayout = () => {
  const toggleTheme = () => {
    const current = theme.current();
    theme.apply(current === "default" ? "dark" : "default");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `no-underline transition-colors ${isActive ? "text-primary" : "text-base"}`;

  return (
    <div className="flex flex-col min-h-screen bg-base text-base">
      {/* 头部 */}
      <header className="h-[60px] px-4 flex-between bg-secondary border-b border-base">
        <h1 className="text-xl font-bold">MyApp</h1>

        <nav className="flex gap-5">
          <NavLink to="/" className={navLinkClass}>
            首页
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            关于
          </NavLink>
        </nav>

        <button onClick={toggleTheme} className="btn">
          切换主题
        </button>
      </header>

      {/* 主内容 */}
      <main className="flex-1 p-5">
        <Outlet />
      </main>

      {/* 底部 - 添加移动端安全区域 */}
      <footer className="p-5 safe-bottom text-center bg-secondary border-t border-base text-secondary">
        <p>© 2024 MyApp</p>
      </footer>
    </div>
  );
};
