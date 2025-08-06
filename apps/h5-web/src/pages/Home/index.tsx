const Home = () => {
  const features = [
    {
      title: "移动端优化",
      description: "专为移动设备设计",
      color: "blue",
    },
    {
      title: "极速开发",
      description: "Vite + SWC 极速体验",
      color: "green",
    },
    {
      title: "类型安全",
      description: "TypeScript 全覆盖",
      color: "violet",
    },
    {
      title: "生产就绪",
      description: "完整工程化配置",
      color: "orange",
    },
  ];

  return (
    <div className="p-4">
      <div className="bg-primary-500 text-white rounded-lg p-6 mb-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">React H5 Web</h2>
          <p className="text-sm opacity-90">现代化移动端开发模板</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <h4 className="text-lg font-semibold mb-2">欢迎使用 👋</h4>
        <p className="text-sm text-gray-600">
          这是一个基于 React 19 + TypeScript + Vite 构建的现代化 H5
          项目模板，集成了完整的工程化配置和移动端优化方案。
        </p>
      </div>

      <h5 className="text-base font-semibold mb-3">核心特性</h5>

      <div className="grid grid-cols-2 gap-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
          >
            <div className="text-center">
              <div
                className={`w-12 h-12 bg-${feature.color}-100 rounded-full mx-auto mb-2 flex items-center justify-center`}
              >
                <span className={`text-${feature.color}-500 text-xl`}>✨</span>
              </div>
              <p className="text-sm font-medium mb-1">{feature.title}</p>
              <p className="text-xs text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
        <h5 className="text-base font-semibold mb-3">快速开始</h5>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">1.</span> 查看工具演示了解
            mobile-utils 功能
          </p>
          <p className="text-sm">
            <span className="font-medium">2.</span> 浏览图片画廊体验优化加载
          </p>
          <p className="text-sm">
            <span className="font-medium">3.</span> 开始构建你的移动应用
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
