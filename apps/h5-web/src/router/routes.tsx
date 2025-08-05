import type { RouteObject } from "react-router-dom";
import Layout from "@/layout/index";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

// 路由配置
export const routeConfig: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "demo",
        element: "MobileUtilsDemo", // 字符串会被转换为懒加载
      },
      {
        path: "gallery",
        element: "ImageGalleryPage",
      },
      {
        path: "user",
        element: "User",
      },
      {
        path: "login",
        element: "Login",
      },
      {
        path: "settings",
        element: "Settings",
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

// 路由元信息类型
export interface RouteMeta {
  title?: string;
  icon?: React.ReactNode;
  requireAuth?: boolean;
  hideInMenu?: boolean;
  keepAlive?: boolean;
}

// 带元信息的路由配置（用于生成菜单等）
export const routesWithMeta = [
  {
    path: "/",
    meta: {
      title: "首页",
      icon: "IconHome",
    },
  },
  {
    path: "/demo",
    meta: {
      title: "工具演示",
      icon: "IconList",
    },
  },
  {
    path: "/gallery",
    meta: {
      title: "图片画廊",
      icon: "IconPhoto",
    },
  },
  {
    path: "/user",
    meta: {
      title: "我的",
      icon: "IconUser",
    },
  },
  {
    path: "/login",
    meta: {
      title: "登录",
      hideInMenu: true,
    },
  },
  {
    path: "/settings",
    meta: {
      title: "设置",
      requireAuth: true,
      hideInMenu: true,
    },
  },
];
