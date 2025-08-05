import { useRef, useEffect, useState } from "react";

// 定义 MemoryInfo 类型
interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

// 扩展 Performance 接口
declare global {
  interface Performance {
    memory?: MemoryInfo;
  }
}

/**
 * 内存优化工具类
 */
export class MemoryOptimizer {
  private static instance: MemoryOptimizer;
  private observers: WeakMap<object, MutationObserver> = new WeakMap();
  private timers: Set<NodeJS.Timeout> = new Set();
  private eventListeners: Map<EventTarget, Map<string, EventListener>> =
    new Map();

  private constructor() {}

  static getInstance(): MemoryOptimizer {
    if (!MemoryOptimizer.instance) {
      MemoryOptimizer.instance = new MemoryOptimizer();
    }
    return MemoryOptimizer.instance;
  }

  /**
   * 注册可清理的定时器
   */
  registerTimer(timer: NodeJS.Timeout): void {
    this.timers.add(timer);
  }

  /**
   * 清理定时器
   */
  clearTimer(timer: NodeJS.Timeout): void {
    clearTimeout(timer);
    clearInterval(timer);
    this.timers.delete(timer);
  }

  /**
   * 清理所有定时器
   */
  clearAllTimers(): void {
    this.timers.forEach((timer) => {
      clearTimeout(timer);
      clearInterval(timer);
    });
    this.timers.clear();
  }

  /**
   * 安全的事件监听器管理
   */
  addEventListener(
    target: EventTarget,
    event: string,
    listener: EventListener,
    options?: AddEventListenerOptions,
  ): void {
    target.addEventListener(event, listener, options);

    if (!this.eventListeners.has(target)) {
      this.eventListeners.set(target, new Map());
    }
    this.eventListeners.get(target)!.set(event, listener);
  }

  /**
   * 移除事件监听器
   */
  removeEventListener(
    target: EventTarget,
    event: string,
    options?: EventListenerOptions,
  ): void {
    const listeners = this.eventListeners.get(target);
    if (listeners) {
      const listener = listeners.get(event);
      if (listener) {
        target.removeEventListener(event, listener, options);
        listeners.delete(event);
        if (listeners.size === 0) {
          this.eventListeners.delete(target);
        }
      }
    }
  }

  /**
   * 清理所有事件监听器
   */
  removeAllEventListeners(): void {
    this.eventListeners.forEach((listeners, target) => {
      listeners.forEach((listener, event) => {
        target.removeEventListener(event, listener);
      });
    });
    this.eventListeners.clear();
  }

  /**
   * 创建防内存泄漏的观察者
   */
  createObserver(
    target: Node,
    callback: MutationCallback,
    options: MutationObserverInit,
  ): MutationObserver {
    const observer = new MutationObserver(callback);
    observer.observe(target, options);
    this.observers.set(target, observer);
    return observer;
  }

  /**
   * 断开观察者
   */
  disconnectObserver(target: object): void {
    const observer = this.observers.get(target);
    if (observer) {
      observer.disconnect();
      this.observers.delete(target);
    }
  }

  /**
   * 内存使用监控
   */
  getMemoryUsage(): MemoryInfo | null {
    if ("memory" in performance && performance.memory) {
      return performance.memory;
    }
    return null;
  }

  /**
   * 垃圾回收建议
   */
  suggestGarbageCollection(): void {
    if ("gc" in window && typeof (window as any).gc === "function") {
      (window as any).gc();
    }
  }
}

/**
 * React Hooks for memory optimization
 */
export const useMemoryCleanup = () => {
  const optimizer = useRef(MemoryOptimizer.getInstance());

  useEffect(() => {
    return () => {
      // 组件卸载时清理所有资源
      optimizer.current.clearAllTimers();
      optimizer.current.removeAllEventListeners();
    };
  }, []);

  return optimizer.current;
};

/**
 * 安全的定时器 Hook
 */
export const useSafeTimeout = (
  callback: () => void,
  delay: number | null,
): void => {
  const optimizer = useMemoryCleanup();
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const timer = setTimeout(() => savedCallback.current(), delay);
      optimizer.registerTimer(timer);

      return () => optimizer.clearTimer(timer);
    }
  }, [delay, optimizer]);
};

/**
 * 安全的间隔定时器 Hook
 */
export const useSafeInterval = (
  callback: () => void,
  delay: number | null,
): void => {
  const optimizer = useMemoryCleanup();
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const timer = setInterval(() => savedCallback.current(), delay);
      optimizer.registerTimer(timer);

      return () => optimizer.clearTimer(timer);
    }
  }, [delay, optimizer]);
};

/**
 * 内存监控 Hook
 */
export const useMemoryMonitor = (threshold = 100 * 1024 * 1024) => {
  // 100MB
  const [memoryWarning, setMemoryWarning] = useState(false);
  const optimizer = useMemoryCleanup();

  useSafeInterval(() => {
    const memory = optimizer.getMemoryUsage();
    if (memory && memory.usedJSHeapSize > threshold) {
      setMemoryWarning(true);
      console.warn("内存使用过高:", {
        used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
        total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
        limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)}MB`,
      });
    } else {
      setMemoryWarning(false);
    }
  }, 10000); // 每10秒检查一次

  return { memoryWarning };
};
