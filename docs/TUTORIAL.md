# 使用教程

## 目录

1. [快速入门](#快速入门)
2. [基础使用](#基础使用)
3. [高级配置](#高级配置)
4. [集成到其他应用](#集成到其他应用)
5. [故障排除](#故障排除)

---

## 快速入门

### 第一次使用

#### 步骤 1: 安装依赖

打开终端，进入项目目录：

```bash
cd health-reminder-mcp
npm install
```

#### 步骤 2: 编译项目

```bash
npm run build
```

#### 步骤 3: 启动客户端

```bash
npm run client
```

#### 步骤 4: 开始使用

看到菜单后，按 `1` 然后回车，启动默认的 30 分钟健康提醒。

🎉 完成！现在您每 30 分钟会收到一次健康提醒通知。

---

## 基础使用

### 场景 1: 办公室工作者 - 标准配置

**需求**：每 30 分钟提醒一次，帮助养成起身活动的习惯。

**操作步骤**：

1. 启动客户端：`npm run client`
2. 选择选项 `1`（启动默认提醒）
3. 保持程序运行
4. 每 30 分钟会收到通知

**效果**：
- 标题：健康提醒
- 消息：该起身活动一下了！久坐对健康不利，建议站起来走动走动。
- 提示音：开启

---

### 场景 2: 程序员 - 长时间专注工作

**需求**：更长的提醒间隔（60分钟），专注工作不被频繁打断。

**操作步骤**：

1. 启动客户端：`npm run client`
2. 选择选项 `2`（自定义配置）
3. 按提示输入：
   - 间隔时间：`60`
   - 标题：`编程休息提醒`
   - 消息：`已经编程一小时了！站起来活动一下，保护颈椎和眼睛。`
   - 提示音：`y`

**效果**：每小时提醒一次，消息更贴合程序员的工作场景。

---

### 场景 3: 使用电脑时间不固定

**需求**：随时可以启动和停止提醒。

**操作步骤**：

开始工作时：
1. `npm run client`
2. 选择 `1` 启动提醒

暂时离开时：
1. 选择 `3` 停止提醒
2. 保持程序运行

回来继续工作时：
1. 选择 `1` 重新启动提醒

---

### 场景 4: 测试通知功能

**需求**：确认系统通知是否正常工作。

**操作步骤**：

1. 启动客户端：`npm run client`
2. 选择选项 `5`（立即发送提醒）
3. 应该立即看到通知弹出

如果没有看到通知，请检查：
- 系统通知权限是否开启
- 通知中心设置是否正确
- 是否处于勿扰模式

---

## 高级配置

### 自定义不同时段的提醒

**早晨（9:00-12:00）- 频繁提醒**

```
间隔：20 分钟
标题：早晨健康提醒
消息：早上要多活动，保持精力充沛！
```

**下午（13:00-18:00）- 标准提醒**

```
间隔：30 分钟
标题：下午健康提醒
消息：下午容易困倦，起身活动一下吧！
```

**晚上（19:00-22:00）- 较长间隔**

```
间隔：45 分钟
标题：晚间健康提醒
消息：晚上不要久坐，适当运动有助睡眠。
```

---

### 编程方式使用

如果您想在自己的 Node.js 程序中集成健康提醒功能：

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function setupHealthReminder() {
  const client = new Client({
    name: "my-app",
    version: "1.0.0"
  }, { capabilities: {} });

  const transport = new StdioClientTransport({
    command: "node",
    args: ["path/to/dist/server/index.js"]
  });

  await client.connect(transport);

  // 启动提醒
  await client.callTool({
    name: "start_reminder",
    arguments: {
      interval: 30,
      title: "我的应用 - 健康提醒",
      message: "该休息一下了！"
    }
  });
}

setupHealthReminder();
```

---

### 在 Cursor/VSCode 中使用

将此 MCP Server 添加到 Cursor 或其他支持 MCP 的编辑器：

1. 编辑 MCP 配置文件（通常是 `~/.cursor/mcp_config.json`）

2. 添加配置：

```json
{
  "mcpServers": {
    "health-reminder": {
      "command": "node",
      "args": ["C:/path/to/health-reminder-mcp/dist/server/index.js"]
    }
  }
}
```

3. 重启编辑器

4. 现在可以通过 MCP 命令面板调用健康提醒工具

---

## 集成到其他应用

### 集成到 Electron 应用

```javascript
const { spawn } = require('child_process');

// 启动 MCP Server
const mcpServer = spawn('node', ['path/to/dist/server/index.js']);

// 连接并使用
// ... MCP Client 连接代码
```

### 集成到 Web 应用

虽然 MCP 主要用于桌面环境，但您可以：

1. 将 Server 作为后端服务运行
2. 创建 HTTP API 包装层
3. 前端通过 API 调用健康提醒功能

---

## 故障排除

### 问题 1: 没有收到通知

**可能原因**：
- 系统通知权限未开启
- 处于勿扰模式
- node-notifier 未正确安装

**解决方案**：

1. 检查系统通知设置：
   - **Windows**: 设置 → 系统 → 通知
   - **macOS**: 系统偏好设置 → 通知
   - **Linux**: 确保安装了 `libnotify`

2. 测试通知：
   ```bash
   npm run client
   # 选择选项 5 立即发送测试通知
   ```

3. 重新安装依赖：
   ```bash
   rm -rf node_modules
   npm install
   npm run build
   ```

---

### 问题 2: Client 无法连接到 Server

**症状**：启动 Client 后报连接错误

**解决方案**：

1. 确保已编译：
   ```bash
   npm run build
   ```

2. 检查 `dist/server/index.js` 是否存在

3. 尝试手动启动 Server：
   ```bash
   npm run server
   ```
   如果有错误信息，根据错误提示解决

---

### 问题 3: TypeScript 编译错误

**解决方案**：

1. 确保 TypeScript 版本正确：
   ```bash
   npm install typescript@^5.3.3 --save-dev
   ```

2. 清理并重新编译：
   ```bash
   rm -rf dist
   npm run build
   ```

---

### 问题 4: 提醒间隔不准确

**可能原因**：
- Node.js 定时器在系统睡眠后可能不准确
- 系统负载过高

**说明**：
这是 JavaScript 定时器的固有特性。如果需要更精确的定时，可以考虑：
- 使用系统级任务调度（如 cron）
- 添加时间校准逻辑

---

### 问题 5: 通知显示乱码（Linux）

**解决方案**：

确保系统支持 UTF-8 编码：

```bash
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
```

---

## 常见问题 FAQ

**Q: 可以同时运行多个不同间隔的提醒吗？**

A: 当前版本只支持一个活动的提醒。如需多个提醒，可以启动多个 Server 实例。

**Q: 关闭终端窗口后提醒还会继续吗？**

A: 不会。关闭终端会终止程序。如需后台运行，可以使用 `pm2` 或系统服务。

**Q: 提醒消息可以包含 Emoji 吗？**

A: 可以！例如：
```
消息：💪 该起身活动了！保持健康！🏃‍♂️
```

**Q: 如何设置开机自动启动？**

A: 可以将启动命令添加到系统的开机启动项中。具体方法取决于操作系统。

**Windows**: 创建快捷方式放到启动文件夹
**macOS**: 使用 launchd
**Linux**: 使用 systemd service

---

## 获取帮助

如有问题或建议，请：

1. 查看项目 README.md
2. 查看 API 文档（docs/API.md）
3. 检查 GitHub Issues
4. 提交新的 Issue

---

**祝您使用愉快！记得照顾好自己的健康！** 💚

