/**
 * DOM 操作相关工具
 */

/**
 * 禁止页面滚动
 */
let scrollPosition = 0;

export const disableScroll = (): void => {
  scrollPosition = window.pageYOffset;
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = "100%";
};

/**
 * 恢复页面滚动
 */
export const enableScroll = (): void => {
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  window.scrollTo(0, scrollPosition);
};

/**
 * 平滑滚动到指定元素
 */
export const scrollToElement = (
  element: HTMLElement | string,
  options?: {
    offset?: number;
    duration?: number;
    easing?: (t: number) => number;
  },
): void => {
  const {
    offset = 0,
    duration = 300,
    easing = (t: number) => t,
  } = options || {};

  const targetElement =
    typeof element === "string"
      ? (document.querySelector(element) as HTMLElement)
      : element;

  if (!targetElement) return;

  const start = window.pageYOffset;
  const targetPosition =
    targetElement.getBoundingClientRect().top + start - offset;
  const distance = targetPosition - start;
  let startTime: number | null = null;

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    window.scrollTo(0, start + distance * easing(progress));

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

/**
 * 获取元素的真实尺寸
 */
export interface ElementSize {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export const getElementSize = (element: HTMLElement): ElementSize => {
  const rect = element.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset,
    right: rect.right + window.pageXOffset,
    bottom: rect.bottom + window.pageYOffset,
  };
};

/**
 * 判断元素是否在视口内
 */
export const isInViewport = (
  element: HTMLElement,
  options?: {
    offset?: number;
    threshold?: number;
  },
): boolean => {
  const { offset = 0, threshold = 0 } = options || {};
  const rect = element.getBoundingClientRect();

  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const verticalInView =
    rect.bottom >= offset && rect.top <= windowHeight - offset;
  const horizontalInView =
    rect.right >= offset && rect.left <= windowWidth - offset;

  if (threshold > 0) {
    const visibleHeight =
      Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibleWidth =
      Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
    const visibleArea = visibleHeight * visibleWidth;
    const totalArea = rect.height * rect.width;

    return visibleArea / totalArea >= threshold;
  }

  return verticalInView && horizontalInView;
};

/**
 * 复制文本到剪贴板
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    // 优先使用新API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // 降级方案
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-999999px";

    document.body.appendChild(textarea);
    textarea.select();

    const success = document.execCommand("copy");
    document.body.removeChild(textarea);

    return success;
  } catch {
    return false;
  }
};

/**
 * 获取滚动条宽度
 */
export const getScrollbarWidth = (): number => {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);

  const inner = document.createElement("div");
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode?.removeChild(outer);

  return scrollbarWidth;
};

/**
 * 设置 CSS 变量
 */
export const setCSSVariable = (
  name: string,
  value: string,
  element?: HTMLElement,
): void => {
  const target = element || document.documentElement;
  target.style.setProperty(`--${name}`, value);
};

/**
 * 获取 CSS 变量
 */
export const getCSSVariable = (name: string, element?: HTMLElement): string => {
  const target = element || document.documentElement;
  return getComputedStyle(target).getPropertyValue(`--${name}`).trim();
};

/**
 * 全屏操作
 */
export const fullscreen = {
  /**
   * 进入全屏
   */
  enter(element?: HTMLElement): Promise<void> {
    const target = element || document.documentElement;

    if (target.requestFullscreen) {
      return target.requestFullscreen();
    } else if ((target as any).webkitRequestFullscreen) {
      return (target as any).webkitRequestFullscreen();
    } else if ((target as any).msRequestFullscreen) {
      return (target as any).msRequestFullscreen();
    }

    return Promise.reject(new Error("Fullscreen not supported"));
  },

  /**
   * 退出全屏
   */
  exit(): Promise<void> {
    if (document.exitFullscreen) {
      return document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      return (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      return (document as any).msExitFullscreen();
    }

    return Promise.reject(new Error("Exit fullscreen not supported"));
  },

  /**
   * 切换全屏
   */
  toggle(element?: HTMLElement): Promise<void> {
    if (this.isFullscreen()) {
      return this.exit();
    } else {
      return this.enter(element);
    }
  },

  /**
   * 是否全屏
   */
  isFullscreen(): boolean {
    return !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).msFullscreenElement
    );
  },
};

/**
 * 加载外部脚本
 */
export const loadScript = (
  src: string,
  attrs?: Record<string, string>,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;

    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });
    }

    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

    document.head.appendChild(script);
  });
};

/**
 * 防抖动画帧
 */
export const rafThrottle = <T extends (...args: any[]) => any>(fn: T): T => {
  let rafId: number | null = null;

  return ((...args: any[]) => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }

    rafId = requestAnimationFrame(() => {
      fn(...args);
      rafId = null;
    });
  }) as T;
};
