import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

// 路由权限检查 Hook
export const useRoutePermission = () => {
  const location = useLocation();
  const { user, permissions } = useAuthStore();

  const hasPermission = (permission: string) => {
    return permissions.includes(permission);
  };

  const canAccessRoute = (path: string) => {
    // 这里可以实现更复杂的权限逻辑
    const routePermissions: Record<string, string[]> = {
      "/admin": ["admin"],
      "/settings": ["user"],
    };

    const requiredPermissions = routePermissions[path];
    if (!requiredPermissions) return true;

    return requiredPermissions.some((perm) => hasPermission(perm));
  };

  // 检查用户是否有特定角色
  const hasRole = (role: string) => {
    // 这里可以根据 user 对象中的角色信息判断
    // 例如：return user?.roles?.includes(role) || false;

    // 当前简化实现，管理员用户名为 "admin"
    return user?.name === "admin" && role === "admin";
  };

  return {
    hasPermission,
    canAccessRoute,
    hasRole,
    currentPath: location.pathname,
    currentUser: user,
  };
};
