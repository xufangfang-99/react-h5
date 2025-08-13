// src/pages/home/index.tsx
import { lazy, Suspense } from "react";
import { atom, useAtom } from "@/store";

// 使用全局的 currentTemplateAtom 或创建页面级的
const homeTemplateAtom = atom<string>("t1");

// 模板懒加载映射
const templateMap = {
  t1: lazy(() => import("./templates/t1")),
  t2: lazy(() => import("./templates/t2")),
  t3: lazy(() => import("./templates/t3")),
  t4: lazy(() => import("./templates/t4")),
};

export function HomePage() {
  const [currentTemplate, setCurrentTemplate] = useAtom(homeTemplateAtom);
  const Template =
    templateMap[currentTemplate as keyof typeof templateMap] || templateMap.t1;

  return (
    <div>
      {/* 模板切换器 */}
      <div className="fixed top-20 right-4 z-50 bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-sm font-bold mb-2">选择模板</h3>
        <div className="flex gap-2">
          {Object.keys(templateMap).map((key) => (
            <button
              key={key}
              onClick={() => setCurrentTemplate(key)}
              className={`
                px-3 py-1 rounded text-sm transition-all
                ${
                  currentTemplate === key
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }
              `}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 渲染当前模板 */}
      <Suspense
        fallback={
          <div className="flex-center h-screen">
            <div className="text-lg">加载模板中...</div>
          </div>
        }
      >
        <Template />
      </Suspense>
    </div>
  );
}

// 导出给 App.tsx 使用
export default HomePage;
