#!/usr/bin/env node

// CommonJS 格式 - 使用 require 而不是 import
const { program } = require("commander");
// 删除这行，因为没有使用 path
// const path = require('path');

// 注意这里引入的是 .cjs 文件
const { initHusky, cleanHusky } = require("../husky/index.cjs");

// 读取 package.json 获取版本号
const packageJson = require("../package.json");

program.version(packageJson.version).description("共享配置管理工具");

program
  .command("husky:init")
  .description("初始化 Husky 配置")
  .option("-s, --skip-install", "跳过 husky 安装")
  .option("-h, --hooks <hooks...>", "指定要安装的 hooks", [
    "pre-commit",
    "commit-msg",
    "pre-push",
  ])
  .action((options) => {
    initHusky(process.cwd(), options);
  });

program
  .command("husky:clean")
  .description("清理 Husky 配置")
  .action(() => {
    cleanHusky(process.cwd());
  });

program.parse(process.argv);
