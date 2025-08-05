import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { getNetworkInfo, isSlowNetwork } from "@packages/mobile-utils";

// 请求队列管理
class RequestQueue {
  private queue: Map<string, AbortController> = new Map();

  add(key: string, controller: AbortController) {
    // 如果已存在相同请求，取消之前的
    if (this.queue.has(key)) {
      this.queue.get(key)?.abort();
    }
    this.queue.set(key, controller);
  }

  remove(key: string) {
    this.queue.delete(key);
  }

  cancelAll() {
    this.queue.forEach((controller) => controller.abort());
    this.queue.clear();
  }

  // 添加公共方法来获取队列大小
  size(): number {
    return this.queue.size;
  }
}

const requestQueue = new RequestQueue();

// 创建 axios 实例
const createRequest = (): AxiosInstance => {
  const instance = axios.create({
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // 根据网络状态调整配置
      const networkInfo = getNetworkInfo();

      // 慢速网络优化
      if (isSlowNetwork()) {
        // 增加超时时间
        config.timeout = 30000;

        // 添加低质量标记（后端可据此返回精简数据）
        config.headers["X-Network-Quality"] = "low";

        // 添加具体的网络信息到请求头（供后端参考）
        config.headers["X-Network-Type"] = networkInfo.type;
        config.headers["X-Network-Effective-Type"] =
          networkInfo.effectiveType || "unknown";

        // 限制并发请求数
        if (requestQueue.size() > 2) {
          console.warn("慢速网络，限制并发请求");
          return Promise.reject(new Error("网络繁忙，请稍后重试"));
        }
      } else {
        // 正常网络也可以传递网络信息
        config.headers["X-Network-Type"] = networkInfo.type;

        // 如果是 WiFi 或 5G，可以请求高质量数据
        if (networkInfo.type === "wifi" || networkInfo.type === "5g") {
          config.headers["X-Network-Quality"] = "high";
        }
      }

      // 为请求创建取消令牌
      const controller = new AbortController();
      config.signal = controller.signal;

      // 生成请求唯一标识
      const requestKey = `${config.method}-${config.url}`;
      requestQueue.add(requestKey, controller);

      // 添加请求时间戳（用于缓存控制）
      config.headers["X-Request-Time"] = Date.now();

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response) => {
      // 移除已完成的请求
      const requestKey = `${response.config.method}-${response.config.url}`;
      requestQueue.remove(requestKey);

      // 记录响应时间（用于性能监控）
      const requestTime = response.config.headers["X-Request-Time"];
      if (requestTime) {
        const duration = Date.now() - requestTime;
        console.debug(`请求耗时: ${response.config.url} - ${duration}ms`);
      }

      return response;
    },
    (error) => {
      // 移除失败的请求
      if (error.config) {
        const requestKey = `${error.config.method}-${error.config.url}`;
        requestQueue.remove(requestKey);
      }

      // 网络错误重试逻辑
      if (error.message === "Network Error" && !error.config._retry) {
        error.config._retry = true;
        return instance(error.config);
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

// 导出请求实例
export const request = createRequest();

// 请求缓存
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟

/**
 * 带缓存的 GET 请求
 */
export const cachedGet = async <T = any>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const cacheKey = url + JSON.stringify(config?.params || {});
  const cached = cache.get(cacheKey);

  // 检查缓存是否有效
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.debug(`使用缓存: ${url}`);
    return cached.data;
  }

  // 发起请求
  const response = await request.get<T>(url, config);

  // 更新缓存
  cache.set(cacheKey, {
    data: response.data,
    timestamp: Date.now(),
  });

  // 限制缓存大小
  if (cache.size > 50) {
    const firstKey = cache.keys().next().value;
    if (firstKey !== undefined) {
      cache.delete(firstKey);
    }
  }

  return response.data;
};

// 清理函数
export const clearRequestCache = () => cache.clear();
export const cancelAllRequests = () => requestQueue.cancelAll();

// 根据网络状态动态调整请求配置的工具函数
export const getOptimizedRequestConfig = (): Partial<AxiosRequestConfig> => {
  const networkInfo = getNetworkInfo();
  const config: Partial<AxiosRequestConfig> = {};

  if (isSlowNetwork()) {
    config.timeout = 30000; // 慢速网络增加超时
  } else if (networkInfo.type === "wifi" || networkInfo.type === "5g") {
    config.timeout = 5000; // 高速网络减少超时
  }

  return config;
};
