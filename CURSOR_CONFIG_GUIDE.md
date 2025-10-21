# Cursor 配置时间指南

## 🎯 在 Cursor 中自定义提醒时间

有两种方式在 Cursor MCP 配置中设置默认提醒时间：

---

## 方式 1: 使用环境变量（推荐）⭐

在 Cursor MCP 配置中添加 `env` 字段：

```json
{
  "mcpServers": {
    "health-reminder": {
      "command": "node",
      "args": [
        "C:\\Users\\WB-bw0017\\Desktop\\MyMCP\\health\\dist\\server\\index.js"
      ],
      "env": {
        "REMINDER_INTERVAL": "45",
        "REMINDER_MESSAGE": "已经 45 分钟了，该休息了！",
        "REMINDER_TITLE": "工作提醒",
        "REMINDER_SOUND": "true"
      }
    }
  }
}
```

### 环境变量说明

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `REMINDER_INTERVAL` | 提醒间隔（分钟） | "30", "45", "60" |
| `REMINDER_MESSAGE` | 提醒消息内容 | "该休息了！" |
| `REMINDER_TITLE` | 通知标题 | "工作提醒" |
| `REMINDER_SOUND` | 是否播放声音 | "true", "false" |

---

## 方式 2: 修改 config.json

编辑项目根目录的 `config.json` 文件：

```json
{
  "reminder": {
    "interval": 45,
    "message": "已经 45 分钟了，该休息了！",
    "title": "工作提醒",
    "sound": true
  }
}
```

修改后需要重新编译：
```bash
npm run build
```

---

## 📝 常用时间配置

### 番茄工作法（25 分钟）

```json
"env": {
  "REMINDER_INTERVAL": "25",
  "REMINDER_MESSAGE": "🍅 番茄时间到！休息 5 分钟吧！",
  "REMINDER_TITLE": "番茄钟"
}
```

### 标准办公（30 分钟）

```json
"env": {
  "REMINDER_INTERVAL": "30",
  "REMINDER_MESSAGE": "该起身活动一下了！💪",
  "REMINDER_TITLE": "健康提醒"
}
```

### 学习模式（45 分钟）

```json
"env": {
  "REMINDER_INTERVAL": "45",
  "REMINDER_MESSAGE": "学习 45 分钟了！📚 该休息一下了。",
  "REMINDER_TITLE": "学习提醒"
}
```

### 深度工作（60 分钟）

```json
"env": {
  "REMINDER_INTERVAL": "60",
  "REMINDER_MESSAGE": "已经专注一小时了！👨‍💻 该活动一下～",
  "REMINDER_TITLE": "编程提醒"
}
```

### 静音模式

```json
"env": {
  "REMINDER_INTERVAL": "30",
  "REMINDER_MESSAGE": "温馨提示：该活动一下了",
  "REMINDER_TITLE": "提醒",
  "REMINDER_SOUND": "false"
}
```

---

## 🔧 完整配置步骤

### 1. 找到 Cursor MCP 配置文件

**Windows:**
```
%APPDATA%\Cursor\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json
```

或者在 Cursor 中：
- 按 `Ctrl+Shift+P`
- 输入 "Preferences: Open User Settings (JSON)"

### 2. 添加或修改配置

使用 `cursor-config.json` 的内容，或参考 `cursor-config-examples.json` 中的示例。

### 3. 修改路径

将路径改为你的实际路径：
```json
"args": [
  "你的实际路径\\dist\\server\\index.js"
]
```

### 4. 自定义时间

修改 `env` 中的 `REMINDER_INTERVAL` 值（单位：分钟）。

### 5. 重启 Cursor

完全关闭并重新打开 Cursor。

---

## ✅ 验证配置

启动后，Server 会显示当前配置：

```
✓ 检测到环境变量配置
=================================
   健康提醒 MCP Server 启动中...
=================================

📋 当前默认配置:
  • 间隔时间: 45 分钟
  • 标题: 工作提醒
  • 消息: 已经 45 分钟了...
  • 提示音: 开启
```

---

## 📁 配置文件位置

- **当前配置**: `cursor-config.json`
- **配置示例**: `cursor-config-examples.json`（包含 5+ 种场景）
- **项目配置**: `config.json`

---

## 💡 配置优先级

```
环境变量(Cursor env) > 项目 config.json > 内置默认值
```

如果在 Cursor 配置中设置了 `env`，它会覆盖 `config.json` 的配置。

---

## 🎯 快速示例

想要每 20 分钟提醒一次？

```json
{
  "mcpServers": {
    "health-reminder": {
      "command": "node",
      "args": ["你的路径\\dist\\server\\index.js"],
      "env": {
        "REMINDER_INTERVAL": "20"
      }
    }
  }
}
```

只设置间隔时间，其他保持默认！

---

**现在你可以在 Cursor 中完全控制提醒时间了！** 🎉

