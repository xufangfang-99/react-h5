import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <h3 className="text-xl font-semibold mb-2">页面未找到</h3>
        <p className="text-gray-600 mb-6">抱歉，您访问的页面不存在</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
        >
          返回首页
        </button>
      </div>
    </div>
  );
};

export default NotFound;
