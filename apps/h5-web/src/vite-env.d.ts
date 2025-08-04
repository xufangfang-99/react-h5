/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

// UnoCSS 虚拟模块
declare module "virtual:uno.css" {
  const content: string;
  export default content;
}
