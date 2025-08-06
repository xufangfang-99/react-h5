import { getPluginsList } from "./build/plugins";
import { include, exclude } from "./build/optimize";
import { type UserConfigExport, type ConfigEnv, loadEnv } from "vite";
import {
  root,
  alias,
  wrapperEnv,
  pathResolve,
  __APP_INFO__,
} from "./build/utils";

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { VITE_CDN, VITE_PORT, VITE_COMPRESSION, VITE_PUBLIC_PATH } =
    wrapperEnv(loadEnv(mode, pathResolve("./envs", import.meta.url)));
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias,
    },
    // 服务端渲染
    server: {
      // 端口号
      port: VITE_PORT,
      host: "0.0.0.0",
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      proxy: {},
      // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
      warmup: {
        clientFiles: ["./index.html", "./src/{pages,components}/*"],
      },
    },
    plugins: getPluginsList(VITE_CDN, VITE_COMPRESSION),
    // https://cn.vitejs.dev/config/dep-optimization-options.html#dep-optimization-options
    optimizeDeps: {
      include,
      exclude,
      // 强制预构建
      force: true,
      // 优化的入口点
      entries: ["src/**/*.{jsx,tsx}"],
    },
    build: {
      // https://cn.vitejs.dev/guide/build.html#browser-compatibility
      minify: "terser",
      target: "es2015",
      sourcemap: false,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log", "console.info", "console.debug"],
        },
        format: {
          comments: false, // 删除注释
        },
        mangle: {
          safari10: true, // 兼容 Safari 10
        },
      },
      rollupOptions: {
        input: {
          index: pathResolve("./index.html", import.meta.url),
        },
        // 静态资源分类打包
        output: {
          // 手动分包策略 - 优化版
          manualChunks: {
            // React 核心
            "react-vendor": ["react", "react-dom", "react-router-dom"],
            // 状态管理和数据请求
            "state-vendor": ["zustand", "@tanstack/react-query"],
            // 工具库
            "utils-vendor": ["axios", "dayjs", "lodash-es", "clsx"],
            // 内部包
            "mobile-utils": ["@packages/mobile-utils"],
          },
          // 静态资源分类打包
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split("/").pop()
              : "chunk";
            return `static/js/${facadeModuleId}-[hash].js`;
          },
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
      // CSS 代码分割
      cssCodeSplit: true,
      // 更激进的代码分割策略
      chunkSizeWarningLimit: 500,
      // 启用 CSS 压缩
      cssMinify: "lightningcss", // 使用更快的 CSS 压缩器
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  };
};
