import { Plugin as importToCDN } from "vite-plugin-cdn-import";

/**
 * @description 打包时采用`cdn`模式，仅限外网使用（默认不采用，如果需要采用cdn模式，请在 .env.production 文件，将 VITE_CDN 设置成true）
 * 平台采用国内cdn：https://www.bootcdn.cn，当然你也可以选择 https://unpkg.com 或者 https://www.jsdelivr.com
 * 注意：上面提到的仅限外网使用也不是完全肯定的，如果你们公司内网部署的有相关js、css文件，也可以将下面配置对应改一下，整一套内网版cdn
 */
export const cdn = importToCDN({
  //（prodUrl解释： name: 对应下面modules的name，version: 自动读取本地package.json中dependencies依赖中对应包的版本号，path: 对应下面modules的path，当然也可写完整路径，会替换prodUrl）
  prodUrl: "https://cdn.bootcdn.net/ajax/libs/{name}/{version}/{path}",
  modules: [
    {
      name: "react",
      var: "React",
      path: "umd/react.production.min.js",
    },
    {
      name: "react-dom",
      var: "ReactDOM",
      path: "umd/react-dom.production.min.js",
    },
    {
      name: "react-router-dom",
      var: "ReactRouterDOM",
      path: "umd/react-router-dom.min.js",
    },
    {
      name: "axios",
      var: "axios",
      path: "axios.min.js",
    },
    {
      name: "dayjs",
      var: "dayjs",
      path: "dayjs.min.js",
    },
    {
      name: "lodash-es",
      var: "_",
      path: "lodash.min.js",
    },
    {
      name: "antd",
      var: "antd",
      path: "antd.min.js",
      css: "antd.min.css",
    },
  ],
});
