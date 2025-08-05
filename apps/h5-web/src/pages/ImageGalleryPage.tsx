import { useState } from "react";
import {
  Card,
  Title,
  Text,
  Badge,
  Button,
  Tabs,
  ScrollArea,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
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

  // 加载中界面
  if (!allLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <Text size="lg" c="dimmed">
            加载资源中...
          </Text>
          <Text size="sm" c="dimmed" mt="xs">
            {Math.round(progress * 100)}%
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 页面标题 */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="p-4">
          <Title order={3}>图片画廊</Title>
          <Text size="sm" c="dimmed">
            智能图片加载演示
          </Text>
        </div>
      </div>

      {/* 网络状态提示 */}
      <div className="p-4">
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <div className="flex items-center justify-between">
            <div>
              <Text size="sm" fw={500}>
                当前网络状态
              </Text>
              <Text size="xs" c="dimmed">
                {networkInfo.online ? "在线" : "离线"} · {networkInfo.type} ·
                推荐质量: {recommendedQuality}
              </Text>
            </div>
            <Badge color={networkInfo.online ? "green" : "red"}>
              {networkInfo.effectiveType || networkInfo.type}
            </Badge>
          </div>
        </Card>
      </div>

      {/* 标签页 */}
      <Tabs
        value={activeTab}
        onChange={(value) => setActiveTab(value || "gallery")}
      >
        <Tabs.List className="sticky top-16 bg-white z-10 px-4">
          <Tabs.Tab value="gallery">风景画廊</Tabs.Tab>
          <Tabs.Tab value="products">产品展示</Tabs.Tab>
          <Tabs.Tab value="demo">功能演示</Tabs.Tab>
        </Tabs.List>

        {/* 风景画廊 */}
        <Tabs.Panel value="gallery" pt="md">
          <div className="p-4 space-y-4">
            {galleryImages.map((image) => (
              <Card key={image.id} shadow="sm" radius="md" withBorder>
                <Card.Section>
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
                </Card.Section>
                <div className="p-3">
                  <Text fw={500}>{image.title}</Text>
                  <Text size="xs" c="dimmed">
                    根据网络自动选择图片质量
                  </Text>
                </div>
              </Card>
            ))}
          </div>
        </Tabs.Panel>

        {/* 产品展示 */}
        <Tabs.Panel value="products" pt="md">
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {productImages.map((product) => (
                <Card key={product.id} shadow="sm" radius="md" withBorder>
                  <Card.Section>
                    <OptimizedImage
                      src={product.src}
                      alt={product.name}
                      className="aspect-square"
                      lazy
                      autoQuality={false} // 产品图片使用固定质量
                    />
                  </Card.Section>
                  <div className="p-3">
                    <Text size="sm" fw={500} lineClamp={1}>
                      {product.name}
                    </Text>
                    <Text size="lg" c="red" fw={700}>
                      {product.price}
                    </Text>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Tabs.Panel>

        {/* 功能演示 */}
        <Tabs.Panel value="demo" pt="md">
          <ScrollArea className="p-4">
            <div className="space-y-6">
              {/* 加载状态演示 */}
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={5} mb="md">
                  1. 加载状态
                </Title>
                <Text size="sm" c="dimmed" mb="md">
                  展示加载中、加载失败等状态
                </Text>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Text size="xs" mb="xs">
                      正常加载
                    </Text>
                    <OptimizedImage
                      src="/images/demo-1.jpg"
                      alt="正常加载"
                      className="aspect-video rounded"
                      lazy={false}
                    />
                  </div>
                  <div>
                    <Text size="xs" mb="xs">
                      加载失败
                    </Text>
                    <OptimizedImage
                      src="/images/not-exist.jpg"
                      alt="加载失败"
                      className="aspect-video rounded"
                      lazy={false}
                      onError={() => {
                        notifications.show({
                          message: "图片加载失败",
                          color: "red",
                        });
                      }}
                    />
                  </div>
                </div>
              </Card>

              {/* 懒加载演示 */}
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={5} mb="md">
                  2. 懒加载
                </Title>
                <Text size="sm" c="dimmed" mb="md">
                  向下滚动查看图片懒加载效果
                </Text>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i}>
                      <Text size="sm" mb="xs">
                        图片 {i}
                      </Text>
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
              </Card>

              {/* 不同尺寸展示 */}
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={5} mb="md">
                  3. 响应式尺寸
                </Title>
                <Text size="sm" c="dimmed" mb="md">
                  不同尺寸和比例的图片展示
                </Text>
                <div className="space-y-4">
                  <div>
                    <Text size="xs" mb="xs">
                      16:9 横幅
                    </Text>
                    <OptimizedImage
                      src="/images/banner.jpg"
                      alt="横幅"
                      className="w-full aspect-video rounded"
                      lazy
                    />
                  </div>
                  <div>
                    <Text size="xs" mb="xs">
                      1:1 正方形
                    </Text>
                    <OptimizedImage
                      src="/images/square.jpg"
                      alt="正方形"
                      className="w-32 h-32 rounded"
                      lazy
                    />
                  </div>
                  <div>
                    <Text size="xs" mb="xs">
                      圆形头像
                    </Text>
                    <OptimizedImage
                      src="/images/avatar.jpg"
                      alt="头像"
                      className="w-20 h-20 rounded-full"
                      lazy={false}
                      autoQuality={false}
                    />
                  </div>
                </div>
              </Card>

              {/* 操作按钮 */}
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={5} mb="md">
                  4. 交互操作
                </Title>
                <div className="space-y-3">
                  <Button
                    fullWidth
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    回到顶部
                  </Button>
                  <Button
                    fullWidth
                    variant="light"
                    onClick={() => {
                      notifications.show({
                        title: "网络信息",
                        message: `类型: ${networkInfo.type}, 质量: ${recommendedQuality}`,
                      });
                    }}
                  >
                    查看网络详情
                  </Button>
                  <Button
                    fullWidth
                    variant="outline"
                    color="red"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    刷新页面
                  </Button>
                </div>
              </Card>
            </div>
          </ScrollArea>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
