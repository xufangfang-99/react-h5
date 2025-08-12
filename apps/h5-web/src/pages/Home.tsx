// src/pages/Home/index.tsx
import { useUser, useGlobalLoading } from "@/store/hooks";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export const HomePage = () => {
  const { user, isLoggedIn, login, logout } = useUser();
  const [loading, setLoading] = useGlobalLoading();

  const handleLogin = async () => {
    setLoading(true);
    // 模拟登录
    setTimeout(() => {
      login({
        id: "1",
        name: "测试用户",
        avatar: "https://via.placeholder.com/50",
        token: "test-token",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">Jotai 状态管理示例</h1>

      {/* 用户状态展示 */}
      <Card className="p-4 mb-4">
        <h2 className="text-lg font-medium mb-3">用户状态</h2>
        {isLoggedIn ? (
          <div>
            <p className="mb-2">用户名：{user.name}</p>
            <p className="mb-2">ID：{user.id}</p>
            <Button onClick={logout} variant="outline">
              退出登录
            </Button>
          </div>
        ) : (
          <div>
            <p className="mb-3 text-secondary">未登录</p>
            <Button onClick={handleLogin} disabled={loading}>
              {loading ? "登录中..." : "模拟登录"}
            </Button>
          </div>
        )}
      </Card>

      {/* Jotai 特性说明 */}
      <Card className="p-4">
        <h2 className="text-lg font-medium mb-3">Jotai 核心特性</h2>
        <ul className="space-y-2 text-sm">
          <li>✅ 原子化状态管理</li>
          <li>✅ 自动依赖追踪</li>
          <li>✅ 支持异步状态</li>
          <li>✅ 内置持久化（atomWithStorage）</li>
          <li>✅ TypeScript 友好</li>
          <li>✅ React Suspense 支持</li>
        </ul>
      </Card>
    </div>
  );
};
