import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AppShell, Tabs, rem, Box } from "@mantine/core";
import { IconHome, IconList, IconPhoto, IconUser } from "@tabler/icons-react";
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

  const iconStyle = { width: rem(20), height: rem(20) };

  // 根据路由更新 Tab
  useEffect(() => {
    const tab = pathToTab[location.pathname];
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.pathname]);

  const handleTabChange = (value: string | null) => {
    if (value && tabToPath[value]) {
      navigate(tabToPath[value]);
    }
  };

  // 判断是否需要显示底部导航
  const hideTabBarPaths = ["/login", "/settings"];
  const shouldShowTabBar = !hideTabBarPaths.includes(location.pathname);

  return (
    <AuthGuard>
      <RouteListener>
        <AppShell
          header={{ height: 0 }}
          navbar={{ width: 0, breakpoint: 0 }}
          padding={0}
        >
          <Box className="mobile-container">
            <Box
              className={`flex-1 overflow-auto ${shouldShowTabBar ? "" : "h-full"}`}
            >
              <Outlet />
            </Box>

            {shouldShowTabBar && (
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="default"
                className="border-t"
              >
                <Tabs.List grow>
                  <Tabs.Tab
                    value="home"
                    leftSection={<IconHome style={iconStyle} />}
                  >
                    首页
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="demo"
                    leftSection={<IconList style={iconStyle} />}
                  >
                    工具演示
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="gallery"
                    leftSection={<IconPhoto style={iconStyle} />}
                  >
                    图片画廊
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="user"
                    leftSection={<IconUser style={iconStyle} />}
                  >
                    我的
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>
            )}
          </Box>
        </AppShell>
      </RouteListener>
    </AuthGuard>
  );
};

export default Layout;
