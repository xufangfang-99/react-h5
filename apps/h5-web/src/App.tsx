import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { BlankLayout } from "@/layouts/BlankLayout";

// 导入新创建的页面
import { HomePage } from "@/pages/Home";

// 其他示例页面
const AboutPage = () => <div className="p-4">关于</div>;
const NotFound = () => <div className="p-4">404 - 页面未找到</div>;

function App() {
  return (
    <Routes>
      {/* 主布局路由 */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} /> {/* 使用新的 HomePage */}
        <Route path="about" element={<AboutPage />} />
      </Route>

      {/* 空白布局路由 */}
      <Route path="/blank" element={<BlankLayout />}>
        <Route path="test" element={<div>空白布局测试页</div>} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
