import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// 用户信息类型
interface UserInfo {
  id: string;
  name: string;
  avatar: string;
  token: string;
}

// 用户信息（持久化）
export const userAtom = atomWithStorage<UserInfo | null>("user", null);

// 主题（持久化）
export const themeAtom = atomWithStorage<"default" | "dark">(
  "theme",
  "default",
);

// 派生原子 - 是否登录
export const isLoggedInAtom = atom((get) => !!get(userAtom)?.token);
