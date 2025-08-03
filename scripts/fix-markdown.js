#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// 定义代码块语言映射
const languageMap = {
  'bash': ['sh', 'shell', 'zsh'],
  'javascript': ['js', 'node'],
  'typescript': ['ts'],
  'json': ['jsonc'],
  'yaml': ['yml'],
  'text': ['txt', 'plain', '']
};

// 获取合适的语言标识
function getLanguage(content) {
  // 根据内容判断语言
  if (content.includes('#!/usr/bin/env') || content.includes('npm ') || content.includes('pnpm ') || content.includes('yarn ')) {
    return 'bash';
  }
  if (content.includes('import ') || content.includes('export ') || content.includes('const ') || content.includes('function ')) {
    if (content.includes(': ') && (content.includes('string') || content.includes('number') || content.includes('boolean'))) {
      return 'typescript';
    }
    return 'javascript';
  }
  if (content.trim().startsWith('{') || content.trim().startsWith('[')) {
    return 'json';
  }
  if (content.includes('<!DOCTYPE') || content.includes('<html')) {
    return 'html';
  }
  if (content.includes('.') && (content.includes('{') || content.includes('#') || content.includes('@'))) {
    return 'css';
  }
  if (content.includes('├──') || content.includes('└──') || content.includes('│')) {
    return 'text';
  }
  return 'text';
}

// 修复 Markdown 文件
function fixMarkdownFile(filePath) {
  console.log(`修复文件: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 修复没有语言标识的代码块
  content = content.replace(/```\n([\s\S]*?)```/g, (match, code) => {
    const language = getLanguage(code);
    modified = true;
    return `\`\`\`${language}\n${code}\`\`\``;
  });

  // 修复表格格式
  const lines = content.split('\n');
  let inTable = false;
  const newLines = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // 检测表格
    if (line.includes('|') && line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (!inTable && i + 1 < lines.length && lines[i + 1].includes('|') && lines[i + 1].includes('-')) {
        inTable = true;
      }
      
      if (inTable) {
        // 格式化表格行
        const cells = line.split('|').map(cell => cell.trim());
        line = '| ' + cells.slice(1, -1).join(' | ') + ' |';
        modified = true;
      }
    } else if (inTable && !line.includes('|')) {
      inTable = false;
    }
    
    newLines.push(line);
  }

  if (modified) {
    content = newLines.join('\n');
    
    // 确保文件末尾有换行
    if (!content.endsWith('\n')) {
      content += '\n';
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ 已修复: ${filePath}`);
  } else {
    console.log(`✓ 无需修复: ${filePath}`);
  }
}

// 主函数
async function main() {
  const markdownFiles = await glob('**/*.md', {
    ignore: ['node_modules/**', 'dist/**', '.git/**']
  });

  console.log(`找到 ${markdownFiles.length} 个 Markdown 文件\n`);

  markdownFiles.forEach(file => {
    fixMarkdownFile(file);
  });

  console.log('\n✨ 所有 Markdown 文件已处理完成！');
}

// 执行
main().catch(console.error);