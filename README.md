# React H5 Mobile Admin

<p align="center">
  <img src="https://img.shields.io/badge/React-19.1.0-blue.svg" alt="React">
  <img src="https://img.shields.io/badge/Vite-7.0.6-646CFF.svg" alt="Vite">
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-blue.svg" alt="TypeScript">
  <img src="https://img.shields.io/badge/Ant_Design_Mobile-5.39.0-1890FF.svg" alt="Ant Design Mobile">
  <img src="https://img.shields.io/badge/Node-%E2%89%A520.19.0%20||%20%E2%89%A522.11.0-green.svg" alt="Node">
  <img src="https://img.shields.io/badge/pnpm-%E2%89%A59.0.0-F69220.svg" alt="pnpm">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
</p>

一个基于 React 19 + TypeScript + Vite + Ant Design Mobile 的现代化移动端管理系统模板，专为 H5 应用开发而设计。

## ✨ 特性

- 🚀 **最新技术栈**：React 19 + TypeScript + Vite 7 + SWC
- 📱 **移动端优化**：专为移动设备设计，支持响应式布局和触摸操作
- 🎨 **UI 框架**：集成 Ant Design Mobile 5.x，提供丰富的移动端组件
- 🎯 **TypeScript**：完整的类型定义，提供更好的开发体验
- ⚡ **快速开发**：Vite + SWC 提供极速的开发体验
- 🎪 **CSS 方案**：UnoCSS 原子化 CSS + PostCSS 移动端适配
- 📦 **状态管理**：Zustand 轻量级状态管理方案
- 🔧 **代码规范**：ESLint + Prettier + Husky + Commitlint
- 🚦 **路由管理**：React Router v7 最新版本
- 🌐 **网络请求**：Axios + React Query 数据请求方案
- 🎭 **Mock 支持**：内置 Mock 数据支持
- 📊 **打包分析**：支持打包体积分析
- 🔨 **开发工具**：代码检查器、路由警告移除等开发辅助工具

## 📦 安装使用

### 环境要求

- Node.js: ^20.19.0 || >=22.11.0
- pnpm: >=9.0.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/your-username/react-h5-admin.git

# 进入项目目录
cd react-h5-admin

# 安装依赖（请使用 pnpm）
pnpm install
```text

### 开发启动

```bash
# 启动开发服务器
pnpm dev

# 或者
pnpm serve
```text

### 构建打包

```bash
# 构建生产环境
pnpm build

# 构建测试环境
pnpm build:staging

# 构建并生成分析报告
pnpm report
```text

### 其他命令

```bash
# 预览构建结果
pnpm preview

# 构建并预览
pnpm preview:build

# 类型检查
pnpm typecheck

# 代码格式化
pnpm lint

# 清理缓存
pnpm clean:cache
```text

## 📂 项目结构

```

react-h5-admin/
├── build/              # 构建相关配置
│   ├── cdn.ts         # CDN 配置
│   ├── compress.ts    # 压缩配置
│   ├── info.ts        # 构建信息
│   ├── optimize.ts    # 依赖优化配置
│   ├── plugins.ts     # Vite 插件配置
│   └── utils.ts       # 构建工具函数
├── envs/              # 环境变量配置
│   ├── .env           # 基础环境变量
│   ├── .env.development    # 开发环境
│   ├── .env.production     # 生产环境
│   └── .env.staging        # 测试环境
├── mock/              # Mock 数据
├── public/            # 静态资源
├── src/               # 源代码
│   ├── assets/        # 静态资源
│   ├── components/    # 公共组件
│   ├── hooks/         # 自定义 Hooks
│   ├── pages/         # 页面组件
│   ├── router/        # 路由配置
│   ├── services/      # API 服务
│   ├── store/         # 状态管理
│   ├── styles/        # 全局样式
│   ├── utils/         # 工具函数
│   ├── App.tsx        # 根组件
│   └── main.tsx       # 入口文件
├── types/             # TypeScript 类型定义
├── .eslintrc.js       # ESLint 配置
├── .prettierrc        # Prettier 配置
├── index.html         # HTML 模板
├── package.json       # 项目配置
├── tsconfig.json      # TypeScript 配置
├── uno.config.ts      # UnoCSS 配置
└── vite.config.ts     # Vite 配置

```text

## 🔧 环境变量

项目使用 `envs` 文件夹管理环境变量：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| VITE_PORT | 开发服务器端口 | 3000 |
| VITE_PUBLIC_PATH | 公共路径 | / |
| VITE_ROUTER_HISTORY | 路由模式 (hash/h5) | hash |
| VITE_CDN | 是否使用 CDN | false |
| VITE_COMPRESSION | 压缩方式 | none |
| VITE_HIDE_HOME | 是否隐藏首页 | false |

## 🎨 样式方案

### UnoCSS 原子化 CSS

项目集成了 UnoCSS，提供原子化 CSS 能力：

```jsx
<div className="flex items-center justify-between p-4">
  <button className="btn-primary">按钮</button>
</div>
```text

### PostCSS 移动端适配

使用 `postcss-px-to-viewport` 自动将 px 转换为 vw：

```css
/* 编写时 */
.header {
  height: 88px;
  font-size: 28px;
}

/* 转换后 */
.header {
  height: 11.733vw;
  font-size: 3.733vw;
}
```text

### 1px 边框解决方案

内置 1px 边框解决方案：

```jsx
<div className="border-1px">
  1像素边框
</div>
```text

## 🚀 开发指南

### 路径别名

项目配置了以下路径别名，方便导入：

```typescript
import Component from '@/components/Component'
import { useCustomHook } from '@/hooks/useCustomHook'
import { api } from '@/services/api'
import { utils } from '@/utils'
```text

### 代码检查器

开发环境下，按住组合键可以快速定位代码：
- Mac: `Option + Shift`
- Windows: `Alt + Shift`

### Mock 数据

在 `mock` 文件夹创建 mock 文件：

```typescript
// mock/user.ts
export default [
  {
    url: '/api/user/list',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: []
      }
    }
  }
]
```text

### 状态管理

使用 Zustand 进行状态管理：

```typescript
// store/user.ts
import { create } from 'zustand'

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
```

## 📱 移动端优化

- **视口适配**：自动 px 转 vw
- **安全区域**：支持 iPhone 刘海屏适配
- **触摸优化**：禁用双击缩放，优化触摸反馈
- **性能优化**：路由懒加载，组件按需引入
- **手势支持**：集成 Framer Motion 动画库

## 🔨 构建优化

- **依赖预构建**：优化常用依赖加载速度
- **代码分割**：自动代码分割，按需加载
- **压缩支持**：支持 gzip/brotli 压缩
- **CDN 支持**：生产环境可配置 CDN 加速
- **打包分析**：可视化打包体积分析

## 🤝 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 License

[MIT](LICENSE) © 2025
