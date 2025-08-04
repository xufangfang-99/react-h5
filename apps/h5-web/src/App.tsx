import { useState } from "react";
import { TabBar } from "antd-mobile";
import {
  AppOutline,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import MobileUtilsDemo from "./pages/MobileUtilsDemo";

function App() {
  const [activeKey, setActiveKey] = useState("demo");

  const tabs = [
    {
      key: "home",
      title: "首页",
      icon: <AppOutline />,
    },
    {
      key: "demo",
      title: "工具演示",
      icon: <UnorderedListOutline />,
    },
    {
      key: "user",
      title: "我的",
      icon: <UserOutline />,
    },
  ];

  return (
    <div className="mobile-container">
      <div className="flex-1 overflow-auto">
        {activeKey === "home" && (
          <div className="p-4">
            <header className="bg-primary-500 text-white p-4 rounded-lg mb-4">
              <h1 className="text-lg font-bold text-center">React H5 Web</h1>
            </header>

            <div className="bg-white rounded-lg p-4 mb-4 border-1px">
              <h2 className="text-base font-semibold mb-2">欢迎使用</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                这是一个基于 Vite + React + TypeScript + UnoCSS 构建的现代化 H5
                项目模板。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border-1px flex-center flex-col">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex-center mb-2">
                  <span className="text-primary-500 text-lg">📱</span>
                </div>
                <span className="text-sm text-gray-700">移动端优化</span>
              </div>

              <div className="bg-white rounded-lg p-4 border-1px flex-center flex-col">
                <div className="w-12 h-12 bg-green-100 rounded-full flex-center mb-2">
                  <span className="text-green-500 text-lg">⚡</span>
                </div>
                <span className="text-sm text-gray-700">极速开发</span>
              </div>
            </div>
          </div>
        )}

        {activeKey === "demo" && <MobileUtilsDemo />}

        {activeKey === "user" && (
          <div className="p-4">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex-center">
                <UserOutline fontSize={32} color="#999" />
              </div>
              <h2 className="text-lg font-semibold mb-2">用户中心</h2>
              <p className="text-gray-500 text-sm">暂未登录</p>
            </div>
          </div>
        )}
      </div>

      <TabBar activeKey={activeKey} onChange={setActiveKey}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
}

export default App;
