import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./components/ThemeProvider";

// 引入样式 - 按优先级排序
import "virtual:uno.css";
import "@/styles/index.scss";

// 异步导入性能监控，避免阻塞首次渲染
if (import.meta.env.DEV) {
  import("@/utils/performanceMonitor").then(({ performanceMonitor }) => {
    performanceMonitor.report();
  });
}

// 创建根节点
const root = ReactDOM.createRoot(document.getElementById("root")!);

// 渲染应用
root.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="default">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
