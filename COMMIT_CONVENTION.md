# Git 提交规范

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范，并通过 `husky` + `lint-staged` + `commitlint` 强制执行。

## 提交格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type（必需）

提交类型必须是以下之一：

- **feat**: 新功能
- **fix**: 修复 Bug
- **docs**: 文档变更
- **style**: 代码格式（不影响功能，例如空格、分号等格式修正）
- **refactor**: 代码重构（不包括 bug 修复、功能新增）
- **perf**: 性能优化
- **test**: 添加或修改测试
- **build**: 构建系统或外部依赖变更
- **ci**: 修改 CI 配置、脚本
- **chore**: 其他不修改源代码与测试代码的变更
- **revert**: 回滚某个更早之前的提交

### Scope（可选）

用于说明 commit 影响的范围，比如：`router`、`component`、`utils`、`build` 等。

### Subject（必需）

简短描述，不超过 50 个字符。

### Body（可选）

详细描述，说明代码变动的动机等。

### Footer（可选）

- 不兼容变动：以 `BREAKING CHANGE:` 开头
- 关闭 Issue：`Closes #123`

## 示例

### 新功能

```bash
git commit -m "feat(auth): 添加用户登录功能"
```

### 修复 Bug

```bash
git commit -m "fix(utils): 修复日期格式化在 Safari 下的兼容性问题"
```

### 文档更新

```bash
git commit -m "docs: 更新 README 中的安装说明"
```

### 代码格式化

```bash
git commit -m "style: 格式化所有 TypeScript 文件"
```

### 重构

```bash
git commit -m "refactor(api): 重构 API 请求模块，使用 axios 拦截器"
```

### 性能优化

```bash
git commit -m "perf(components): 优化长列表滚动性能"
```

### 构建相关

```bash
git commit -m "build: 升级 vite 到 v7.0.6"
```

### 包含详细说明的提交

```bash
git commit -m "feat(user): 添加用户头像上传功能

- 支持 jpg、png、gif 格式
- 最大支持 5MB 文件
- 自动压缩大于 1MB 的图片

Closes #42"
```

## Git Hooks 说明

### pre-commit

在提交前运行，执行以下检查：

1. **ESLint**: 检查并修复 JavaScript/TypeScript 代码
2. **Prettier**: 格式化所有代码文件
3. **Stylelint**: 检查并修复 CSS/SCSS 样式

如果有错误，提交会被阻止。

### commit-msg

检查提交信息是否符合规范，不符合规范的提交会被拒绝。

### pre-push

在推送前运行 TypeScript 类型检查，确保没有类型错误。

## 跳过 Hooks（紧急情况使用）

在紧急情况下，可以使用 `--no-verify` 跳过 hooks：

```bash
# 跳过 pre-commit 和 commit-msg
git commit -m "fix: 紧急修复" --no-verify

# 跳过 pre-push
git push --no-verify
```

⚠️ **警告**: 请谨慎使用，确保代码质量！

## 常见问题

### 1. husky 没有触发

```bash
# 重新安装 husky
pnpm prepare
```

### 2. lint-staged 运行失败

```bash
# 手动运行检查
pnpm lint:eslint
pnpm lint:prettier
pnpm lint:stylelint
```

### 3. 提交信息被拒绝

确保提交信息符合规范：

- type 必须是规定的类型之一
- subject 不能为空
- 不要在 subject 末尾加句号
