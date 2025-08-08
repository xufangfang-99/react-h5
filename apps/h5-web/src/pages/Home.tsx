export const HomePage = () => {
  return (
    <div className="p-[20px]">
      <h1 className="text-[24px] font-bold mb-[16px]">
        欢迎使用 React H5 骨架
      </h1>

      <div className="card p-[16px] mb-[16px]">
        <h2 className="text-[18px] font-medium mb-[8px]">主题系统</h2>
        <p className="text-[var(--color-text-secondary)]">
          点击右上角按钮切换明暗主题
        </p>
      </div>

      <div className="card p-[16px] mb-[16px]">
        <h2 className="text-[18px] font-medium mb-[8px]">移动端适配</h2>
        <p className="text-[var(--color-text-secondary)]">
          使用 postcss-px-to-viewport，直接写 px 自动转 vw
        </p>
      </div>

      <div className="card p-[16px]">
        <h2 className="text-[18px] font-medium mb-[8px]">技术栈</h2>
        <ul className="list-disc list-inside text-[var(--color-text-secondary)]">
          <li>React 19 + TypeScript</li>
          <li>Vite + SWC</li>
          <li>UnoCSS + Sass</li>
          <li>React Router v6</li>
        </ul>
      </div>
    </div>
  );
};
