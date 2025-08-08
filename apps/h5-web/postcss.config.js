export default {
  plugins: {
    "postcss-px-to-viewport-8-plugin": {
      viewportWidth: 375, // 设计稿宽度
      viewportHeight: 667, // 设计稿高度
      unitPrecision: 3, // 转换后保留的小数位数
      viewportUnit: "vw", // 转换成的视口单位
      selectorBlackList: [".ignore", ".hairlines"], // 不转换的类名
      minPixelValue: 1, // 小于等于1px不转换
      mediaQuery: false, // 允许在媒体查询中转换
      exclude: [/node_modules/], // 忽略文件
    },
  },
};
