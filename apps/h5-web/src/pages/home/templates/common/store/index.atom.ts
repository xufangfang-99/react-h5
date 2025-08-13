// src/pages/home/templates/common/store/index.atom.ts
import { atom } from "@/store";
// import { homeAPI } from '../api'; // 暂时注释掉，因为使用 mock 数据

// 定义类型
interface Banner {
  id: number;
  image: string;
  title: string;
  link: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

// 轮播图数据
export const bannersAtom = atom<Banner[]>([]);
export const bannersLoadingAtom = atom(false);
export const bannersErrorAtom = atom<Error | null>(null);

// 产品列表
export const productsAtom = atom<Product[]>([]);
export const productsLoadingAtom = atom(false);
export const productsErrorAtom = atom<Error | null>(null);

// 加载轮播图
export const loadBannersAtom = atom(null, async (_get, set) => {
  set(bannersLoadingAtom, true);
  set(bannersErrorAtom, null);
  try {
    // 暂时使用 mock 数据
    const { mockData } = await import("../mock");
    set(bannersAtom, mockData.banners || []);
  } catch (error) {
    console.error("加载轮播图失败:", error);
    set(bannersErrorAtom, error as Error);
    set(bannersAtom, []);
  } finally {
    set(bannersLoadingAtom, false);
  }
});

// 加载产品
export const loadProductsAtom = atom(null, async (_get, set) => {
  set(productsLoadingAtom, true);
  set(productsErrorAtom, null);
  try {
    // 暂时使用 mock 数据
    const { mockData } = await import("../mock");
    set(productsAtom, mockData.products || []);
  } catch (error) {
    console.error("加载产品失败:", error);
    set(productsErrorAtom, error as Error);
    set(productsAtom, []);
  } finally {
    set(productsLoadingAtom, false);
  }
});
