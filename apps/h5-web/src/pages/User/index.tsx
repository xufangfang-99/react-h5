import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

const User = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const menuItems = [
    {
      label: "设置",
      path: "/settings",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">👤</span>
          </div>
          <h4 className="text-lg font-semibold mb-2">未登录</h4>
          <p className="text-sm text-gray-600 mb-4">登录后查看个人信息</p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            立即登录
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-blue-500 text-white mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <h4 className="text-lg font-semibold">{user?.name || "用户"}</h4>
          <p className="text-sm text-gray-600">
            {user?.email || "user@example.com"}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="w-full bg-white rounded-lg shadow-sm p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="flex items-center gap-3">
              <span>⚙️</span>
              <span>{item.label}</span>
            </span>
            <span className="text-gray-400">›</span>
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="w-full bg-white rounded-lg shadow-sm p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <span className="flex items-center gap-3 text-red-500">
            <span>🚪</span>
            <span>退出登录</span>
          </span>
          <span className="text-gray-400">›</span>
        </button>
      </div>
    </div>
  );
};

export default User;
