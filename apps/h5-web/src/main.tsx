// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import App from "./App.tsx";
import { ThemeProvider } from "./components/ThemeProvider";

// 引入样式 - 按优先级排序
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "virtual:uno.css";
import "@/styles/index.scss"; // 改为 scss
import "@/styles/mobile.scss"; // 改为 scss

// 异步导入性能监控，避免阻塞首次渲染
if (import.meta.env.DEV) {
  import("@/utils/performanceMonitor").then(({ performanceMonitor }) => {
    performanceMonitor.report();
  });
}

// 创建根节点
const root = ReactDOM.createRoot(document.getElementById("root")!);

// 先渲染一个加载状态，让页面快速显示
root.render(
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-600">加载中...</p>
    </div>
  </div>,
);

// 然后渲染实际应用
requestAnimationFrame(() => {
  root.render(
    <React.StrictMode>
      <ThemeProvider defaultTheme="default">
        <MantineProvider
          theme={{
            primaryColor: "blue",
            defaultRadius: "md",
            components: {
              Button: {
                defaultProps: {
                  size: "md",
                },
              },
            },
            // 响应主题变化
            other: {
              themeChangeListener: true,
            },
          }}
        >
          <Notifications position="top-center" />
          <App />
        </MantineProvider>
      </ThemeProvider>
    </React.StrictMode>,
  );
});
