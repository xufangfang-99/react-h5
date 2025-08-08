/// <reference types="vite/client" />

// 全局类型声明

// 扩展 Window 对象
interface Window {
  __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    };
    lastBuildTime: string;
  };
  __APP_REGISTRY__?: {
    components: any;
    mocks: any;
    routes: any;
  };
}

// 通用类型
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type MaybePromise<T> = T | Promise<T>;
type MaybeArray<T> = T | T[];

// 对象类型
type AnyObject = Record<string, any>;
type EmptyObject = Record<string, never>;

// 函数类型
type AnyFunction<T = any> = (...args: any[]) => T;
type VoidFunction = () => void;
type AsyncFunction<T = any> = (...args: any[]) => Promise<T>;

// React 相关
type ReactNode = import("react").ReactNode;
type ReactElement = import("react").ReactElement;
type CSSProperties = import("react").CSSProperties;

// 组件属性
type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

// 深度可选
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// 深度只读
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// 递归必需
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// 移除索引签名
type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : K]: T[K];
};

// 提取 Promise 类型
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

// 提取数组类型
type UnwrapArray<T> = T extends Array<infer U> ? U : T;

// 联合类型转交叉类型
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

// 获取对象值类型
type ValueOf<T> = T[keyof T];

// 环境变量类型
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_PUBLIC_PATH: string;
  readonly VITE_PORT: number;
  readonly VITE_PROXY: Record<string, any>;
  readonly VITE_ROUTER_HISTORY: "hash" | "history";
  readonly VITE_CDN: boolean;
  readonly VITE_COMPRESSION: ViteCompression;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Vite 相关类型
type ViteCompression =
  | "none"
  | "gzip"
  | "brotli"
  | "both"
  | "gzip-clear"
  | "brotli-clear"
  | "both-clear";

// 主题类型
type ThemeMode = "default" | "dark" | "auto";

// 语言类型
type Language = "zh-CN" | "en-US";

// 响应数据结构
interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  timestamp?: number;
  traceId?: string;
}

// 分页数据结构
interface PaginationData<T = any> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

// 列表查询参数
interface ListQueryParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: any;
}

// 错误类型
interface AppError extends Error {
  code?: number;
  details?: any;
  timestamp?: number;
}

// 用户信息
interface UserInfo {
  id: string;
  username: string;
  nickname?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  roles?: string[];
  permissions?: string[];
  [key: string]: any;
}

// 菜单项
interface MenuItem {
  id: string;
  title: string;
  path?: string;
  icon?: string;
  children?: MenuItem[];
  permissions?: string[];
  hidden?: boolean;
  [key: string]: any;
}

// 上传文件
interface UploadFile {
  uid: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  status?: "uploading" | "done" | "error" | "removed";
  percent?: number;
  response?: any;
  error?: any;
}

// 选项
interface Option<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
  children?: Option<T>[];
  [key: string]: any;
}
