# 健康提醒 MCP 系统

一个基于 Model Context Protocol (MCP) 的健康提醒系统，可以定时弹出系统通知提醒您起身活动，保护健康。

## ✨ 功能特性

- 🔔 **定时提醒**: 每隔指定时间（默认30分钟）弹出系统通知
- ⚙️ **自定义配置**: 支持自定义提醒间隔、消息内容、通知标题和提示音
- 📊 **状态监控**: 实时查看提醒运行状态和配置信息
- 🎯 **即时提醒**: 支持手动触发立即提醒
- 🖥️ **跨平台**: 支持 Windows、macOS 和 Linux 系统通知
- 🔌 **MCP 架构**: 完整的 Client-Server 架构，易于集成和扩展

## 📦 项目结构

```
health-reminder-mcp/
├── src/
│   ├── server/
│   │   └── index.ts          # MCP Server 实现
│   └── client/
│       └── index.ts          # MCP Client 实现
├── package.json              # 项目配置
├── tsconfig.json             # TypeScript 配置
└── README.md                 # 说明文档
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 编译项目

```bash
npm run build
```

### 3. 运行方式

#### 方式一：运行 Client（推荐）

Client 会自动连接到 Server 并提供交互式控制台：

```bash
npm run client
```

#### 方式二：分别运行 Server 和 Client

**终端 1 - 启动 Server:**
```bash
npm run server
```

**终端 2 - 启动 Client:**
```bash
npm run client
```

### 4. 开发模式

```bash
# 启动 Server（开发模式）
npm run dev:server

# 启动 Client（开发模式）
npm run dev:client
```

## 💡 使用说明

### 交互式控制台

启动 Client 后，您将看到以下菜单：

```
╔════════════════════════════════════╗
║     健康提醒 MCP Client 控制台     ║
╠════════════════════════════════════╣
║  1. 启动健康提醒（默认30分钟）     ║
║  2. 启动健康提醒（自定义配置）     ║
║  3. 停止健康提醒                   ║
║  4. 查看当前状态                   ║
║  5. 立即发送提醒                   ║
║  6. 查看可用工具                   ║
║  0. 退出程序                       ║
╚════════════════════════════════════╝
```

### 可用工具（MCP Tools）

MCP Server 提供以下工具：

#### 1. start_reminder
启动健康提醒定时器

**参数：**
- `interval` (number): 提醒间隔时间（分钟），默认 30
- `message` (string): 提醒消息内容
- `title` (string): 通知标题，默认"健康提醒"
- `sound` (boolean): 是否播放提示音，默认 true

#### 2. stop_reminder
停止健康提醒定时器

#### 3. get_status
获取当前健康提醒的状态和配置

#### 4. send_immediate_reminder
立即发送一次健康提醒通知（不影响定时器）

**参数：**
- `message` (string): 提醒消息内容
- `title` (string): 通知标题
- `sound` (boolean): 是否播放提示音

## 📝 使用示例

### 示例 1：使用默认配置（30分钟提醒一次）

1. 运行 `npm run client`
2. 选择选项 `1`
3. 系统将每 30 分钟弹出一次提醒通知

### 示例 2：自定义配置（每小时提醒，自定义消息）

1. 运行 `npm run client`
2. 选择选项 `2`
3. 输入间隔时间：`60`
4. 输入标题：`休息时间`
5. 输入消息：`已经工作一小时了，该休息一下啦！`
6. 选择提示音：`y`

### 示例 3：立即测试通知

1. 运行 `npm run client`
2. 选择选项 `5`
3. 系统将立即弹出一次通知

## ⚙️ 自定义默认配置

支持三种方式自定义默认提醒时间和消息：

### 1. 配置文件（推荐）

编辑项目根目录的 `config.json`：

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

### 2. 环境变量

```bash
set REMINDER_INTERVAL=60
set REMINDER_MESSAGE=该休息了！
npm run server
```

### 3. 调用时传参

在 Cursor 中：`启动健康提醒，每 45 分钟一次`

**配置优先级**：调用参数 > 环境变量 > 配置文件 > 内置默认值

详细配置说明请查看：[配置指南](docs/CONFIGURATION.md) | [配置示例](examples/config-examples.md)

## 🛠️ 技术栈

- **TypeScript**: 类型安全的 JavaScript 超集
- **Node.js**: JavaScript 运行时环境
- **@modelcontextprotocol/sdk**: MCP 官方 SDK
- **node-notifier**: 跨平台系统通知库

## 🔧 配置说明

### 默认配置

```typescript
{
  interval: 30,           // 30分钟
  message: "该起身活动一下了！久坐对健康不利，建议站起来走动走动。",
  title: "健康提醒",
  sound: true            // 开启提示音
}
```

### 自定义配置

您可以通过以下方式自定义配置：

1. **通过交互式菜单**：选择选项 2，按提示输入配置
2. **通过 MCP 工具调用**：使用 `start_reminder` 工具并传入参数

## 📱 系统通知支持

- **Windows 10/11**: 使用原生通知中心
- **macOS**: 使用原生通知中心
- **Linux**: 使用 libnotify (需要安装)

### Linux 安装通知支持

```bash
# Ubuntu/Debian
sudo apt-get install libnotify-bin

# Fedora
sudo dnf install libnotify

# Arch Linux
sudo pacman -S libnotify
```

## 📚 文档

### 部署方式

- **[部署方式指南](docs/DEPLOYMENT_GUIDE.md)** - 了解不同部署方式的区别
- **[发布到 npm](docs/NPM_PUBLISH.md)** - 📦 推荐！像 `chrome-devtools-mcp` 一样分享你的 MCP Server
- **[服务器部署](docs/SERVER_DEPLOYMENT.md)** - 云服务器部署（仅供参考，不推荐用于本项目）

### 使用和配置

- **[Cursor 配置指南](docs/CURSOR_SETUP.md)** - 在 Cursor 中使用 MCP
- **[配置说明](docs/CONFIGURATION.md)** - 详细的配置选项
- **[API 文档](docs/API.md)** - MCP 工具接口文档
- **[使用教程](docs/TUTORIAL.md)** - 完整的使用教程

## 🤝 集成到其他应用

由于使用了 MCP 协议，您可以轻松将此健康提醒系统集成到任何支持 MCP 的应用中：

1. 将 Server 注册到 MCP 配置文件
2. 使用任何 MCP Client 连接
3. 调用提供的工具即可

### 分享给其他人使用

想让其他人也能使用你的健康提醒系统？查看 **[发布到 npm 指南](docs/NPM_PUBLISH.md)**

## 📄 许可证

MIT License

## 🙏 致谢

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [node-notifier](https://github.com/mikaelbr/node-notifier)

## 💪 健康小贴士

- 建议每 30 分钟起身活动 5-10 分钟
- 可以做简单的伸展运动
- 远眺窗外放松眼睛
- 适量饮水，保持身体水分
- 保持良好坐姿，避免长时间低头

---

**祝您使用愉快，身体健康！** 🌟

