import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthGuard, RouteListener } from "@/router/guards";

// 路由映射到 Tab
const pathToTab: Record<string, string> = {
  "/": "home",
  "/demo": "demo",
  "/gallery": "gallery",
  "/user": "user",
};

// Tab 映射到路由
const tabToPath: Record<string, string> = {
  home: "/",
  demo: "/demo",
  gallery: "/gallery",
  user: "/user",
};

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("home");

  // 根据路由更新 Tab
  useEffect(() => {
    const tab = pathToTab[location.pathname];
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.pathname]);

  const handleTabChange = (value: string) => {
    if (tabToPath[value]) {
      navigate(tabToPath[value]);
    }
  };

  // 判断是否需要显示底部导航
  const hideTabBarPaths = ["/login", "/settings"];
  const shouldShowTabBar = !hideTabBarPaths.includes(location.pathname);

  return (
    <AuthGuard>
      <RouteListener>
        <div className="mobile-container">
          <div
            className={`flex-1 overflow-auto ${shouldShowTabBar ? "" : "h-full"}`}
          >
            <Outlet />
          </div>

          {shouldShowTabBar && (
            <nav className="border-t bg-white">
              <ul className="flex">
                {Object.entries(tabToPath).map(([key]) => (
                  <li key={key} className="flex-1">
                    <button
                      onClick={() => handleTabChange(key)}
                      className={`w-full py-3 text-center ${
                        activeTab === key ? "text-primary-500" : "text-gray-600"
                      }`}
                    >
                      {key === "home" && "首页"}
                      {key === "demo" && "演示"}
                      {key === "gallery" && "图片"}
                      {key === "user" && "我的"}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </RouteListener>
    </AuthGuard>
  );
};

export default Layout;
