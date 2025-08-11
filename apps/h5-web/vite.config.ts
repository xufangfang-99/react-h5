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
          passes: 2, // 多次压缩
        },
        format: {
          comments: false, // 删除注释
        },
        mangle: {
          safari10: true, // 兼容 Safari 10
        },
      },
      rollupOptions: {
        // treeshake 配置放在这里
        treeshake: {
          preset: "recommended",
          moduleSideEffects: "no-external",
        },
        input: {
          index: pathResolve("./index.html", import.meta.url),
        },
        // 静态资源分类打包
        output: {
          // 优化后的 manualChunks 策略
          manualChunks(id) {
            // 先处理 CSS 模块
            if (id.includes(".css") || id.includes(".scss")) {
              return; // 让 Vite 自动处理 CSS 分割
            }

            if (id.includes("node_modules")) {
              // React 核心包（它们总是一起使用）
              if (id.includes("react-dom") || id.includes("react/jsx")) {
                return "react-vendor";
              }
              if (id.includes("react-router")) {
                return "react-router";
              }

              // 状态管理
              if (
                id.includes("zustand") ||
                id.includes("@tanstack/react-query")
              ) {
                return "state-vendor";
              }

              // 工具库细分
              if (id.includes("lodash")) return "lodash";
              if (id.includes("dayjs")) return "dayjs";
              if (id.includes("axios")) return "axios";

              // 小工具库合并
              if (
                id.includes("clsx") ||
                id.includes("js-cookie") ||
                id.includes("mitt")
              ) {
                return "utils";
              }

              // React 相关工具
              if (
                id.includes("react-helmet-async") ||
                id.includes("react-use") ||
                id.includes("react-hook-form")
              ) {
                return "react-utils";
              }

              // 存储相关
              if (id.includes("responsive-storage")) {
                return "utils";
              }

              // @pureadmin/utils
              if (id.includes("@pureadmin/utils")) {
                return "utils";
              }

              // 其他第三方库
              return "vendor";
            }
          },

          // 优化文件命名
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split("/").pop()
              : "chunk";

            // CSS 模块
            if (facadeModuleId?.includes(".module")) {
              return `static/css/[name]-[hash].js`;
            }

            // JS 模块
            return `static/js/[name]-[hash].js`;
          },

          entryFileNames: "static/js/[name]-[hash].js",

          // 优化静态资源命名
          assetFileNames: (assetInfo) => {
            // 处理 name 可能为 undefined 的情况
            const name = assetInfo.name || "asset";

            // 获取资源扩展名
            const info = name.split(".");
            const ext = info[info.length - 1];

            // 根据文件类型分类
            if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(name)) {
              return `static/images/[name]-[hash].${ext}`;
            }
            if (/\.(woff2?|eot|ttf|otf)$/.test(name)) {
              return `static/fonts/[name]-[hash].${ext}`;
            }
            if (/\.css$/.test(name)) {
              return `static/css/[name]-[hash].${ext}`;
            }

            // 其他资源
            return `static/[ext]/[name]-[hash].[ext]`;
          },
        },
      },

      // CSS 代码分割
      cssCodeSplit: true,

      // 调整分块大小警告限制
      chunkSizeWarningLimit: 500,

      // 启用 CSS 压缩
      cssMinify: "lightningcss",

      // 启用构建报告（可选）
      reportCompressedSize: false, // 禁用 gzip 压缩大小报告，加快构建
    },

    css: {
      modules: {
        // 为 CSS Modules 生成更短的类名
        generateScopedName: "[local]_[hash:base64:5]",
      },

      // 配置预处理器选项
      preprocessorOptions: {
        scss: {
          // 避免在每个组件中导入
          additionalData: `@use "@/styles/variables" as *;`,
        },
      },
    },

    // 性能优化
    esbuild: {
      // 删除 debugger
      drop: ["debugger"],
      // 删除 console（生产环境）
      pure: mode === "production" ? ["console.log", "console.debug"] : [],
    },

    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  };
};
