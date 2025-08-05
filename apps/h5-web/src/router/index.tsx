import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { routeConfig } from "./routes";
import type { RouteObject } from "react-router-dom";
import Loading from "@/components/Loading";

// 获取环境变量中的路由模式
const ROUTER_MODE = import.meta.env.VITE_ROUTER_HISTORY || "hash";

// 懒加载组件包装器
const lazyLoad = (Component: React.LazyExoticComponent<any>) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
};

// 懒加载页面组件映射
const pageModules: Record<string, () => Promise<any>> = {
  MobileUtilsDemo: () => import("@/pages/MobileUtilsDemo"),
  ImageGalleryPage: () => import("@/pages/ImageGalleryPage"),
  User: () => import("@/pages/User"),
  Login: () => import("@/pages/Login"),
  Settings: () => import("@/pages/Settings"),
};

// 预加载重要页面
if (typeof window !== "undefined") {
  // 预加载首页相关组件
  const preloadModules = ["MobileUtilsDemo"];
  preloadModules.forEach((moduleName) => {
    if (pageModules[moduleName]) {
      pageModules[moduleName]();
    }
  });
}

// 处理路由配置，添加懒加载
const processRoutes = (routes: RouteObject[]): RouteObject[] => {
  return routes.map((route) => {
    const processedRoute: RouteObject = { ...route };

    // 如果有 component 字符串，转换为懒加载
    if (typeof route.element === "string") {
      const moduleLoader = pageModules[route.element];
      if (moduleLoader) {
        const Component = lazy(moduleLoader);
        processedRoute.element = lazyLoad(Component);
      }
    }

    // 递归处理子路由
    if (route.children) {
      processedRoute.children = processRoutes(route.children);
    }

    return processedRoute;
  });
};

// 创建路由
const createRouter = () => {
  const routes = processRoutes(routeConfig);

  if (ROUTER_MODE === "hash") {
    return createHashRouter(routes);
  }

  return createBrowserRouter(routes, {
    basename: import.meta.env.VITE_PUBLIC_PATH || "/",
  });
};

export const router = createRouter();
