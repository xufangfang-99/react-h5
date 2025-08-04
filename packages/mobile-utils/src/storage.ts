/**
 * 增强的本地存储工具
 */

export interface StorageOptions {
  prefix?: string;
  expires?: number; // 过期时间（毫秒）
  encrypt?: boolean; // 是否加密（简单混淆）
}

interface StorageData<T = any> {
  value: T;
  expires?: number;
  timestamp: number;
}

/**
 * 简单的字符串混淆
 */
const simpleEncrypt = (str: string): string => {
  return btoa(encodeURIComponent(str).split("").reverse().join(""));
};

const simpleDecrypt = (str: string): string => {
  try {
    return decodeURIComponent(atob(str).split("").reverse().join(""));
  } catch {
    return str;
  }
};

/**
 * 增强的存储类
 */
export class Storage {
  private prefix: string;
  private encrypt: boolean;
  private storage: globalThis.Storage;

  constructor(
    storage: globalThis.Storage = window.localStorage,
    options: StorageOptions = {},
  ) {
    this.storage = storage;
    this.prefix = options.prefix || "app_";
    this.encrypt = options.encrypt || false;
  }

  /**
   * 获取完整的键名
   */
  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  /**
   * 序列化数据
   */
  private serialize<T>(value: T, expires?: number): string {
    const data: StorageData<T> = {
      value,
      timestamp: Date.now(),
    };

    if (expires) {
      data.expires = Date.now() + expires;
    }

    const str = JSON.stringify(data);
    return this.encrypt ? simpleEncrypt(str) : str;
  }

  /**
   * 反序列化数据
   */
  private deserialize<T>(str: string): T | null {
    try {
      const decrypted = this.encrypt ? simpleDecrypt(str) : str;
      const data: StorageData<T> = JSON.parse(decrypted);

      // 检查是否过期
      if (data.expires && data.expires < Date.now()) {
        return null;
      }

      return data.value;
    } catch {
      return null;
    }
  }

  /**
   * 设置存储
   */
  set<T>(key: string, value: T, expires?: number): boolean {
    try {
      const fullKey = this.getKey(key);
      const serialized = this.serialize(value, expires);
      this.storage.setItem(fullKey, serialized);
      return true;
    } catch (e) {
      console.error("Storage set error:", e);
      return false;
    }
  }

  /**
   * 获取存储
   */
  get<T>(key: string, defaultValue?: T): T | undefined {
    try {
      const fullKey = this.getKey(key);
      const item = this.storage.getItem(fullKey);

      if (!item) {
        return defaultValue;
      }

      const value = this.deserialize<T>(item);

      if (value === null) {
        this.remove(key);
        return defaultValue;
      }

      return value;
    } catch {
      return defaultValue;
    }
  }

  /**
   * 移除存储
   */
  remove(key: string): void {
    const fullKey = this.getKey(key);
    this.storage.removeItem(fullKey);
  }

  /**
   * 清空所有带前缀的存储
   */
  clear(): void {
    const keys: string[] = [];

    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keys.push(key);
      }
    }

    keys.forEach((key) => this.storage.removeItem(key));
  }

  /**
   * 获取所有键
   */
  keys(): string[] {
    const keys: string[] = [];

    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keys.push(key.substring(this.prefix.length));
      }
    }

    return keys;
  }

  /**
   * 获取存储大小（字节）
   */
  size(): number {
    let size = 0;

    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key && key.startsWith(this.prefix)) {
        const value = this.storage.getItem(key);
        if (value) {
          size += key.length + value.length;
        }
      }
    }

    return size * 2; // UTF-16 编码
  }

  /**
   * 检查是否存在
   */
  has(key: string): boolean {
    const value = this.get(key);
    return value !== undefined;
  }
}

/**
 * 创建默认的存储实例
 */
export const localStorage = new Storage(window.localStorage);
export const sessionStorage = new Storage(window.sessionStorage);

/**
 * 创建带加密的存储实例
 */
export const secureStorage = new Storage(window.localStorage, {
  prefix: "secure_",
  encrypt: true,
});

/**
 * Cookie 操作工具
 */
export const cookie = {
  /**
   * 设置 Cookie
   */
  set(
    name: string,
    value: string,
    options?: {
      expires?: number | Date;
      path?: string;
      domain?: string;
      secure?: boolean;
      sameSite?: "Strict" | "Lax" | "None";
    },
  ): void {
    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options?.expires) {
      const expires =
        options.expires instanceof Date
          ? options.expires
          : new Date(Date.now() + options.expires);
      cookieStr += `; expires=${expires.toUTCString()}`;
    }

    if (options?.path) {
      cookieStr += `; path=${options.path}`;
    }

    if (options?.domain) {
      cookieStr += `; domain=${options.domain}`;
    }

    if (options?.secure) {
      cookieStr += "; secure";
    }

    if (options?.sameSite) {
      cookieStr += `; samesite=${options.sameSite}`;
    }

    document.cookie = cookieStr;
  },

  /**
   * 获取 Cookie
   */
  get(name: string): string | null {
    const nameEQ = `${encodeURIComponent(name)}=`;
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
      const c = cookie.trim();
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length));
      }
    }

    return null;
  },

  /**
   * 删除 Cookie
   */
  remove(name: string, options?: { path?: string; domain?: string }): void {
    cookie.set(name, "", {
      expires: new Date(0),
      path: options?.path,
      domain: options?.domain,
    });
  },

  /**
   * 获取所有 Cookie
   */
  getAll(): Record<string, string> {
    const cookies: Record<string, string> = {};
    const pairs = document.cookie.split(";");

    for (const pair of pairs) {
      const [name, value] = pair.trim().split("=");
      if (name) {
        cookies[decodeURIComponent(name)] = decodeURIComponent(value || "");
      }
    }

    return cookies;
  },
};
