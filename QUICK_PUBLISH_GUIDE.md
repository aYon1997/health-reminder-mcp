# ⚡ 快速发布指南

3 步完成发布！

## 📝 步骤 1: 修改个人信息

打开 `package.json`，修改这几行：

```json
"author": "你的名字 <你的邮箱>",
"repository": {
  "url": "https://github.com/你的用户名/health-reminder-mcp.git"
},
"bugs": {
  "url": "https://github.com/你的用户名/health-reminder-mcp/issues"
},
"homepage": "https://github.com/你的用户名/health-reminder-mcp#readme"
```

## 🔐 步骤 2: 登录 npm

```bash
npm login
```

输入你的 npm 用户名、密码、邮箱。

## 🚀 步骤 3: 发布

```bash
npm publish
```

完成！🎉

---

## 📦 发布后使用

其他人可以这样使用：

```json
{
  "mcpServers": {
    "health-reminder": {
      "command": "npx",
      "args": ["-y", "health-reminder-mcp@latest"]
    }
  }
}
```

---

## 🔄 更新版本

```bash
# 修复 bug
npm version patch && npm publish

# 新增功能
npm version minor && npm publish

# 重大更新
npm version major && npm publish
```

---

就这么简单！💪




