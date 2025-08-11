import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { LazyLoad } from "@/components/LazyLoad";

export const HomePage = () => {
  return (
    <div className="p-5 pb-10">
      {/* 首屏核心内容 - 立即渲染 */}
      <h1 className="text-2xl font-bold mb-6">React H5 组件样式示例</h1>

      {/* 按钮示例 - 重要交互元素，立即显示 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">按钮示例</h2>
        <div className="flex gap-4 flex-wrap">
          <Button>主要按钮</Button>
          <Button variant="outline">次要按钮</Button>
          <Button disabled>禁用按钮</Button>
        </div>
      </section>

      {/* 卡片示例 - 首屏可见，立即加载 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">卡片示例</h2>
        <Card className="p-4 mb-4">
          <h3 className="text-lg font-medium mb-2">普通卡片</h3>
          <p className="text-secondary">
            这是卡片内容，用于展示分组信息。卡片会自动适应主题色。
          </p>
        </Card>

        <Card clickable className="p-4">
          <p className="font-medium">可点击的卡片</p>
          <p className="text-sm text-secondary mt-1">
            鼠标悬停或点击试试看效果
          </p>
        </Card>
      </section>

      {/* 1px 边框示例 - 重要展示内容，懒加载 */}
      <LazyLoad
        rootMargin="100px"
        fallback={
          <div className="mb-8 animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 bg-gray-100 rounded"></div>
          </div>
        }
      >
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">1px 细边框示例</h2>
          <p className="text-sm text-secondary mb-4">
            💡 在移动端高清屏上效果更明显
          </p>

          {/* 列表示例 */}
          <Card className="mb-6 overflow-hidden">
            <h3 className="font-medium p-4 bg-secondary">
              设置列表（底部边框）
            </h3>
            <div className="p-4 hairline-b flex-between">
              <div>
                <p className="font-medium">通知推送</p>
                <p className="text-sm text-secondary">接收应用通知</p>
              </div>
              <span className="text-primary">开启</span>
            </div>
            <div className="p-4 hairline-b flex-between">
              <div>
                <p className="font-medium">深色模式</p>
                <p className="text-sm text-secondary">跟随系统设置</p>
              </div>
              <span className="text-secondary">自动</span>
            </div>
            <div className="p-4 flex-between">
              <div>
                <p className="font-medium">清除缓存</p>
                <p className="text-sm text-secondary">12.3 MB</p>
              </div>
              <span className="text-secondary">→</span>
            </div>
          </Card>

          {/* 顶部边框示例 */}
          <div className="mb-6">
            <p className="p-4 bg-secondary rounded-t">区域 1：一些内容</p>
            <div className="p-4 bg-base rounded-b hairline-t">
              <p>区域 2：通过顶部 1px 边框分隔</p>
            </div>
          </div>

          {/* 左右边框示例 */}
          <div className="flex bg-secondary rounded overflow-hidden mb-6">
            <div className="flex-1 p-4 hairline-r">
              <p className="font-medium text-center">左侧</p>
              <p className="text-sm text-secondary text-center">右边框分隔</p>
            </div>
            <div className="flex-1 p-4 hairline-r">
              <p className="font-medium text-center">中间</p>
              <p className="text-sm text-secondary text-center">两侧都有边框</p>
            </div>
            <div className="flex-1 p-4">
              <p className="font-medium text-center">右侧</p>
              <p className="text-sm text-secondary text-center">无边框</p>
            </div>
          </div>

          {/* 表单示例 */}
          <Card className="overflow-hidden">
            <h3 className="font-medium p-4 bg-secondary hairline-b">
              表单示例
            </h3>
            <div className="p-4">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="用户名"
                  className="w-full p-3 hairline-b bg-transparent"
                  style={{ outline: "none" }}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="密码"
                  className="w-full p-3 hairline-b bg-transparent"
                  style={{ outline: "none" }}
                />
              </div>
              <Button className="w-full">登录</Button>
            </div>
          </Card>
        </section>
      </LazyLoad>

      {/* 主题效果展示 - 次要内容，懒加载 */}
      <LazyLoad rootMargin="50px">
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">主题效果</h2>
          <Card className="p-4">
            <p className="mb-2">当前主题会自动应用到所有组件：</p>
            <div className="space-y-2 text-sm">
              <p>
                • 文字颜色：<span className="text-primary">主色</span> /{" "}
                <span className="text-base">基础色</span> /{" "}
                <span className="text-secondary">次要色</span>
              </p>
              <p>
                • 背景颜色：
                <span className="px-2 py-1 bg-base border border-base rounded">
                  基础背景
                </span>{" "}
                /{" "}
                <span className="px-2 py-1 bg-secondary rounded">次要背景</span>
              </p>
              <p>
                • 状态颜色：<span className="text-success">成功</span> /{" "}
                <span className="text-error">错误</span> /{" "}
                <span className="text-warning">警告</span>
              </p>
            </div>
            <p className="text-sm text-secondary mt-4">
              💡 点击右上角"切换主题"按钮查看效果
            </p>
          </Card>
        </section>
      </LazyLoad>

      {/* 移动端优化说明 - 最后加载 */}
      <LazyLoad rootMargin="50px">
        <section>
          <h2 className="text-xl font-bold mb-4">移动端优化</h2>
          <Card className="p-4">
            <ul className="space-y-2 text-sm">
              <li>✓ 使用 postcss-px-to-viewport 自动转换单位</li>
              <li>✓ hairline 类实现真实 1px 边框</li>
              <li>✓ safe-area 适配刘海屏</li>
              <li>✓ 触摸优化，移除点击高亮</li>
              <li>✓ 响应式主题切换</li>
              <li>✓ 懒加载优化，提升首屏性能</li>
            </ul>
          </Card>
        </section>
      </LazyLoad>
    </div>
  );
};
