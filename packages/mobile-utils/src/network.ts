/**
 * 网络状态相关工具
 */

export type NetworkType =
  | "2g"
  | "3g"
  | "4g"
  | "5g"
  | "wifi"
  | "ethernet"
  | "unknown";

export interface NetworkInfo {
  online: boolean;
  type: NetworkType;
  effectiveType?: "2g" | "3g" | "4g" | "slow-2g";
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

/**
 * 获取网络连接信息
 */
export const getNetworkInfo = (): NetworkInfo => {
  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;

  const info: NetworkInfo = {
    online: navigator.onLine,
    type: "unknown",
  };

  if (connection) {
    // 网络类型
    if (connection.type) {
      info.type = connection.type as NetworkType;
    } else if (connection.effectiveType) {
      // 根据有效类型推断
      const effectiveType = connection.effectiveType;
      if (effectiveType.includes("2g")) info.type = "2g";
      else if (effectiveType.includes("3g")) info.type = "3g";
      else if (effectiveType.includes("4g")) info.type = "4g";
      else if (effectiveType.includes("5g")) info.type = "5g";
    }

    // 有效网络类型
    if (connection.effectiveType) {
      info.effectiveType = connection.effectiveType;
    }

    // 下行速度（Mbps）
    if (typeof connection.downlink === "number") {
      info.downlink = connection.downlink;
    }

    // 往返时延（ms）
    if (typeof connection.rtt === "number") {
      info.rtt = connection.rtt;
    }

    // 是否开启流量节省模式
    if (typeof connection.saveData === "boolean") {
      info.saveData = connection.saveData;
    }
  }

  return info;
};

/**
 * 监听网络状态变化
 */
export const onNetworkChange = (
  callback: (info: NetworkInfo) => void,
): (() => void) => {
  const handleChange = () => {
    callback(getNetworkInfo());
  };

  // 监听在线/离线状态
  window.addEventListener("online", handleChange);
  window.addEventListener("offline", handleChange);

  // 监听网络连接变化
  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;

  if (connection) {
    connection.addEventListener("change", handleChange);
  }

  // 返回清理函数
  return () => {
    window.removeEventListener("online", handleChange);
    window.removeEventListener("offline", handleChange);

    if (connection) {
      connection.removeEventListener("change", handleChange);
    }
  };
};

/**
 * 判断是否为慢速网络
 */
export const isSlowNetwork = (): boolean => {
  const info = getNetworkInfo();

  // 离线
  if (!info.online) return true;

  // 2G 网络
  if (
    info.type === "2g" ||
    info.effectiveType === "2g" ||
    info.effectiveType === "slow-2g"
  ) {
    return true;
  }

  // 低速下行
  if (info.downlink && info.downlink < 1) {
    return true;
  }

  // 高延迟
  if (info.rtt && info.rtt > 500) {
    return true;
  }

  return false;
};

/**
 * 判断是否为高速网络
 */
export const isFastNetwork = (): boolean => {
  const info = getNetworkInfo();

  if (!info.online) return false;

  // WiFi 或以太网
  if (info.type === "wifi" || info.type === "ethernet") {
    return true;
  }

  // 4G/5G
  if (info.type === "4g" || info.type === "5g" || info.effectiveType === "4g") {
    return true;
  }

  // 高速下行
  if (info.downlink && info.downlink >= 10) {
    return true;
  }

  return false;
};

/**
 * 获取适合当前网络的图片质量
 */
export type ImageQuality = "low" | "medium" | "high" | "original";

export const getRecommendedImageQuality = (): ImageQuality => {
  const info = getNetworkInfo();

  // 离线或流量节省模式
  if (!info.online || info.saveData) {
    return "low";
  }

  // 2G
  if (
    info.type === "2g" ||
    info.effectiveType === "2g" ||
    info.effectiveType === "slow-2g"
  ) {
    return "low";
  }

  // 3G
  if (info.type === "3g" || info.effectiveType === "3g") {
    return "medium";
  }

  // WiFi/以太网/5G
  if (info.type === "wifi" || info.type === "ethernet" || info.type === "5g") {
    return "original";
  }

  // 4G 或其他
  return "high";
};

/**
 * 获取适合当前网络的视频质量
 */
export type VideoQuality = "360p" | "480p" | "720p" | "1080p" | "auto";

export const getRecommendedVideoQuality = (): VideoQuality => {
  const info = getNetworkInfo();

  // 离线
  if (!info.online) {
    return "auto";
  }

  // 流量节省模式
  if (info.saveData) {
    return "360p";
  }

  // 根据网络类型判断
  switch (info.type) {
    case "2g":
      return "360p";
    case "3g":
      return "480p";
    case "4g":
      return "720p";
    case "5g":
    case "wifi":
    case "ethernet":
      return "1080p";
    default:
      // 根据有效类型判断
      if (info.effectiveType === "2g" || info.effectiveType === "slow-2g") {
        return "360p";
      } else if (info.effectiveType === "3g") {
        return "480p";
      } else if (info.effectiveType === "4g") {
        return "720p";
      }
      return "auto";
  }
};

/**
 * 预测下载时间（秒）
 */
export const estimateDownloadTime = (
  fileSizeInBytes: number,
): number | null => {
  const info = getNetworkInfo();

  if (!info.online || !info.downlink) {
    return null;
  }

  // downlink 单位是 Mbps，转换为 Bps
  const bytesPerSecond = (info.downlink * 1024 * 1024) / 8;

  return fileSizeInBytes / bytesPerSecond;
};

/**
 * 自适应资源加载器
 */
export interface AdaptiveLoaderOptions {
  lowQuality: string;
  mediumQuality: string;
  highQuality: string;
  originalQuality: string;
}

export const getAdaptiveResource = (options: AdaptiveLoaderOptions): string => {
  const quality = getRecommendedImageQuality();

  switch (quality) {
    case "low":
      return options.lowQuality;
    case "medium":
      return options.mediumQuality;
    case "high":
      return options.highQuality;
    case "original":
      return options.originalQuality;
    default:
      return options.mediumQuality;
  }
};
