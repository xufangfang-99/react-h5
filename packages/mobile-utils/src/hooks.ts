/**
 * 移动端常用 React Hooks
 */

import { useEffect, useState, useRef, useCallback } from "react";
import { getDeviceInfo, type DeviceInfo } from "./device";
import { getNetworkInfo, onNetworkChange, type NetworkInfo } from "./network";
import { GestureRecognizer, type SwipeEvent } from "./gesture";
import { isInViewport } from "./dom";

/**
 * 设备信息 Hook
 */
export const useDeviceInfo = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(getDeviceInfo());

  useEffect(() => {
    const handleResize = () => {
      setDeviceInfo(getDeviceInfo());
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return deviceInfo;
};

/**
 * 网络状态 Hook
 */
export const useNetworkStatus = (): NetworkInfo => {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>(getNetworkInfo());

  useEffect(() => {
    const cleanup = onNetworkChange(setNetworkInfo);
    return cleanup;
  }, []);

  return networkInfo;
};

/**
 * 手势识别 Hook
 */
export interface UseGestureOptions {
  onSwipe?: (event: SwipeEvent) => void;
  onSwipeLeft?: (event: SwipeEvent) => void;
  onSwipeRight?: (event: SwipeEvent) => void;
  onSwipeUp?: (event: SwipeEvent) => void;
  onSwipeDown?: (event: SwipeEvent) => void;
  onTap?: (event: { x: number; y: number }) => void;
  onLongPress?: (event: { x: number; y: number; duration: number }) => void;
  onPinch?: (event: {
    scale: number;
    center: { x: number; y: number };
  }) => void;
  threshold?: number;
  timeout?: number;
}

export const useGesture = <T extends HTMLElement = HTMLDivElement>(
  options: UseGestureOptions = {},
): React.RefObject<T | null> => {
  const ref = useRef<T | null>(null);
  const recognizerRef = useRef<GestureRecognizer | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    recognizerRef.current = new GestureRecognizer(ref.current, {
      threshold: options.threshold,
      timeout: options.timeout,
    });

    const element = ref.current;

    // 绑定事件监听器
    const handlers: Array<[string, (e: Event) => void]> = [];

    if (options.onSwipe) {
      const handler = (e: Event) =>
        options.onSwipe!((e as CustomEvent<SwipeEvent>).detail);
      element.addEventListener("swipe", handler);
      handlers.push(["swipe", handler]);
    }

    if (options.onSwipeLeft) {
      const handler = (e: Event) =>
        options.onSwipeLeft!((e as CustomEvent<SwipeEvent>).detail);
      element.addEventListener("swipeleft", handler);
      handlers.push(["swipeleft", handler]);
    }

    if (options.onSwipeRight) {
      const handler = (e: Event) =>
        options.onSwipeRight!((e as CustomEvent<SwipeEvent>).detail);
      element.addEventListener("swiperight", handler);
      handlers.push(["swiperight", handler]);
    }

    if (options.onSwipeUp) {
      const handler = (e: Event) =>
        options.onSwipeUp!((e as CustomEvent<SwipeEvent>).detail);
      element.addEventListener("swipeup", handler);
      handlers.push(["swipeup", handler]);
    }

    if (options.onSwipeDown) {
      const handler = (e: Event) =>
        options.onSwipeDown!((e as CustomEvent<SwipeEvent>).detail);
      element.addEventListener("swipedown", handler);
      handlers.push(["swipedown", handler]);
    }

    if (options.onTap) {
      const handler = (e: Event) =>
        options.onTap!((e as CustomEvent<{ x: number; y: number }>).detail);
      element.addEventListener("tap", handler);
      handlers.push(["tap", handler]);
    }

    if (options.onLongPress) {
      const handler = (e: Event) =>
        options.onLongPress!(
          (e as CustomEvent<{ x: number; y: number; duration: number }>).detail,
        );
      element.addEventListener("longpress", handler);
      handlers.push(["longpress", handler]);
    }

    if (options.onPinch) {
      const handler = (e: Event) =>
        options.onPinch!(
          (
            e as CustomEvent<{
              scale: number;
              center: { x: number; y: number };
            }>
          ).detail,
        );
      element.addEventListener("pinch", handler);
      handlers.push(["pinch", handler]);
    }

    return () => {
      // 清理事件监听器
      handlers.forEach(([event, handler]) => {
        element.removeEventListener(event, handler);
      });

      // 销毁手势识别器
      if (recognizerRef.current) {
        recognizerRef.current.destroy();
        recognizerRef.current = null;
      }
    };
  }, [options]);

  return ref;
};

/**
 * 视口检测 Hook
 */
export interface UseInViewportOptions {
  offset?: number;
  threshold?: number;
  once?: boolean;
}

export const useInViewport = <T extends HTMLElement = HTMLDivElement>(
  options: UseInViewportOptions = {},
): [React.RefObject<T | null>, boolean] => {
  const ref = useRef<T | null>(null);
  const [inViewport, setInViewport] = useState(false);
  const hasBeenInViewport = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const checkViewport = () => {
      if (!ref.current) return;

      const isVisible = isInViewport(ref.current, {
        offset: options.offset,
        threshold: options.threshold,
      });

      if (options.once && hasBeenInViewport.current) {
        return;
      }

      if (isVisible) {
        hasBeenInViewport.current = true;
      }

      setInViewport(isVisible);
    };

    // 初始检查
    checkViewport();

    // 监听滚动和调整大小
    window.addEventListener("scroll", checkViewport, { passive: true });
    window.addEventListener("resize", checkViewport);

    return () => {
      window.removeEventListener("scroll", checkViewport);
      window.removeEventListener("resize", checkViewport);
    };
  }, [options.offset, options.threshold, options.once]);

  return [ref, inViewport];
};

/**
 * 本地存储 Hook
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] => {
  // 获取初始值
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // 设置值
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  // 移除值
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

/**
 * 防抖 Hook
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * 节流 Hook
 */
export const useThrottle = <T>(value: T, interval: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdated = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdated.current;

    if (timeSinceLastUpdate >= interval) {
      lastUpdated.current = now;
      setThrottledValue(value);
    } else {
      const timer = setTimeout(() => {
        lastUpdated.current = Date.now();
        setThrottledValue(value);
      }, interval - timeSinceLastUpdate);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [value, interval]);

  return throttledValue;
};

/**
 * 窗口尺寸 Hook
 */
export interface WindowSize {
  width: number;
  height: number;
}

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

/**
 * 滚动位置 Hook
 */
export interface ScrollPosition {
  x: number;
  y: number;
}

export const useScrollPosition = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: window.pageXOffset,
    y: window.pageYOffset,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x: window.pageXOffset,
        y: window.pageYOffset,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPosition;
};

/**
 * 页面可见性 Hook
 */
export const usePageVisibility = (): boolean => {
  const [isVisible, setIsVisible] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return isVisible;
};

/**
 * 倒计时 Hook
 */
export interface UseCountdownOptions {
  onComplete?: () => void;
  interval?: number;
}

export const useCountdown = (
  endTime: Date | string | number,
  options: UseCountdownOptions = {},
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
} => {
  const { onComplete, interval = 1000 } = options;
  const [timeLeft, setTimeLeft] = useState(() => {
    const end = new Date(endTime).getTime();
    const now = Date.now();
    return Math.max(0, end - now);
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTimeLeft = Math.max(0, prev - interval);
        if (newTimeLeft === 0) {
          onComplete?.();
        }
        return newTimeLeft;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [timeLeft, interval, onComplete]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isComplete: timeLeft === 0,
  };
};
