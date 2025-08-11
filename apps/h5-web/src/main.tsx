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

// 渲染应用
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
