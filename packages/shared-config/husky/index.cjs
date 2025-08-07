const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

/**
 * 初始化 Husky 配置
 */
function initHusky(projectRoot = process.cwd(), options = {}) {
  const {
    skipInstall = false,
    hooks = ["pre-commit", "commit-msg", "pre-push"],
  } = options;

  console.log("🚀 初始化 Husky 配置...");

  try {
    // 1. 确保 husky 已安装
    if (!skipInstall) {
      console.log("📦 安装 Husky...");
      execSync("npx husky install", {
        cwd: projectRoot,
        stdio: "inherit",
      });
    }

    // 2. 创建 .husky 目录
    const huskyDir = path.join(projectRoot, ".husky");
    if (!fs.existsSync(huskyDir)) {
      fs.mkdirSync(huskyDir, { recursive: true });
    }

    // 3. 复制 hook 文件
    const hooksSourceDir = path.join(__dirname, "hooks");

    hooks.forEach((hookName) => {
      const sourcePath = path.join(hooksSourceDir, hookName);
      const targetPath = path.join(huskyDir, hookName);

      if (fs.existsSync(sourcePath)) {
        console.log(`📝 创建 ${hookName} hook...`);
        const content = fs.readFileSync(sourcePath, "utf8");
        fs.writeFileSync(targetPath, content);

        // 设置执行权限
        fs.chmodSync(targetPath, "755");
      } else {
        console.warn(`⚠️  ${hookName} hook 模板不存在`);
      }
    });

    console.log("✅ Husky 配置完成！");
  } catch (error) {
    console.error("❌ Husky 配置失败:", error.message);
    process.exit(1);
  }
}

/**
 * 清理 Husky 配置
 */
function cleanHusky(projectRoot = process.cwd()) {
  console.log("🧹 清理 Husky 配置...");

  const huskyDir = path.join(projectRoot, ".husky");

  if (fs.existsSync(huskyDir)) {
    fs.rmSync(huskyDir, { recursive: true, force: true });
  }

  console.log("✅ 清理完成！");
}

// CommonJS 导出方式
module.exports = {
  initHusky,
  cleanHusky,
};
