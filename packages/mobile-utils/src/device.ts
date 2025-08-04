/**
 * 设备检测相关工具
 */

// 用户代理字符串
const ua = navigator.userAgent.toLowerCase();

/**
 * 判断是否为移动设备
 */
export const isMobile = (): boolean => {
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    ua,
  );
};

/**
 * 判断是否为 iOS 设备
 */
export const isIOS = (): boolean => {
  return /iphone|ipad|ipod/i.test(ua);
};

/**
 * 判断是否为 Android 设备
 */
export const isAndroid = (): boolean => {
  return /android/i.test(ua);
};

/**
 * 判断是否为微信环境
 */
export const isWeChat = (): boolean => {
  return /micromessenger/i.test(ua);
};

/**
 * 判断是否为支付宝环境
 */
export const isAlipay = (): boolean => {
  return /alipayclient/i.test(ua);
};

/**
 * 获取 iOS 版本号
 */
export const getIOSVersion = (): number | null => {
  if (!isIOS()) return null;

  const match = ua.match(/os (\d+)_(\d+)_?(\d+)?/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
};

/**
 * 获取 Android 版本号
 */
export const getAndroidVersion = (): number | null => {
  if (!isAndroid()) return null;

  const match = ua.match(/android\s([0-9\.]*)/);
  if (match) {
    return parseFloat(match[1]);
  }
  return null;
};

/**
 * 判断是否支持触摸
 */
export const isTouchDevice = (): boolean => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

/**
 * 获取设备类型
 */
export type DeviceType = "mobile" | "tablet" | "desktop";

export const getDeviceType = (): DeviceType => {
  const width = window.innerWidth;

  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
};

/**
 * 获取屏幕方向
 */
export type ScreenOrientation = "portrait" | "landscape";

export const getScreenOrientation = (): ScreenOrientation => {
  return window.innerHeight > window.innerWidth ? "portrait" : "landscape";
};

/**
 * 判断是否为 iPhone X 系列（有刘海屏）
 */
export const isIPhoneX = (): boolean => {
  if (!isIOS()) return false;

  const { width, height } = window.screen;

  // iPhone X, XS, 11 Pro
  if ((width === 375 && height === 812) || (height === 375 && width === 812)) {
    return true;
  }

  // iPhone XR, XS Max, 11, 11 Pro Max
  if ((width === 414 && height === 896) || (height === 414 && width === 896)) {
    return true;
  }

  // iPhone 12, 12 Pro, 13, 13 Pro, 14, 14 Pro
  if ((width === 390 && height === 844) || (height === 390 && width === 844)) {
    return true;
  }

  // iPhone 12 Pro Max, 13 Pro Max, 14 Plus, 14 Pro Max
  if ((width === 428 && height === 926) || (height === 428 && width === 926)) {
    return true;
  }

  // iPhone 12 mini, 13 mini
  if ((width === 360 && height === 780) || (height === 360 && width === 780)) {
    return true;
  }

  // iPhone 14 Pro, 15, 15 Pro
  if ((width === 393 && height === 852) || (height === 393 && width === 852)) {
    return true;
  }

  // iPhone 14 Pro Max, 15 Plus, 15 Pro Max
  if ((width === 430 && height === 932) || (height === 430 && width === 932)) {
    return true;
  }

  return false;
};

/**
 * 获取安全区域的 padding
 */
export interface SafeAreaInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const getSafeAreaInsets = (): SafeAreaInsets => {
  const computedStyle = getComputedStyle(document.documentElement);

  return {
    top: parseInt(computedStyle.getPropertyValue("--sat") || "0", 10),
    right: parseInt(computedStyle.getPropertyValue("--sar") || "0", 10),
    bottom: parseInt(computedStyle.getPropertyValue("--sab") || "0", 10),
    left: parseInt(computedStyle.getPropertyValue("--sal") || "0", 10),
  };
};

/**
 * 设备信息汇总
 */
export interface DeviceInfo {
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isWeChat: boolean;
  isAlipay: boolean;
  isTouchDevice: boolean;
  isIPhoneX: boolean;
  deviceType: DeviceType;
  orientation: ScreenOrientation;
  iosVersion: number | null;
  androidVersion: number | null;
  screenWidth: number;
  screenHeight: number;
  pixelRatio: number;
}

export const getDeviceInfo = (): DeviceInfo => {
  return {
    isMobile: isMobile(),
    isIOS: isIOS(),
    isAndroid: isAndroid(),
    isWeChat: isWeChat(),
    isAlipay: isAlipay(),
    isTouchDevice: isTouchDevice(),
    isIPhoneX: isIPhoneX(),
    deviceType: getDeviceType(),
    orientation: getScreenOrientation(),
    iosVersion: getIOSVersion(),
    androidVersion: getAndroidVersion(),
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    pixelRatio: window.devicePixelRatio || 1,
  };
};
