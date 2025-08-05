import { OptimizedImage } from "./OptimizedImage";
import { useImagePreloader } from "@/hooks/useImagePreloader";

// 使用示例组件
export const OptimizedImageExample = () => {
  // 批量预加载图片
  const imagesToPreload = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
  ];

  const { allLoaded, progress, loadedCount, errorCount } =
    useImagePreloader(imagesToPreload);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">OptimizedImage 组件示例</h2>

      {/* 预加载进度 */}
      {!allLoaded && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-blue-600 mb-2">
            预加载图片中... {loadedCount}/{imagesToPreload.length}
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          {errorCount > 0 && (
            <div className="text-sm text-red-600 mt-2">
              {errorCount} 张图片加载失败
            </div>
          )}
        </div>
      )}

      {/* 示例1: 自适应网络质量的图片 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">1. 自适应网络质量</h3>
        <p className="text-sm text-gray-600 mb-2">
          根据网络状态自动选择合适质量的图片
        </p>
        <OptimizedImage
          src="/images/hero.jpg"
          sources={{
            low: "/images/hero-360.jpg",
            medium: "/images/hero-720.jpg",
            high: "/images/hero-1080.jpg",
            original: "/images/hero.jpg",
          }}
          alt="Hero Image"
          className="w-full h-64 rounded-lg shadow-lg"
          lazy
          autoQuality
        />
      </div>

      {/* 示例2: 产品图片网格 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">2. 产品图片网格（懒加载）</h3>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <OptimizedImage
              key={i}
              src={`/images/product-${i}.jpg`}
              sources={{
                low: `/images/product-${i}-small.jpg`,
                medium: `/images/product-${i}-medium.jpg`,
                high: `/images/product-${i}-large.jpg`,
              }}
              alt={`Product ${i}`}
              className="aspect-square rounded-lg"
              lazy
            />
          ))}
        </div>
      </div>

      {/* 示例3: 固定质量的Logo */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">3. 固定质量图片（Logo）</h3>
        <p className="text-sm text-gray-600 mb-2">
          不需要根据网络调整质量的小图片
        </p>
        <OptimizedImage
          src="/images/logo.png"
          alt="Company Logo"
          className="w-32 h-32"
          lazy={false}
          autoQuality={false}
        />
      </div>

      {/* 示例4: 带占位图的大图 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">4. 自定义占位图</h3>
        <OptimizedImage
          src="/images/large-banner.jpg"
          sources={{
            low: "/images/large-banner-480.jpg",
            medium: "/images/large-banner-720.jpg",
            high: "/images/large-banner-1080.jpg",
            original: "/images/large-banner-4k.jpg",
          }}
          alt="Large Banner"
          className="w-full h-96 rounded-lg"
          placeholder="/images/banner-placeholder.svg"
          lazy
          onLoad={() => console.log("大图加载完成")}
          onError={() => console.log("大图加载失败")}
        />
      </div>

      {/* 示例5: 头像组 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">5. 用户头像组</h3>
        <div className="flex -space-x-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <OptimizedImage
              key={i}
              src={`/images/avatar-${i}.jpg`}
              alt={`User ${i}`}
              className="w-12 h-12 rounded-full border-2 border-white"
              lazy={false}
              autoQuality={false}
            />
          ))}
        </div>
      </div>

      {/* 性能提示 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">性能优化提示</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 为不同设备准备不同尺寸的图片</li>
          <li>• 使用 WebP 格式可以进一步减小文件大小</li>
          <li>• 关键图片（首屏）设置 lazy={false}</li>
          <li>• Logo等小图片可以关闭 autoQuality</li>
          <li>• 使用 CDN 加速图片加载</li>
        </ul>
      </div>
    </div>
  );
};

// 在页面中使用的示例
export const ImageGalleryPage = () => {
  // 预加载关键图片
  const criticalImages = [
    "/images/hero.jpg",
    "/images/hero-360.jpg",
    "/images/hero-720.jpg",
  ];

  const { allLoaded } = useImagePreloader(criticalImages);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 等待关键图片加载完成再显示页面 */}
      {!allLoaded ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">加载中...</p>
          </div>
        </div>
      ) : (
        <OptimizedImageExample />
      )}
    </div>
  );
};
