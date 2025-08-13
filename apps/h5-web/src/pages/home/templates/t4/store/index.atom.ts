// src/pages/home/templates/t4/store/index.atom.ts
import { atom } from "@/store";

// T4 独立的状态管理
export const specialDataAtom = atom({
  hero: null,
  items: [],
});

export const selectedCategoryAtom = atom<string>("all");

export const layoutModeAtom = atom<"minimal" | "detailed">("minimal");
