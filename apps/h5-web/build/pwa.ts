import { VitePWA } from "vite-plugin-pwa";

export const configurePWA = () => {
  return VitePWA({
    registerType: "autoUpdate",
    includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
    manifest: {
      name: "React H5 Web",
      short_name: "H5 Web",
      description: "基于 React 的移动端应用",
      theme_color: "#3b82f6",
      background_color: "#ffffff",
      display: "standalone",
      orientation: "portrait",
      scope: "/",
      start_url: "/",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      // 缓存策略
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/cdn\.bootcdn\.net\/.*/i,
          handler: "CacheFirst",
          options: {
            cacheName: "cdn-cache",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30天
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/api\.example\.com\/.*/i,
          handler: "NetworkFirst",
          options: {
            cacheName: "api-cache",
            networkTimeoutSeconds: 3,
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24, // 1天
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /\.(js|css|png|jpg|jpeg|svg|gif|webp)$/,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "static-resources",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 7, // 7天
            },
          },
        },
      ],
      // 预缓存
      globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp}"],
      // 清理过期缓存
      cleanupOutdatedCaches: true,
      // 跳过等待
      skipWaiting: true,
      // 立即接管
      clientsClaim: true,
    },
  });
};
