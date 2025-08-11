import { Outlet } from "react-router-dom";

export const BlankLayout = () => {
  return (
    <div className="min-h-screen bg-base text-base">
      <Outlet />
    </div>
  );
};
