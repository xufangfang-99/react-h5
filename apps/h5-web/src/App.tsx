// src/App.tsx
import { Routes, Route } from "react-router-dom";
import { Provider } from "@/store";
import { MainLayout } from "@/layouts/MainLayout";
import { BlankLayout } from "@/layouts/BlankLayout";

// 导入新的首页模块
import { HomePage } from "@/pages/home";

// 其他示例页面
const AboutPage = () => <div className="p-4">关于</div>;
const NotFound = () => <div className="p-4">404 - 页面未找到</div>;

function App() {
  return (
    <Provider>
      <Routes>
        {/* 主布局路由 */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>

        {/* 空白布局路由 */}
        <Route path="/blank" element={<BlankLayout />}>
          <Route path="test" element={<div>空白布局测试页</div>} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Provider>
  );
}

export default App;
