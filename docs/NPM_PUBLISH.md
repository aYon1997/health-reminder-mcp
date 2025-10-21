# 发布到 npm 市场指南

本文档介绍如何将健康提醒 MCP Server 发布到 npm，让全世界的用户都可以通过 `npx` 直接使用。

## 📖 什么是 npm 发布？

**发布到 npm** 就像把你的项目上传到一个公共仓库，其他人可以通过包名直接使用，而不需要下载源代码。

### 本地使用 vs npm 发布

| 特性 | 本地使用 | npm 发布 |
|-----|---------|---------|
| **配置方式** | `node C:\\本地路径\\index.js` | `npx your-package-name` |
| **是否需要源码** | ✅ 需要下载完整项目 | ❌ 不需要 |
| **分发方式** | 手动分享代码 | 任何人都能用 |
| **更新方式** | 手动更新代码 | 自动获取最新版 |
| **使用范围** | 仅限本机 | 全球可用 |
| **示例** | 你的 `joke` 服务器 | `chrome-devtools-mcp` |

### 真实对比

**本地部署（现在）：**
```json
"health-reminder": {
  "command": "node",
  "args": ["C:\\Users\\WB-bw0017\\Desktop\\MyMCP\\health\\dist\\server\\index.js"]
}
```

**npm 发布后（未来）：**
```json
"health-reminder": {
  "command": "npx",
  "args": ["-y", "health-reminder-mcp@latest"]
}
```

---

## 🎯 发布前的准备

### 1. 确保项目可以正常运行

```bash
# 安装依赖
npm install

# 编译项目
npm run build

# 测试运行
npm run server
```

### 2. 完善 package.json

打开 `package.json`，确保包含以下关键信息：

```json
{
  "name": "health-reminder-mcp",
  "version": "1.0.0",
  "description": "基于 MCP 的健康提醒系统，定时弹出通知提醒您休息",
  "keywords": [
    "mcp",
    "mcp-server",
    "health",
    "reminder",
    "notification",
    "cursor",
    "model-context-protocol"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/health-reminder-mcp.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/health-reminder-mcp/issues"
  },
  "homepage": "https://github.com/yourusername/health-reminder-mcp#readme",
  "main": "dist/server/index.js",
  "bin": {
    "health-reminder-mcp": "dist/server/index.js"
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE",
    "package.json"
  ],
  "scripts": {
    "build": "tsc",
    "server": "node dist/server/index.js",
    "prepublishOnly": "npm run build"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.4",
    "node-notifier": "^10.0.1"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "typescript": "^5.3.3"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### 3. 检查入口文件

确保 `dist/server/index.js` 第一行有 shebang：

```javascript
#!/usr/bin/env node

// ... 你的代码
```

如果没有，需要在 TypeScript 源文件 `src/server/index.ts` 开头添加，编译后会保留。

### 4. 创建 .npmignore 文件

```bash
# 在项目根目录创建 .npmignore
```

内容示例：

```
# 源代码（只发布编译后的代码）
src/
*.ts
!*.d.ts

# 开发文件
tsconfig.json
.vscode/
.cursor/

# 测试文件
test/
tests/
*.test.js
*.spec.js

# 构建文件
node_modules/
.git/
.gitignore

# 临时文件
*.log
npm-debug.log*
.DS_Store
Thumbs.db

# 配置文件
.env
.env.*
config.json
!config.example.json

# 脚本
*.bat
*.sh

# 文档草稿
docs/drafts/
```

### 5. 创建 README.md

确保有一个清晰的 README，包含：
- 项目介绍
- 安装方法
- 使用示例
- 配置说明

参考你现有的 `README.md` 即可。

---

## 🚀 发布到 npm

### 步骤 1：注册 npm 账号

如果还没有 npm 账号：

1. 访问 [https://www.npmjs.com/](https://www.npmjs.com/)
2. 点击 "Sign Up" 注册账号
3. 验证邮箱

### 步骤 2：登录 npm

```bash
# 在项目根目录打开终端
npm login

# 输入用户名
Username: your-username

# 输入密码（不会显示）
Password: 

# 输入邮箱
Email: your.email@example.com

# 如果启用了 2FA，输入验证码
Enter one-time password: 123456
```

验证登录状态：

```bash
npm whoami
```

### 步骤 3：检查包名是否可用

```bash
# 检查包名是否已被占用
npm search health-reminder-mcp

# 或者直接访问
# https://www.npmjs.com/package/health-reminder-mcp
```

如果已被占用，需要修改 `package.json` 中的 `name` 字段。

### 步骤 4：最后检查

```bash
# 确保编译成功
npm run build

