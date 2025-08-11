import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// 样式
import "virtual:uno.css";
import "./design-tokens/theme.scss"; // 主题 CSS 变量
import "./styles/index.scss"; // 全局样式

// 主题初始化
import { theme } from "@/design-tokens";
theme.init();

if (import.meta.env.VITE_CDN === "true") {
  const link = document.createElement("link");
  link.rel = "preconnect";
  link.href = "https://cdn.bootcdn.net";
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
}

// 渲染应用
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
