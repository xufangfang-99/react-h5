import { atom } from "jotai";

// 全局加载状态
export const globalLoadingAtom = atom(false);

// 全局错误信息
export const globalErrorAtom = atom<string | null>(null);

// 网络状态
export const networkStatusAtom = atom(
  typeof window !== "undefined" ? navigator.onLine : true,
);

// 设备信息（只计算一次）
export const deviceInfoAtom = atom(() => {
  if (typeof window === "undefined") {
    return { isMobile: false, isIOS: false, isAndroid: false };
  }

  const ua = navigator.userAgent;
  return {
    isMobile: /Mobile|Android|iPhone/i.test(ua),
    isIOS: /iPhone|iPad|iPod/i.test(ua),
    isAndroid: /Android/i.test(ua),
    isWeChat: /MicroMessenger/i.test(ua),
  };
});
