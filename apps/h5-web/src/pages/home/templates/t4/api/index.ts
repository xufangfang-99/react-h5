// src/pages/home/templates/t4/api/index.ts
import axios from "axios";

// T4 完全自定义的 API
export const specialAPI = {
  // 获取特殊数据
  getSpecialData: async () => {
    const { data } = await axios.get("/api/t4/special-data");
    return data;
  },

  // 获取分类数据
  getCategories: async () => {
    const { data } = await axios.get("/api/t4/categories");
    return data;
  },
};
