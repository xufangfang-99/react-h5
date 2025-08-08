import { Outlet, NavLink } from "react-router-dom";
import { theme } from "@/design-tokens";

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* 头部 */}
      <header className="h-[60px] px-[16px] flex items-center justify-between bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]">
        <h1 className="text-[20px] font-bold">MyApp</h1>

        <nav className="flex gap-[20px]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `no-underline transition-colors ${isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text)]"}`
            }
          >
            首页
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `no-underline transition-colors ${isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text)]"}`
            }
          >
            关于
          </NavLink>
        </nav>

        <button
          onClick={() => {
            const current = theme.current();
            theme.apply(current === "default" ? "dark" : "default");
          }}
          className="btn"
        >
          切换主题
        </button>
      </header>

      {/* 主内容 */}
      <main className="flex-1 p-[20px]">
        <Outlet />
      </main>

      {/* 底部 */}
      <footer className="p-[20px] text-center bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] text-[var(--color-text-secondary)]">
        <p>© 2024 MyApp</p>
      </footer>
    </div>
  );
};
