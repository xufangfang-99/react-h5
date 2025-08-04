/**
 * 移动端常用格式化工具
 */

/**
 * 格式化手机号（隐藏中间4位）
 */
export const formatPhone = (phone: string, hidden = true): string => {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length !== 11) {
    return phone;
  }

  if (hidden) {
    return cleaned.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
  }

  return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3");
};

/**
 * 格式化银行卡号
 */
export const formatBankCard = (cardNumber: string, hidden = true): string => {
  const cleaned = cardNumber.replace(/\s/g, "");

  if (hidden) {
    // 只显示前4位和后4位
    if (cleaned.length >= 8) {
      const first4 = cleaned.slice(0, 4);
      const last4 = cleaned.slice(-4);
      const hiddenPart = "*".repeat(cleaned.length - 8);
      return `${first4} ${hiddenPart} ${last4}`
        .replace(/(.{4})/g, "$1 ")
        .trim();
    }
  }

  // 每4位加一个空格
  return cleaned.replace(/(.{4})/g, "$1 ").trim();
};

/**
 * 格式化金额
 */
export const formatMoney = (
  amount: number | string,
  options?: {
    prefix?: string;
    suffix?: string;
    decimals?: number;
    thousandsSeparator?: string;
  },
): string => {
  const {
    prefix = "¥",
    suffix = "",
    decimals = 2,
    thousandsSeparator = ",",
  } = options || {};

  const num = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(num)) {
    return `${prefix}0${suffix}`;
  }

  const fixed = num.toFixed(decimals);
  const parts = fixed.split(".");

  // 添加千位分隔符
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

  return `${prefix}${parts.join(".")}${suffix}`;
};

/**
 * 格式化文件大小
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

/**
 * 格式化时间（相对时间）
 */
export const formatRelativeTime = (date: Date | string | number): string => {
  const now = new Date();
  const target = new Date(date);
  const diff = now.getTime() - target.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return "刚刚";
  } else if (minutes < 60) {
    return `${minutes}分钟前`;
  } else if (hours < 24) {
    return `${hours}小时前`;
  } else if (days < 30) {
    return `${days}天前`;
  } else if (months < 12) {
    return `${months}个月前`;
  } else {
    return `${years}年前`;
  }
};

/**
 * 格式化倒计时
 */
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export const formatCountdown = (
  endTime: Date | string | number,
): CountdownTime => {
  const end = new Date(endTime).getTime();
  const now = new Date().getTime();
  const total = Math.max(0, end - now);

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
    total,
  };
};

/**
 * 格式化身份证号
 */
export const formatIdCard = (idCard: string, hidden = true): string => {
  const cleaned = idCard.replace(/\s/g, "");

  if (cleaned.length !== 18 && cleaned.length !== 15) {
    return idCard;
  }

  if (hidden) {
    // 隐藏出生日期部分
    if (cleaned.length === 18) {
      return cleaned.replace(/(\d{6})\d{8}(\d{4})/, "$1********$2");
    } else {
      return cleaned.replace(/(\d{6})\d{6}(\d{3})/, "$1******$2");
    }
  }

  return cleaned;
};

/**
 * 格式化姓名（隐藏姓或名）
 */
export const formatName = (name: string, hideFirst = false): string => {
  if (!name || name.length < 2) {
    return name;
  }

  if (hideFirst) {
    // 隐藏姓
    return "*" + name.slice(1);
  } else {
    // 隐藏名
    if (name.length === 2) {
      return name[0] + "*";
    } else {
      return name[0] + "*".repeat(name.length - 1);
    }
  }
};

/**
 * 格式化车牌号
 */
export const formatCarNumber = (carNumber: string): string => {
  const cleaned = carNumber.toUpperCase().replace(/\s/g, "");

  if (cleaned.length < 7) {
    return carNumber;
  }

  // 分离省份简称和后面的号码
  const province = cleaned.slice(0, 1);
  const city = cleaned.slice(1, 2);
  const number = cleaned.slice(2);

  return `${province}${city}·${number}`;
};

/**
 * 格式化数字（添加单位）
 */
export const formatNumber = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  } else if (num < 10000) {
    return (num / 1000).toFixed(1) + "k";
  } else if (num < 100000000) {
    return (num / 10000).toFixed(1) + "万";
  } else {
    return (num / 100000000).toFixed(1) + "亿";
  }
};

/**
 * 格式化百分比
 */
export const formatPercent = (value: number, decimals = 2): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * 格式化经纬度
 */
export const formatCoordinate = (
  latitude: number,
  longitude: number,
  decimals = 6,
): string => {
  const lat = latitude.toFixed(decimals);
  const lng = longitude.toFixed(decimals);

  const latDir = latitude >= 0 ? "N" : "S";
  const lngDir = longitude >= 0 ? "E" : "W";

  return `${Math.abs(parseFloat(lat))}°${latDir}, ${Math.abs(parseFloat(lng))}°${lngDir}`;
};
