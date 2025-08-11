export const HomePage = () => {
  const features = [
    {
      title: "主题系统",
      description: "点击右上角按钮切换明暗主题",
    },
    {
      title: "移动端适配",
      description: "使用 postcss-px-to-viewport，直接写 px 自动转 vw",
    },
  ];

  const techStack = [
    "React 19 + TypeScript",
    "Vite + SWC",
    "UnoCSS + Sass",
    "React Router v7",
  ];

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">欢迎使用 React H5 骨架</h1>

      {features.map((feature, index) => (
        <div key={index} className="card p-4 mb-4">
          <h2 className="text-lg font-medium mb-2">{feature.title}</h2>
          <p className="text-secondary">{feature.description}</p>
        </div>
      ))}

      <div className="card p-4">
        <h2 className="text-lg font-medium mb-2">技术栈</h2>
        <ul className="list-disc list-inside text-secondary">
          {techStack.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
