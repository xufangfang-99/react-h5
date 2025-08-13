// src/pages/home/templates/common/api/index.ts
// import axios from 'axios'; // 暂时不需要，使用 mock 数据时注释掉

// 通用 API 接口
export const homeAPI = {
  // 获取轮播图
  getBanners: async () => {
    try {
      // 暂时返回 mock 数据
      const { mockData } = await import("../mock");
      return mockData.banners;
    } catch (error) {
      console.error("获取轮播图失败:", error);
      return [];
    }
  },

  // 获取产品列表
  getProducts: async (_params?: { page?: number; pageSize?: number }) => {
    // 参数前加下划线表示暂时未使用
    try {
      // 暂时返回 mock 数据
      const { mockData } = await import("../mock");
      return mockData.products;

      // 真实 API 调用时会使用 params
      // const { data } = await axios.get('/api/home/products', { params: _params });
      // return data;
    } catch (error) {
      console.error("获取产品失败:", error);
      return [];
    }
  },

  // 获取推荐内容
  getRecommends: async () => {
    try {
      const { mockData } = await import("../mock");
      return mockData.recommends || [];
    } catch (error) {
      console.error("获取推荐失败:", error);
      return [];
    }
  },
};
