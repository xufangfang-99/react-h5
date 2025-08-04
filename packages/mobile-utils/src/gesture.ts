/**
 * 手势识别相关工具
 */

export interface Point {
  x: number;
  y: number;
  time: number;
}

export interface SwipeEvent {
  direction: "left" | "right" | "up" | "down";
  distance: number;
  duration: number;
  velocity: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export interface PinchEvent {
  scale: number;
  center: Point;
}

export interface TouchConfig {
  threshold?: number;
  timeout?: number;
  preventScroll?: boolean;
}

/**
 * 创建触摸手势识别器
 */
export class GestureRecognizer {
  private element: HTMLElement;
  private config: Required<TouchConfig>;
  private touchStartPoint: Point | null = null;
  private lastTouchPoint: Point | null = null;
  private touchStartTime: number = 0;
  private initialDistance: number = 0;

  constructor(element: HTMLElement, config: TouchConfig = {}) {
    this.element = element;
    this.config = {
      threshold: config.threshold ?? 30,
      timeout: config.timeout ?? 500,
      preventScroll: config.preventScroll ?? false,
    };

    this.bindEvents();
  }

  private bindEvents() {
    this.element.addEventListener("touchstart", this.handleTouchStart, {
      passive: !this.config.preventScroll,
    });
    this.element.addEventListener("touchmove", this.handleTouchMove, {
      passive: !this.config.preventScroll,
    });
    this.element.addEventListener("touchend", this.handleTouchEnd);
    this.element.addEventListener("touchcancel", this.handleTouchCancel);
  }

  private handleTouchStart = (e: TouchEvent) => {
    if (this.config.preventScroll) {
      e.preventDefault();
    }

    const touch = e.touches[0];
    this.touchStartPoint = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    this.touchStartTime = Date.now();

    // 双指捏合手势初始化
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      this.initialDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY,
      );
    }
  };

  private handleTouchMove = (e: TouchEvent) => {
    if (this.config.preventScroll) {
      e.preventDefault();
    }

    if (!this.touchStartPoint) return;

    const touch = e.touches[0];
    this.lastTouchPoint = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };

    // 处理双指捏合
    if (e.touches.length === 2 && this.initialDistance > 0) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY,
      );

      const scale = currentDistance / this.initialDistance;
      const centerX = (touch1.clientX + touch2.clientX) / 2;
      const centerY = (touch1.clientY + touch2.clientY) / 2;

      this.element.dispatchEvent(
        new CustomEvent("pinch", {
          detail: {
            scale,
            center: { x: centerX, y: centerY, time: Date.now() },
          } as PinchEvent,
        }),
      );
    }
  };

  private handleTouchEnd = (_e: TouchEvent) => {
    if (!this.touchStartPoint || !this.lastTouchPoint) return;

    const duration = Date.now() - this.touchStartTime;
    const deltaX = this.lastTouchPoint.x - this.touchStartPoint.x;
    const deltaY = this.lastTouchPoint.y - this.touchStartPoint.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // 检测滑动手势
    if (distance > this.config.threshold && duration < this.config.timeout) {
      const velocity = distance / duration;
      let direction: SwipeEvent["direction"];

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? "right" : "left";
      } else {
        direction = deltaY > 0 ? "down" : "up";
      }

      const swipeEvent: SwipeEvent = {
        direction,
        distance,
        duration,
        velocity,
        startX: this.touchStartPoint.x,
        startY: this.touchStartPoint.y,
        endX: this.lastTouchPoint.x,
        endY: this.lastTouchPoint.y,
      };

      this.element.dispatchEvent(
        new CustomEvent("swipe", { detail: swipeEvent }),
      );
      this.element.dispatchEvent(
        new CustomEvent(`swipe${direction}`, { detail: swipeEvent }),
      );
    }

    // 检测点击手势
    if (distance < 10 && duration < 200) {
      this.element.dispatchEvent(
        new CustomEvent("tap", {
          detail: {
            x: this.touchStartPoint.x,
            y: this.touchStartPoint.y,
          },
        }),
      );
    }

    // 检测长按手势
    if (distance < 10 && duration > 500) {
      this.element.dispatchEvent(
        new CustomEvent("longpress", {
          detail: {
            x: this.touchStartPoint.x,
            y: this.touchStartPoint.y,
            duration,
          },
        }),
      );
    }

    this.reset();
  };

  private handleTouchCancel = () => {
    this.reset();
  };

  private reset() {
    this.touchStartPoint = null;
    this.lastTouchPoint = null;
    this.touchStartTime = 0;
    this.initialDistance = 0;
  }

  destroy() {
    this.element.removeEventListener("touchstart", this.handleTouchStart);
    this.element.removeEventListener("touchmove", this.handleTouchMove);
    this.element.removeEventListener("touchend", this.handleTouchEnd);
    this.element.removeEventListener("touchcancel", this.handleTouchCancel);
  }
}

/**
 * 便捷的手势绑定函数
 */
export const onSwipe = (
  element: HTMLElement,
  callback: (event: SwipeEvent) => void,
  config?: TouchConfig,
): (() => void) => {
  const recognizer = new GestureRecognizer(element, config);

  const handler = (e: Event) => {
    callback((e as CustomEvent<SwipeEvent>).detail);
  };

  element.addEventListener("swipe", handler);

  return () => {
    element.removeEventListener("swipe", handler);
    recognizer.destroy();
  };
};

/**
 * 监听特定方向的滑动
 */
export const onSwipeDirection = (
  element: HTMLElement,
  direction: SwipeEvent["direction"],
  callback: (event: SwipeEvent) => void,
  config?: TouchConfig,
): (() => void) => {
  const recognizer = new GestureRecognizer(element, config);

  const handler = (e: Event) => {
    callback((e as CustomEvent<SwipeEvent>).detail);
  };

  element.addEventListener(`swipe${direction}`, handler);

  return () => {
    element.removeEventListener(`swipe${direction}`, handler);
    recognizer.destroy();
  };
};

/**
 * 监听点击手势
 */
export const onTap = (
  element: HTMLElement,
  callback: (event: { x: number; y: number }) => void,
  config?: TouchConfig,
): (() => void) => {
  const recognizer = new GestureRecognizer(element, config);

  const handler = (e: Event) => {
    callback((e as CustomEvent<{ x: number; y: number }>).detail);
  };

  element.addEventListener("tap", handler);

  return () => {
    element.removeEventListener("tap", handler);
    recognizer.destroy();
  };
};

/**
 * 监听长按手势
 */
export const onLongPress = (
  element: HTMLElement,
  callback: (event: { x: number; y: number; duration: number }) => void,
  config?: TouchConfig,
): (() => void) => {
  const recognizer = new GestureRecognizer(element, config);

  const handler = (e: Event) => {
    callback(
      (e as CustomEvent<{ x: number; y: number; duration: number }>).detail,
    );
  };

  element.addEventListener("longpress", handler);

  return () => {
    element.removeEventListener("longpress", handler);
    recognizer.destroy();
  };
};

/**
 * 监听捏合手势
 */
export const onPinch = (
  element: HTMLElement,
  callback: (event: PinchEvent) => void,
  config?: TouchConfig,
): (() => void) => {
  const recognizer = new GestureRecognizer(element, config);

  const handler = (e: Event) => {
    callback((e as CustomEvent<PinchEvent>).detail);
  };

  element.addEventListener("pinch", handler);

  return () => {
    element.removeEventListener("pinch", handler);
    recognizer.destroy();
  };
};
