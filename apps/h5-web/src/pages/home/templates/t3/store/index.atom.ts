// src/pages/home/templates/t3/store/index.atom.ts
import { atom } from "@/store";

// 复用 common store
export * from "../../common/store/index.atom";

// T3 特有的状态
// 视图模式
export const viewModeAtom = atom<"grid" | "list">("grid");

// 筛选条件
export const filterAtom = atom({
  category: "",
  priceRange: [0, 1000] as [number, number],
});
