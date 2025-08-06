/**
 * 性能监控工具
 */

export interface PerformanceMetrics {
  // 导航计时
  navigationStart: number;
  domContentLoaded: number;
  loadComplete: number;
  // 资源计时
  resourceCount: number;
  resourceDuration: number;
  // 绘制计时
  firstPaint?: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  // 交互计时
  firstInputDelay?: number;
  cumulativeLayoutShift?: number;
  // 内存使用
  memoryUsed?: number;
  memoryLimit?: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    navigationStart: 0,
    domContentLoaded: 0,
    loadComplete: 0,
    resourceCount: 0,
    resourceDuration: 0,
  };

  constructor() {
    this.init();
  }

  private init() {
    // 监听页面加载事件
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.onDOMContentLoaded(),
      );
    } else {
      this.onDOMContentLoaded();
    }

    window.addEventListener("load", () => this.onLoad());

    // 监听性能条目
    if ("PerformanceObserver" in window) {
      this.observePerformance();
    }
  }

  private onDOMContentLoaded() {
    const perfData = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;
    if (perfData) {
      this.metrics.domContentLoaded =
        perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
    }
  }

  private onLoad() {
    const perfData = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;
    if (perfData) {
      this.metrics.navigationStart = perfData.fetchStart;
      this.metrics.loadComplete = perfData.loadEventEnd - perfData.fetchStart;
    }

    // 获取资源加载信息
    const resources = performance.getEntriesByType(
      "resource",
    ) as PerformanceResourceTiming[];
    this.metrics.resourceCount = resources.length;
    this.metrics.resourceDuration = resources.reduce((total, resource) => {
      return total + (resource.responseEnd - resource.startTime);
    }, 0);

    // 获取内存信息（如果可用）
    if ("memory" in performance) {
      const memory = (performance as any).memory;
      this.metrics.memoryUsed = memory.usedJSHeapSize / 1048576; // 转换为 MB
      this.metrics.memoryLimit = memory.jsHeapSizeLimit / 1048576;
    }
  }

  private observePerformance() {
    // FCP (First Contentful Paint)
    const paintObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-paint") {
          this.metrics.firstPaint = entry.startTime;
        } else if (entry.name === "first-contentful-paint") {
          this.metrics.firstContentfulPaint = entry.startTime;
        }
      }
    });
    paintObserver.observe({ entryTypes: ["paint"] });

    // LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.largestContentfulPaint = lastEntry.startTime;
    });
    lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

    // FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as PerformanceEventTiming;
        this.metrics.firstInputDelay =
          fidEntry.processingStart - fidEntry.startTime;
      }
    });
    fidObserver.observe({ entryTypes: ["first-input"] });

    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
          this.metrics.cumulativeLayoutShift = clsValue;
        }
      }
    });
    clsObserver.observe({ entryTypes: ["layout-shift"] });
  }

  /**
   * 获取性能指标
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * 报告性能指标
   */
  report() {
    setTimeout(() => {
      const metrics = this.getMetrics();
      console.group("🚀 性能指标");
      console.log("DOM加载时间:", metrics.domContentLoaded, "ms");
      console.log("页面完全加载时间:", metrics.loadComplete, "ms");
      console.log("资源数量:", metrics.resourceCount);
      console.log("资源加载总时间:", metrics.resourceDuration.toFixed(2), "ms");

      if (metrics.firstPaint) {
        console.log("首次绘制:", metrics.firstPaint.toFixed(2), "ms");
      }
      if (metrics.firstContentfulPaint) {
        console.log(
          "首次内容绘制:",
          metrics.firstContentfulPaint.toFixed(2),
          "ms",
        );
      }
      if (metrics.largestContentfulPaint) {
        console.log(
          "最大内容绘制:",
          metrics.largestContentfulPaint.toFixed(2),
          "ms",
        );
      }
      if (metrics.firstInputDelay !== undefined) {
        console.log("首次输入延迟:", metrics.firstInputDelay.toFixed(2), "ms");
      }
      if (metrics.cumulativeLayoutShift !== undefined) {
        console.log("累积布局偏移:", metrics.cumulativeLayoutShift.toFixed(3));
      }
      if (metrics.memoryUsed) {
        console.log(
          "内存使用:",
          metrics.memoryUsed.toFixed(2),
          "MB /",
          metrics.memoryLimit?.toFixed(2),
          "MB",
        );
      }
      console.groupEnd();

      // 性能评分
      this.evaluatePerformance(metrics);
    }, 3000); // 延迟3秒以确保所有指标都已收集
  }

  /**
   * 评估性能
   */
  private evaluatePerformance(metrics: PerformanceMetrics) {
    console.group("📊 性能评估");

    // LCP 评分
    if (metrics.largestContentfulPaint) {
      if (metrics.largestContentfulPaint < 2500) {
        console.log("✅ LCP 良好 (<2.5s)");
      } else if (metrics.largestContentfulPaint < 4000) {
        console.log("⚠️ LCP 需要改进 (2.5s-4s)");
      } else {
        console.log("❌ LCP 较差 (>4s)");
      }
    }

    // FID 评分
    if (metrics.firstInputDelay !== undefined) {
      if (metrics.firstInputDelay < 100) {
        console.log("✅ FID 良好 (<100ms)");
      } else if (metrics.firstInputDelay < 300) {
        console.log("⚠️ FID 需要改进 (100ms-300ms)");
      } else {
        console.log("❌ FID 较差 (>300ms)");
      }
    }

    // CLS 评分
    if (metrics.cumulativeLayoutShift !== undefined) {
      if (metrics.cumulativeLayoutShift < 0.1) {
        console.log("✅ CLS 良好 (<0.1)");
      } else if (metrics.cumulativeLayoutShift < 0.25) {
        console.log("⚠️ CLS 需要改进 (0.1-0.25)");
      } else {
        console.log("❌ CLS 较差 (>0.25)");
      }
    }

    console.groupEnd();
  }

  /**
   * 标记自定义性能点
   */
  mark(name: string) {
    performance.mark(name);
  }

  /**
   * 测量两个标记之间的时间
   */
  measure(name: string, startMark: string, endMark: string) {
    performance.measure(name, startMark, endMark);
    const measure = performance.getEntriesByName(name, "measure")[0];
    console.log(`⏱️ ${name}: ${measure.duration.toFixed(2)}ms`);
    return measure.duration;
  }
}

// 导出单例
export const performanceMonitor = new PerformanceMonitor();

// 导出便捷方法
export const measurePerformance = (
  fn: () => void | Promise<void>,
  name: string,
) => {
  const startMark = `${name}-start`;
  const endMark = `${name}-end`;

  performanceMonitor.mark(startMark);

  const result = fn();

  if (result instanceof Promise) {
    return result.finally(() => {
      performanceMonitor.mark(endMark);
      performanceMonitor.measure(name, startMark, endMark);
    });
  } else {
    performanceMonitor.mark(endMark);
    performanceMonitor.measure(name, startMark, endMark);
    return result;
  }
};
