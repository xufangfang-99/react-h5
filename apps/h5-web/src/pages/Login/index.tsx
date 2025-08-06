import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      alert("请填写用户名和密码");
      return;
    }

    setLoading(true);

    // 模拟登录请求
    setTimeout(() => {
      // 模拟登录成功
      const mockUser = {
        id: "1",
        name: formData.username,
        email: `${formData.username}@example.com`,
      };
      const mockToken = "mock-jwt-token";

      login(mockUser, mockToken);

      // 跳转到之前的页面或首页
      navigate(from, { replace: true });

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-center mb-6">欢迎登录</h3>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                用户名
              </label>
              <input
                type="text"
                placeholder="请输入用户名"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                密码
              </label>
              <input
                type="password"
                placeholder="请输入密码"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2"
                checked={formData.remember}
                onChange={(e) =>
                  setFormData({ ...formData, remember: e.target.checked })
                }
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                记住我
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "登录中..." : "登录"}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          测试账号：任意用户名和密码
        </p>
      </div>
    </div>
  );
};

export default Login;
