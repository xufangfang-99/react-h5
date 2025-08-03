declare global {
    interface ViteEnv {
      VITE_PORT: number;
      VITE_PUBLIC_PATH: string;
      VITE_ROUTER_HISTORY: string;
      VITE_CDN: boolean;
      VITE_HIDE_HOME: string;
      VITE_COMPRESSION: ViteCompression;
    }
  
    type ViteCompression = "none" | "gzip" | "brotli" | "both" | "gzip-clear" | "brotli-clear" | "both-clear";
  
    interface Recordable<T = any> {
      [key: string]: T;
    }
  
    // React 相关类型
    type ComponentRef<T = HTMLElement> = React.RefObject<T>;
    type AnyFunction<T = any> = (...args: any[]) => T;
    type Nullable<T> = T | null;
    type NonNullable<T> = T extends null | undefined ? never : T;
    type Writable<T> = { -readonly [P in keyof T]: T[P] };
    type DeepPartial<T> = {
      [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
    };
  }
  
  // UnoCSS 虚拟模块声明
  declare module 'virtual:uno.css' {
    const content: string;
    export default content;
  }
  
  export {};