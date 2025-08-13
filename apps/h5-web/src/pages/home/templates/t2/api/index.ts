// src/pages/home/templates/t2/api/index.ts
import { homeAPI as commonAPI } from "../../common/api";

// 扩展通用 API
export const homeAPI = {
  ...commonAPI,

  // 覆盖产品接口，添加促销信息
  getProducts: async (params?: any) => {
    try {
      const data = await commonAPI.getProducts(params);
      // 确保 data 是数组
      if (!Array.isArray(data)) {
        console.error("产品数据格式错误:", data);
        return [];
      }
      // 添加模板2的促销逻辑
      return data.map((item: any) => ({
        ...item,
        discount: item.price > 200 ? 0.8 : 1,
        tag: item.price > 200 ? "限时8折" : item.price > 100 ? "热销" : "新品",
      }));
    } catch (error) {
      console.error("获取产品失败:", error);
      return [];
    }
  },
};
