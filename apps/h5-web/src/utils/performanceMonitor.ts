import { useEffect } from "react";

interface PerformanceMetrics {
  FCP: number; // First Contentful Paint
  LCP: number; // Largest Contentful Paint
  FID: number; // First Input Delay
  CLS: number; // Cumulative Layout Shift
  TTFB: number; // Time to First Byte
  TTI: number; // Time to Interactive
}

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  processingEnd: number;
  duration: number;
  cancelable: boolean;
  target?: EventTarget;
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
  sources: Array<{
    node?: Node;
    previousRect: DOMRectReadOnly;
    currentRect: DOMRectReadOnly;
  }>;
}

interface LargestContentfulPaintEntry extends PerformanceEntry {
  renderTime: number;
  loadTime: number;
  size: number;
  id: string;
  url: string;
  element?: Element;
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: Map<string, PerformanceObserver> = new Map();

  constructor() {
    this.init();
  }

  private init() {
    // 监听页面加载性能
    if (typeof window !== "undefined" && "performance" in window) {
      // FCP 和 LCP
      this.observePaintMetrics();

      // FID
      this.observeFirstInput();

      // CLS
      this.observeLayoutShift();

      // Navigation Timing
      this.observeNavigationTiming();
    }
  }

  private observePaintMetrics() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === "first-contentful-paint") {
            this.metrics.FCP = entry.startTime;
          }
          if (entry.entryType === "largest-contentful-paint") {
            const lcpEntry = entry as LargestContentfulPaintEntry;
            this.metrics.LCP = lcpEntry.startTime;
          }
        }
      });

      observer.observe({ entryTypes: ["paint", "largest-contentful-paint"] });
      this.observers.set("paint", observer);
    } catch (e) {
      console.warn("Paint metrics observation not supported:", e);
    }
  }

  private observeFirstInput() {
    try {
      const observer = new PerformanceObserver((list) => {
        const firstInput = list.getEntries()[0] as PerformanceEventTiming;
        if (firstInput && firstInput.processingStart) {
          this.metrics.FID = firstInput.processingStart - firstInput.startTime;
        }
      });

      observer.observe({ entryTypes: ["first-input"] });
      this.observers.set("first-input", observer);
    } catch (e) {
      console.warn("First input observation not supported:", e);
    }
  }

  private observeLayoutShift() {
    try {
      let clsValue = 0;
      const clsEntries: PerformanceEntry[] = [];

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as LayoutShiftEntry;
          // 只计算没有用户输入的布局偏移
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
            clsEntries.push(entry);
          }
        }
        this.metrics.CLS = clsValue;
      });

      observer.observe({ entryTypes: ["layout-shift"] });
      this.observers.set("layout-shift", observer);
    } catch (e) {
      console.warn("Layout shift observation not supported:", e);
    }
  }

  private observeNavigationTiming() {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;

      // TTFB
      if (timing.responseStart && timing.requestStart) {
        this.metrics.TTFB = timing.responseStart - timing.requestStart;
      }

      // TTI (简化版本)
      if (timing.loadEventEnd && timing.navigationStart) {
        this.metrics.TTI = timing.loadEventEnd - timing.navigationStart;
      }
    }
  }

  // 获取性能指标
  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  // 上报性能数据
  public report(callback?: (metrics: Partial<PerformanceMetrics>) => void) {
    // 确保页面加载完成
    if (document.readyState === "complete") {
      this.sendReport(callback);
    } else {
      window.addEventListener("load", () => {
        // 延迟一段时间确保所有指标都已收集
        setTimeout(() => this.sendReport(callback), 1000);
      });
    }
  }

  private sendReport(
    callback?: (metrics: Partial<PerformanceMetrics>) => void,
  ) {
    const metrics = this.getMetrics();

    // 控制台输出
    console.log("性能指标:", metrics);

    // 自定义回调
    if (callback) {
      callback(metrics);
    }

    // 这里可以将数据发送到分析服务器
    // fetch('/api/performance', {
    //   method: 'POST',
    //   body: JSON.stringify(metrics)
    // });
  }

  // 清理观察者
  public destroy() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
  }
}

// 导出单例
export const performanceMonitor = new PerformanceMonitor();

// React Hook
export const usePerformanceReport = () => {
  useEffect(() => {
    performanceMonitor.report((metrics) => {
      // 性能预警
      if (metrics.LCP && metrics.LCP > 2500) {
        console.warn("LCP 过高，用户体验可能受影响");
      }
      if (metrics.FID && metrics.FID > 100) {
        console.warn("FID 过高，交互响应缓慢");
      }
      if (metrics.CLS && metrics.CLS > 0.1) {
        console.warn("CLS 过高，页面布局不稳定");
      }
    });

    return () => {
      performanceMonitor.destroy();
    };
  }, []);
};
