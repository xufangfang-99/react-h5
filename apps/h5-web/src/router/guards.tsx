import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";

// 路由守卫组件
export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  // 需要登录的路径
  const authRequiredPaths = ["/user", "/settings"];
  const isAuthRequired = authRequiredPaths.some((path) =>
    location.pathname.startsWith(path),
  );

  if (isAuthRequired && !isAuthenticated) {
    // 保存当前路径，登录后跳转回来
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// 路由切换时的处理
export const RouteListener = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    // 路由切换时滚动到顶部
    window.scrollTo(0, 0);

    // 更新页面标题
    const updateTitle = () => {
      const baseTitle = "React H5 Web";
      // 这里可以根据路由配置动态设置标题
      document.title = baseTitle;
    };

    updateTitle();
  }, [location.pathname]);

  return <>{children}</>;
};
