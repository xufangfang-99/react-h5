import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// ============ 全局原子 ============

// 主题配置原子（持久化）
export const themeAtom = atomWithStorage("theme", "default");

// 用户信息原子（持久化）
export const userAtom = atomWithStorage("user", {
  id: "",
  name: "",
  avatar: "",
  token: "",
});

// 全局加载状态
export const globalLoadingAtom = atom(false);

// 全局错误信息
export const globalErrorAtom = atom<string | null>(null);

// ============ 派生原子 ============

// 是否已登录
export const isLoggedInAtom = atom((get) => !!get(userAtom).token);

// 当前用户名
export const userNameAtom = atom((get) => get(userAtom).name || "游客");
