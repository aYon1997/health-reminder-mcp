# 在 Cursor 中配置 MCP

## 📋 配置步骤

### 步骤 1: 编译项目

首先确保项目已经编译：

```bash
cd C:\Users\WB-bw0017\Desktop\MyMCP\health
npm install
npm run build
```

### 步骤 2: 找到 Cursor 配置文件

Cursor 的 MCP 配置文件位置：

**Windows:**
```
%APPDATA%\Cursor\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json
```

或者直接在文件资源管理器地址栏输入：
```
%APPDATA%\Cursor\User\globalStorage\saoudrizwan.claude-dev\settings\
```

**如果使用的是标准 MCP 配置（不是 Claude Dev 插件）:**
```
%APPDATA%\Cursor\User\settings.json
```

### 步骤 3: 编辑配置文件

打开配置文件，添加以下内容：

#### 方式 1: 如果是 `cline_mcp_settings.json`

```json
{
  "mcpServers": {
    "health-reminder": {
      "command": "node",
      "args": [
        "C:\\Users\\WB-bw0017\\Desktop\\MyMCP\\health\\dist\\server\\index.js"
      ],
      "disabled": false,
      "alwaysAllow": []
    }
  }
}
```

#### 方式 2: 如果是 Cursor 的 `settings.json`

在 `settings.json` 中添加 MCP 配置：

```json
{
  "mcp": {
    "servers": {
      "health-reminder": {
        "command": "node",
        "args": [
          "C:\\Users\\WB-bw0017\\Desktop\\MyMCP\\health\\dist\\server\\index.js"
        ]
      }
    }
  }
}
```

### 步骤 4: 重启 Cursor

保存配置文件后，重启 Cursor 使配置生效。

### 步骤 5: 验证配置

1. 在 Cursor 中打开命令面板（`Ctrl+Shift+P` 或 `Cmd+Shift+P`）
2. 搜索 "MCP" 相关命令
3. 应该能看到 `health-reminder` 服务

## 🎯 在 Cursor 中使用

### 通过 AI 助手使用

直接在 Cursor 的 AI 对话框中输入：

```
使用 health-reminder MCP，启动每 30 分钟的健康提醒
```

或者：

```
帮我查看 health-reminder 的当前状态
```

### 可用命令示例

**启动提醒：**
```
启动健康提醒，每 45 分钟提醒一次，消息是"该休息了"
```

**停止提醒：**
```
停止健康提醒
```

**查看状态：**
```
查看健康提醒的状态
```

**立即测试：**
```
立即发送一次健康提醒通知
```

## 🔧 故障排除

### 问题 1: 配置文件不存在

如果找不到配置文件，可以手动创建：

1. 打开 Cursor
2. `File` → `Preferences` → `Settings`
3. 点击右上角的 `{}` 图标（打开 JSON 设置）
4. 添加 MCP 配置

### 问题 2: Cursor 无法识别 MCP

确认以下几点：

- ✅ Cursor 版本支持 MCP（建议使用最新版本）
- ✅ 路径使用绝对路径
- ✅ Windows 路径使用双反斜杠 `\\` 或单斜杠 `/`
- ✅ 项目已经成功编译（`dist/server/index.js` 存在）

### 问题 3: Server 启动失败

检查 Server 是否能独立运行：

```bash
cd C:\Users\WB-bw0017\Desktop\MyMCP\health
node dist\server\index.js
```

如果有错误，先解决错误再配置到 Cursor。

### 问题 4: 找不到 node 命令

确保 Node.js 已安装且在 PATH 中。可以使用完整路径：

```json
{
  "command": "C:\\Program Files\\nodejs\\node.exe",
  "args": [
    "C:\\Users\\WB-bw0017\\Desktop\\MyMCP\\health\\dist\\server\\index.js"
  ]
}
```

## 📝 调试技巧

### 1. 查看 Server 日志

Server 会输出日志到标准输出，可以帮助调试：

```bash
# 手动启动 Server 查看日志
npm run server
```

### 2. 测试工具调用

在配置好 MCP 后，可以在 Cursor 中测试：

```
列出 health-reminder 可用的所有工具
```

应该看到 4 个工具：
- start_reminder
- stop_reminder
- get_status
- send_immediate_reminder

### 3. 使用开发模式

修改代码后重新编译：

```bash
npm run build
```

然后在 Cursor 中重新加载 MCP 或重启 Cursor。

## 🎨 高级配置

### 添加环境变量

如果需要传递环境变量：

```json
{
  "mcpServers": {
    "health-reminder": {
      "command": "node",
      "args": [
        "C:\\Users\\WB-bw0017\\Desktop\\MyMCP\\health\\dist\\server\\index.js"
      ],
      "env": {
        "NODE_ENV": "development",
        "DEBUG": "true"
      }
    }
  }
}
```

### 设置工作目录

```json
{
  "mcpServers": {
    "health-reminder": {
      "command": "node",
      "args": ["dist/server/index.js"],
      "cwd": "C:\\Users\\WB-bw0017\\Desktop\\MyMCP\\health"
    }
  }
}
```

## 💡 使用示例对话

### 示例 1: 基础使用

**你：** 启动健康提醒
**AI：** *调用 start_reminder* 已启动健康提醒，每 30 分钟提醒一次。

### 示例 2: 自定义配置

**你：** 启动健康提醒，每小时提醒一次，消息是"已经编程一小时了，该活动一下！"
**AI：** *调用 start_reminder with custom params* 已配置自定义健康提醒。

### 示例 3: 状态查询

**你：** 健康提醒现在是什么状态？
**AI：** *调用 get_status* 当前提醒正在运行中，配置为每 60 分钟提醒一次。

## 🚀 快速测试

配置完成后，在 Cursor AI 对话框中运行：

```
1. 测试 health-reminder MCP 连接
2. 立即发送一次测试通知
3. 如果看到系统通知弹出，说明配置成功！
```

---

**配置成功后，你就可以在 Cursor 中通过 AI 助手控制健康提醒了！** 🎉

