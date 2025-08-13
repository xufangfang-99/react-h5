// src/pages/home/templates/common/hooks/useHomeData.ts
import { useEffect } from "react";
import { useAtom, useSetAtom } from "@/store";
import {
  bannersAtom,
  bannersLoadingAtom,
  productsAtom,
  productsLoadingAtom,
  loadBannersAtom,
  loadProductsAtom,
} from "../store/index.atom";

export function useHomeData() {
  const [banners = []] = useAtom(bannersAtom); // 提供默认值
  const [bannersLoading] = useAtom(bannersLoadingAtom);
  const [products = []] = useAtom(productsAtom); // 提供默认值
  const [productsLoading] = useAtom(productsLoadingAtom);

  const loadBanners = useSetAtom(loadBannersAtom);
  const loadProducts = useSetAtom(loadProductsAtom);

  useEffect(() => {
    loadBanners();
    loadProducts();
  }, [loadBanners, loadProducts]);

  return {
    banners: banners || [], // 确保总是返回数组
    products: products || [], // 确保总是返回数组
    loading: bannersLoading || productsLoading,
  };
}