# 检查将要发布的文件
npm pack --dry-run

# 查看详细信息
npm publish --dry-run
```

### 步骤 5：发布！

```bash
# 发布到 npm
npm publish

# 如果是 scoped package（@username/package-name）
npm publish --access public
```

发布成功后会看到类似输出：

```
+ health-reminder-mcp@1.0.0
```

### 步骤 6：验证发布

访问你的包页面：
```
https://www.npmjs.com/package/health-reminder-mcp
```

或者直接测试安装：

```bash
# 在其他目录测试
npx health-reminder-mcp@latest
```

---

## 📦 使用已发布的包

发布成功后，其他用户可以这样使用：

### 在 Cursor 中配置

编辑 `mcp.json`：

```json
{
  "mcpServers": {
    "health-reminder": {
      "command": "npx",
      "args": [
        "-y",
        "health-reminder-mcp@latest"
      ],
      "env": {
        "REMINDER_INTERVAL": "30",
        "REMINDER_MESSAGE": "该起身活动一下了！",
        "REMINDER_TITLE": "健康提醒",
        "REMINDER_SOUND": "true"
      }
    }
  }
}
```

### 直接运行

```bash
# 使用最新版本
npx health-reminder-mcp@latest

# 使用特定版本
npx health-reminder-mcp@1.0.0

# 不使用缓存，强制下载最新版
npx --yes health-reminder-mcp@latest
```

---

## 🔄 版本管理

### 语义化版本（Semantic Versioning）

版本号格式：`主版本.次版本.修订号` (MAJOR.MINOR.PATCH)

- **MAJOR**: 不兼容的 API 修改 (1.0.0 → 2.0.0)
- **MINOR**: 新增功能，向下兼容 (1.0.0 → 1.1.0)
- **PATCH**: 问题修复，向下兼容 (1.0.0 → 1.0.1)

### 更新版本

```bash
# 修复 bug（1.0.0 -> 1.0.1）
npm version patch

# 新增功能（1.0.0 -> 1.1.0）
npm version minor

# 重大更新（1.0.0 -> 2.0.0）
npm version major

# 手动指定版本
npm version 1.2.3
```

### 发布新版本

```bash
# 1. 更新代码
# 2. 编译
npm run build

# 3. 更新版本号
npm version patch

# 4. 发布
npm publish

# 5. 推送 git tag（如果使用 git）
git push --tags
```

### 版本标签

```bash
# 发布 beta 版本
npm version 1.1.0-beta.1
npm publish --tag beta

# 用户安装 beta 版
npx health-reminder-mcp@beta

# 发布 next 版本
npm publish --tag next
```

---

## 🏷️ 发布选项

### 发布到特定范围（Scoped Package）

如果你想用自己的命名空间：

```json
{
  "name": "@your-username/health-reminder-mcp"
}
```

发布时：

```bash
npm publish --access public
```

使用时：

```bash
npx @your-username/health-reminder-mcp
```

### 私有包（付费功能）

```bash
# 发布私有包（需要 npm 付费账号）
npm publish --access restricted
```

---

## 📊 包管理

### 查看包信息

```bash
# 查看包的详细信息
npm view health-reminder-mcp

# 查看所有版本
npm view health-reminder-mcp versions

# 查看最新版本
npm view health-reminder-mcp version

# 查看下载统计
npm view health-reminder-mcp downloads
```

### 废弃版本

```bash
# 废弃特定版本
npm deprecate health-reminder-mcp@1.0.0 "请使用 1.0.1 或更高版本"

# 废弃所有版本
npm deprecate health-reminder-mcp "此包已不再维护"
```

### 删除包（谨慎！）

```bash
# 删除特定版本（发布后 72 小时内）
npm unpublish health-reminder-mcp@1.0.0

# 删除整个包（发布后 72 小时内，且无依赖）
npm unpublish health-reminder-mcp --force
```

⚠️ **注意**：删除包会影响依赖它的所有用户，除非必要否则不建议删除。

---

## 🎨 优化发布体验

### 1. 添加 .npmrc 配置

在项目根目录创建 `.npmrc`：

```
package-lock=true
save-exact=true
```

### 2. 使用 GitHub Actions 自动发布

创建 `.github/workflows/publish.yml`：

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 3. 添加发布前检查

在 `package.json` 添加：

```json
{
  "scripts": {
    "prepublishOnly": "npm run build && npm test",
    "postpublish": "git push --tags"
  }
}
```

---

## 📈 推广你的包

### 1. 添加到 MCP 官方列表

访问 [MCP Servers Registry](https://github.com/modelcontextprotocol/servers) 提交 PR。

### 2. 完善 npm 页面

- 添加详细的 README
- 提供使用示例
- 添加 badges（版本、下载量、License）

README 顶部添加 badges：

```markdown
# health-reminder-mcp

