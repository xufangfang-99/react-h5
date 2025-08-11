import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// 样式 - 按重要性排序
import "virtual:uno.css";
import "./design-tokens/theme.scss";
import "./styles/index.scss";

// 主题初始化 - 尽快执行
import { theme } from "@/design-tokens";
theme.init();

// 动态导入 App 组件
const App = React.lazy(() => import("./App"));

// 渲染应用
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <React.Suspense fallback={null}>
        <App />
      </React.Suspense>
    </BrowserRouter>
  </React.StrictMode>,
);
