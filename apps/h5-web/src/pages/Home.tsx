import { useUser, useGlobalLoading } from "@/store";
import { Button } from "@/components/Button";

export function HomePage() {
  const { user, isLoggedIn, login, logout } = useUser();
  const { loading, execWithLoading } = useGlobalLoading(); // 注意是 execWithLoading，不是 withLoading

  const handleTestLogin = async () => {
    await execWithLoading(async () => {
      // 模拟登录请求
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 设置用户信息
      login({
        id: "123",
        name: "测试用户",
        avatar: "/avatar.jpg",
        token: "test-token-123",
      });
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">React H5 首页</h1>

      <div className="space-y-4">
        {isLoggedIn ? (
          <div className="card p-4">
            <h2 className="text-lg font-semibold mb-2">欢迎回来！</h2>
            <p className="mb-2">用户名：{user?.name}</p>
            <p className="mb-2">ID：{user?.id}</p>
            <Button onClick={logout} variant="outline">
              退出登录
            </Button>
          </div>
        ) : (
          <div className="card p-4">
            <p className="mb-4">您还未登录</p>
            <Button onClick={handleTestLogin} disabled={loading}>
              {loading ? "登录中..." : "测试登录"}
            </Button>
          </div>
        )}

        <div className="card p-4">
          <h2 className="text-lg font-semibold mb-2">功能演示</h2>
          <ul className="space-y-2">
            <li>✅ 主题切换（点击头部按钮）</li>
            <li>✅ 用户登录状态管理</li>
            <li>✅ 全局加载状态</li>
            <li>✅ 响应式设计</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
