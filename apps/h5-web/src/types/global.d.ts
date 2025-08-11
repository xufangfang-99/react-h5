// 3. src/types/global.d.ts - 修复 ViteCompression 引用问题
/// <reference types="vite/client" />

/**
 * 全局类型声明
 * 只包含当前项目实际使用的类型
 */

// 从构建类型中复制，避免循环依赖
type ViteCompression =
  | "none"
  | "gzip"
  | "brotli"
  | "both"
  | "gzip-clear"
  | "brotli-clear"
  | "both-clear";

// Window 扩展 - build/utils.ts 中定义和使用
declare global {
  interface Window {
    __APP_INFO__: {
      pkg: {
        name: string;
        version: string;
        engines: any;
        dependencies: Record<string, string>;
        devDependencies: Record<string, string>;
      };
      lastBuildTime: string;
    };
  }
}

// 环境变量类型 - 对应 envs/ 目录中的配置
interface ImportMetaEnv {
  readonly VITE_PORT: number;
  readonly VITE_PUBLIC_PATH: string;
  readonly VITE_ROUTER_HISTORY: "hash" | "h5";
  readonly VITE_CDN: boolean;
  readonly VITE_COMPRESSION: ViteCompression;
  readonly VITE_HIDE_HOME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// 模块声明 - main.tsx 中使用
declare module "virtual:uno.css" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

export {};
