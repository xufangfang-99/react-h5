import { Outlet } from "react-router-dom";

export const BlankLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Outlet />
    </div>
  );
};