[![npm version](https://badge.fury.io/js/health-reminder-mcp.svg)](https://www.npmjs.com/package/health-reminder-mcp)
[![downloads](https://img.shields.io/npm/dm/health-reminder-mcp.svg)](https://www.npmjs.com/package/health-reminder-mcp)
[![license](https://img.shields.io/npm/l/health-reminder-mcp.svg)](https://github.com/yourusername/health-reminder-mcp/blob/main/LICENSE)
```

### 3. 社交媒体分享

- 在 Twitter/X 上分享
- 在 Reddit r/cursor 或 r/node 发帖
- 在 Discord/Slack 社区宣传

### 4. 创建示例和教程

- 录制使用视频
- 写博客文章
- 创建 YouTube 教程

---

## 🔍 常见问题

### 1. 包名已被占用怎么办？

修改 `package.json` 中的 `name`，可以考虑：
- `mcp-health-reminder`
- `cursor-health-reminder`
- `@your-username/health-reminder`

### 2. 发布失败：403 Forbidden

可能原因：
- 包名已被占用
- 没有权限（scoped package 需要 `--access public`）
- 没有验证邮箱

### 3. 其他人使用时找不到命令

确保 `package.json` 中有 `bin` 字段，并且文件有 shebang：

```json
{
  "bin": {
    "health-reminder-mcp": "dist/server/index.js"
  }
}
```

```javascript
#!/usr/bin/env node
```

### 4. 更新后用户看不到新版本

用户需要：
```bash
# 清除 npx 缓存
npx clear-npx-cache

# 或强制使用最新版
npx --yes health-reminder-mcp@latest
```

### 5. 发布的包太大

检查 `.npmignore`，确保没有包含不必要的文件：
```bash
npm pack --dry-run
```

---

## 📋 发布检查清单

发布前确保：

- [ ] `package.json` 信息完整（name, version, description, keywords, author, license）
- [ ] README.md 清晰详细
- [ ] LICENSE 文件存在
- [ ] `.npmignore` 配置正确
- [ ] 代码已编译 (`npm run build`)
- [ ] 本地测试通过
- [ ] 包名可用（未被占用）
- [ ] 已登录 npm (`npm whoami`)
- [ ] Git 代码已提交
- [ ] 版本号符合语义化规范

---

## 🎯 完整发布流程示例

```bash
# 1. 确保代码最新
git pull

# 2. 安装依赖
npm install

# 3. 编译代码
npm run build

# 4. 本地测试
npm run server

# 5. 检查包名
npm search health-reminder-mcp

# 6. 登录 npm（如果未登录）
npm login

# 7. 模拟发布
npm publish --dry-run

# 8. 正式发布
npm publish

# 9. 验证
npx health-reminder-mcp@latest

# 10. 提交 git
git add .
git commit -m "chore: publish v1.0.0"
git push

# 11. 创建 git tag
git tag v1.0.0
git push --tags
```

---

## 🌟 最佳实践

### 1. 遵循语义化版本

严格按照 MAJOR.MINOR.PATCH 规范。

### 2. 编写 CHANGELOG

每次发布记录更新内容：

```markdown
## [1.1.0] - 2024-01-15

### Added
- 支持自定义提醒音效
- 新增静音模式

### Fixed
- 修复 Windows 通知不显示的问题

### Changed
- 优化通知显示逻辑
```

### 3. 保持向后兼容

除非是 MAJOR 版本更新，否则不要破坏现有 API。

### 4. 提供迁移指南

如果有破坏性更新，提供详细的迁移文档。

### 5. 及时响应 Issues

在 GitHub Issues 中回答用户问题。

---

## 📚 相关资源

- [npm 官方文档](https://docs.npmjs.com/)
- [语义化版本规范](https://semver.org/lang/zh-CN/)
- [MCP 官方文档](https://modelcontextprotocol.io/)
- [MCP Servers Registry](https://github.com/modelcontextprotocol/servers)
- [如何编写好的 README](https://github.com/matiassingers/awesome-readme)

---

## 📞 需要帮助？

- npm 官方支持：https://www.npmjs.com/support
- MCP Discord：https://discord.gg/modelcontextprotocol
- GitHub Issues：提交到你的项目仓库

---

**祝你的 MCP Server 成为爆款！** 🚀🎉

