import { useState } from "react";
import { OptimizedImage } from "@/components/OptimizedImage";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import {
  getNetworkInfo,
  getRecommendedImageQuality,
} from "@packages/mobile-utils";

export default function ImageGalleryPage() {
  const [activeTab, setActiveTab] = useState("gallery");

  // 预加载关键图片
  const criticalImages = [
    "/images/hero.jpg",
    "/images/hero-720.jpg",
    "/images/banner-1.jpg",
  ];

  const { allLoaded, progress } = useImagePreloader(criticalImages);

  // 获取当前网络信息
  const networkInfo = getNetworkInfo();
  const recommendedQuality = getRecommendedImageQuality();

  // 模拟图片数据
  const galleryImages = [
    {
      id: 1,
      title: "山水风景",
      src: "/images/landscape.jpg",
      sources: {
        low: "/images/landscape-360.jpg",
        medium: "/images/landscape-720.jpg",
        high: "/images/landscape-1080.jpg",
        original: "/images/landscape.jpg",
      },
    },
    {
      id: 2,
      title: "城市夜景",
      src: "/images/city-night.jpg",
      sources: {
        low: "/images/city-night-360.jpg",
        medium: "/images/city-night-720.jpg",
        high: "/images/city-night-1080.jpg",
        original: "/images/city-night.jpg",
      },
    },
    {
      id: 3,
      title: "美食特写",
      src: "/images/food.jpg",
      sources: {
        low: "/images/food-360.jpg",
        medium: "/images/food-720.jpg",
        high: "/images/food-1080.jpg",
        original: "/images/food.jpg",
      },
    },
    {
      id: 4,
      title: "人物肖像",
      src: "/images/portrait.jpg",
      sources: {
        low: "/images/portrait-360.jpg",
        medium: "/images/portrait-720.jpg",
        high: "/images/portrait-1080.jpg",
        original: "/images/portrait.jpg",
      },
    },
  ];

  const productImages = [
    {
      id: 1,
      name: "智能手表",
      price: "¥1,299",
      src: "/images/product-watch.jpg",
    },
    {
      id: 2,
      name: "无线耳机",
      price: "¥899",
      src: "/images/product-earbuds.jpg",
    },
    {
      id: 3,
      name: "平板电脑",
      price: "¥2,999",
      src: "/images/product-tablet.jpg",
    },
    {
      id: 4,
      name: "智能音箱",
      price: "¥399",
      src: "/images/product-speaker.jpg",
    },
  ];

  const tabs = [
    { id: "gallery", label: "风景画廊" },
    { id: "products", label: "产品展示" },
    { id: "demo", label: "功能演示" },
  ];

  // 加载中界面
  if (!allLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">加载资源中...</p>
          <p className="text-sm text-gray-500 mt-1">
            {Math.round(progress * 100)}%
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 页面标题 */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="p-4">
          <h3 className="text-xl font-bold">图片画廊</h3>
          <p className="text-sm text-gray-600">智能图片加载演示</p>
        </div>
      </div>

      {/* 网络状态提示 */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">当前网络状态</p>
              <p className="text-xs text-gray-600">
                {networkInfo.online ? "在线" : "离线"} · {networkInfo.type} ·
                推荐质量: {recommendedQuality}
              </p>
            </div>
            <span
              className={`px-2 py-1 rounded text-sm ${
                networkInfo.online
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {networkInfo.effectiveType || networkInfo.type}
            </span>
          </div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="sticky top-16 bg-white z-10 border-b">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary-500 text-primary-500"
                  : "border-transparent text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === "gallery" && (
          <div className="space-y-4">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <OptimizedImage
                  src={image.src}
                  sources={image.sources}
                  alt={image.title}
                  className="w-full h-64"
                  lazy
                  autoQuality
                  onLoad={() => {
                    console.log(`${image.title} 加载完成`);
                  }}
                />
                <div className="p-3">
                  <p className="font-medium">{image.title}</p>
                  <p className="text-xs text-gray-600">
                    根据网络自动选择图片质量
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "products" && (
          <div className="grid grid-cols-2 gap-4">
            {productImages.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <OptimizedImage
                  src={product.src}
                  alt={product.name}
                  className="aspect-square"
                  lazy
                  autoQuality={false}
                />
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-lg text-red-500 font-bold">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "demo" && (
          <div className="space-y-6">
            {/* 加载状态演示 */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h5 className="text-base font-semibold mb-3">1. 加载状态</h5>
              <p className="text-sm text-gray-600 mb-3">
                展示加载中、加载失败等状态
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs mb-2">正常加载</p>
                  <OptimizedImage
                    src="/images/demo-1.jpg"
                    alt="正常加载"
                    className="aspect-video rounded"
                    lazy={false}
                  />
                </div>
                <div>
                  <p className="text-xs mb-2">加载失败</p>
                  <OptimizedImage
                    src="/images/not-exist.jpg"
                    alt="加载失败"
                    className="aspect-video rounded"
                    lazy={false}
                    onError={() => {
                      console.log("图片加载失败");
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 懒加载演示 */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h5 className="text-base font-semibold mb-3">2. 懒加载</h5>
              <p className="text-sm text-gray-600 mb-3">
                向下滚动查看图片懒加载效果
              </p>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i}>
                    <p className="text-sm mb-2">图片 {i}</p>
                    <OptimizedImage
                      src={`/images/lazy-${i}.jpg`}
                      alt={`懒加载图片 ${i}`}
                      className="w-full h-48 rounded"
                      lazy
                      placeholder="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%23e0e0e0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3E等待加载...%3C/text%3E%3C/svg%3E"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 不同尺寸展示 */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h5 className="text-base font-semibold mb-3">3. 响应式尺寸</h5>
              <p className="text-sm text-gray-600 mb-3">
                不同尺寸和比例的图片展示
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-xs mb-2">16:9 横幅</p>
                  <OptimizedImage
                    src="/images/banner.jpg"
                    alt="横幅"
                    className="w-full aspect-video rounded"
                    lazy
                  />
                </div>
                <div>
                  <p className="text-xs mb-2">1:1 正方形</p>
                  <OptimizedImage
                    src="/images/square.jpg"
                    alt="正方形"
                    className="w-32 h-32 rounded"
                    lazy
                  />
                </div>
                <div>
                  <p className="text-xs mb-2">圆形头像</p>
                  <OptimizedImage
                    src="/images/avatar.jpg"
                    alt="头像"
                    className="w-20 h-20 rounded-full"
                    lazy={false}
                    autoQuality={false}
                  />
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h5 className="text-base font-semibold mb-3">4. 交互操作</h5>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full py-2 bg-primary-500 text-white rounded"
                >
                  回到顶部
                </button>
                <button
                  onClick={() => {
                    alert(
                      `网络类型: ${networkInfo.type}, 质量: ${recommendedQuality}`,
                    );
                  }}
                  className="w-full py-2 border border-primary-500 text-primary-500 rounded"
                >
                  查看网络详情
                </button>
                <button
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="w-full py-2 border border-red-500 text-red-500 rounded"
                >
                  刷新页面
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
