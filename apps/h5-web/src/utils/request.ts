import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { isSlowNetwork } from "@packages/mobile-utils";

// 扩展 AxiosRequestConfig 类型
declare module "axios" {
  export interface AxiosRequestConfig {
    cache?: boolean;
    cacheTime?: number;
  }
}

// 请求缓存
interface CacheItem {
  data: any;
  timestamp: number;
  expires: number;
}

class RequestCache {
  private cache = new Map<string, CacheItem>();

  set(key: string, data: any, expires: number = 5 * 60 * 1000) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expires,
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.expires) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear() {
    this.cache.clear();
  }

  // 清理过期缓存
  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.expires) {
        this.cache.delete(key);
      }
    }
  }
}

// 创建缓存实例
const requestCache = new RequestCache();

// 定期清理缓存
setInterval(() => requestCache.cleanup(), 60 * 1000);

// 创建 axios 实例
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // 根据网络状态调整超时时间
      if (isSlowNetwork()) {
        config.timeout = 30000; // 慢速网络增加超时时间
      }

      // 添加 token
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // 添加请求标识
      config.headers["X-Request-Id"] =
        `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response) => {
      // 缓存 GET 请求
      if (response.config.method === "get" && response.config.cache !== false) {
        const cacheKey = getCacheKey(response.config);
        const cacheTime = response.config.cacheTime || 5 * 60 * 1000;
        requestCache.set(cacheKey, response.data, cacheTime);
      }

      return response;
    },
    (error) => {
      // 网络错误处理
      if (!error.response) {
        console.error("网络错误:", error.message);
        // 可以在这里添加离线提示
      } else if (error.response?.status === 401) {
        // 401 处理
        // 清除 token，跳转登录
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

// 生成缓存键
const getCacheKey = (config: AxiosRequestConfig): string => {
  const { url, method, params, data } = config;
  return `${method}-${url}-${JSON.stringify(params || {})}-${JSON.stringify(data || {})}`;
};

// 请求实例
const request = createAxiosInstance();

// 带缓存的 GET 请求
export const getWithCache = async <T = any>(
  url: string,
  config?: AxiosRequestConfig & { cache?: boolean; cacheTime?: number },
): Promise<T> => {
  const cacheKey = getCacheKey({ ...config, url, method: "get" });

  // 检查缓存
  if (config?.cache !== false) {
    const cached = requestCache.get(cacheKey);
    if (cached) {
      console.log(`[Cache Hit] ${url}`);
      return cached;
    }
  }

  console.log(`[Cache Miss] ${url}`);
  const response = await request.get<T>(url, config);
  return response.data;
};

// 并发请求控制
export const requestQueue = {
  queue: [] as Array<() => Promise<any>>,
  running: 0,
  maxConcurrent: 4,

  add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.process();
    });
  },

  async process() {
    while (this.running < this.maxConcurrent && this.queue.length > 0) {
      const fn = this.queue.shift();
      if (fn) {
        this.running++;
        fn().finally(() => {
          this.running--;
          this.process();
        });
      }
    }
  },
};

// 请求重试
export const retryRequest = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000,
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryRequest(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

// 请求取消
export const createCancelToken = () => {
  const source = axios.CancelToken.source();
  return {
    token: source.token,
    cancel: source.cancel,
  };
};

// 导出工具方法
export const clearRequestCache = () => requestCache.clear();

// 导出请求实例
export { request };

// 导出类型
export type { AxiosInstance, AxiosRequestConfig, AxiosResponse };
