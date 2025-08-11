// types/build-env.d.ts
/**
 * 构建环境类型定义
 * 仅供 vite.config.ts 和 build/ 目录使用
 */
declare global {
  interface ViteEnv {
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_ROUTER_HISTORY: string;
    VITE_CDN: boolean;
    VITE_HIDE_HOME: string;
    VITE_COMPRESSION: ViteCompression;
  }

  type ViteCompression =
    | "none"
    | "gzip"
    | "brotli"
    | "both"
    | "gzip-clear"
    | "brotli-clear"
    | "both-clear";

  interface Recordable<T = any> {
    [key: string]: T;
  }
}

export {};
