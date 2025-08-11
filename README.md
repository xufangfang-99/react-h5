# React H5 Web App

一个基于 React 19 + TypeScript + Vite 的移动端应用...

## 📦 项目结构

```bash
react-h5-monorepo/
├── apps/                     # 应用目录
│   └── h5-web/               # 移动端 H5 应用
├── packages/                 # 共享包目录
│   └── shared-config/        # 通用构建库
├── .husky/                   # Git Hooks
├── .vscode/                  # VS Code 配置
├── eslint.config.js          # ESLint 配置
├── .prettierrc               # Prettier 配置
├── .stylelintrc.json         # Stylelint 配置
├── .commitlintrc.json        # Commitlint 配置
├── package.json              # 根目录配置
├── pnpm-workspace.yaml       # pnpm 工作区配置
└── README.md                 # 本文件
```

## 🚀 快速开始

### 环境要求

- Node.js: ^20.16.0 || >=22.11.0
- pnpm: >=9.0.0

### 安装依赖

````bash
# 克隆项目
git clone https://github.com/xufangfang-99/react-h5.git

# 进入项目目录
cd react-h5

# 安装所有依赖
pnpm install
```text

### 开发命令

```bash
# 启动 H5 应用开发服务器
pnpm dev

# 启动所有应用（如果有多个）
pnpm dev:all

# 构建 H5 应用
pnpm build

# 构建所有项目
pnpm build:all

# 代码检查
pnpm lint

# 类型检查
pnpm typecheck
```css

## 📁 子项目说明

### apps/h5-web

移动端 H5 应用，基于 React 19 + Vite + Ant Design Mobile 构建。

**特性：**

- 🎨 Ant Design Mobile UI 组件库
- 📱 移动端优化（vw 适配、手势支持等）
- ⚡ Vite + SWC 极速开发体验
- 🎪 UnoCSS 原子化 CSS

[查看详细文档](./apps/h5-web/README.md)



### 添加新应用

```bash
# 在 apps 目录下创建新应用
cd apps
pnpm create vite my-app --template react-ts
```text

### 添加新包

```bash
# 在 packages 目录下创建新包
mkdir packages/my-package
cd packages/my-package
pnpm init
```text

### 依赖管理

```bash
# 给根目录添加依赖
pnpm add -D -w eslint

# 给特定应用添加依赖
pnpm --filter @apps/h5-web add axios


```text

### 运行特定项目命令

```bash
# 运行特定应用的命令
pnpm --filter @apps/h5-web dev
pnpm --filter @apps/h5-web build

```bash

## 🔧 配置说明

### pnpm Workspace

`pnpm-workspace.yaml` 定义了 Monorepo 的工作区：

```yaml
packages:
  - "apps/*"
  - "packages/*"
```css

### 代码规范

项目使用统一的代码规范：

- **ESLint**: JavaScript/TypeScript 代码检查
- **Prettier**: 代码格式化
- **Stylelint**: CSS 样式检查
- **Commitlint**: Git 提交信息规范

所有配置文件都在根目录，对所有子项目生效。

### Git Hooks

使用 Husky + lint-staged 自动执行代码检查：

- **pre-commit**: 代码格式检查和修复
- **commit-msg**: 提交信息规范检查
- **pre-push**: TypeScript 类型检查

## 📝 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
# 新功能
git commit -m "feat: 添加用户登录功能"

# 修复问题
git commit -m "fix: 修复移动端滑动问题"

# 文档更新
git commit -m "docs: 更新 README"

# 重大变更
git commit -m "feat!: 重构路由系统

BREAKING CHANGE: 路由配置方式发生变化"
```css

详细规范请查看 [COMMIT_CONVENTION.md](./COMMIT_CONVENTION.md)

## 🚀 部署

### 构建产物

```bash
# 构建所有项目
pnpm build:all

# H5 应用构建产物
apps/h5-web/dist/

```text

### Docker 部署（示例）

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm build:all
# ... 后续部署步骤
````

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交改动 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## 📄 License

[MIT](LICENSE) © 2025

## 🔗 相关链接

- [pnpm Workspace 文档](https://pnpm.io/workspaces)
- [Vite 文档](https://vitejs.dev/)
- [React 文档](https://react.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/)
