# 在 Cursor 中配置 MCP - 完整指南

## ⚠️ 重要：Cursor 的 MCP 支持情况

### 检查 Cursor 版本

Cursor 对 MCP 的支持可能取决于版本和配置。请确认：

1. **Cursor 版本**: 确保使用最新版本（0.40+ 推荐）
2. **扩展支持**: 可能需要安装 **Claude Dev** 或其他 MCP 扩展

## 🎯 配置方法

### 方法 1: 使用 Cursor 原生 MCP 支持（推荐）

#### 步骤 1: 打开设置

1. 在 Cursor 中按 `Ctrl+,` 打开设置
2. 点击右上角的 `{}` 图标（打开 settings.json）

#### 步骤 2: 添加 MCP 配置

在 `settings.json` 中添加：

```json
{
  "mcpServers": {
    "health-reminder": {
      "command": "node",
      "args": [
        "C:\\Users\\WB-bw0017\\Desktop\\MyMCP\\health\\dist\\server\\index.js"
      ]
    }
  }
}
```

**注意**: 路径必须使用**绝对路径**，并使用双反斜杠 `\\` 或单斜杠 `/`。

#### 步骤 3: 重启 Cursor

完全关闭 Cursor，然后重新打开。

---

### 方法 2: 使用 Claude Dev 扩展

#### 步骤 1: 安装 Claude Dev

1. 在 Cursor 扩展市场搜索 "Claude Dev"
2. 安装并启用

#### 步骤 2: 配置 MCP Server

1. 按 `Win+R`，输入并回车：
   ```
   %APPDATA%\Cursor\User\globalStorage\saoudrizwan.claude-dev\settings
   ```

2. 在该目录下找到或创建 `cline_mcp_settings.json`

3. 添加以下内容：
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

4. 保存并重启 Cursor

---

### 方法 3: 使用项目级配置（推荐用于调试）

在项目根目录创建 `.cursor/mcp_settings.json`:

```json
{
  "mcpServers": {
    "health-reminder": {
      "command": "node",
      "args": [
        "${workspaceFolder}/dist/server/index.js"
      ],
      "cwd": "${workspaceFolder}"
    }
  }
}
```

---

## 🧪 测试配置

### 1. 运行测试脚本

```bash
test-mcp.bat
```

这会检查：
- ✅ Node.js 是否安装
- ✅ 编译文件是否存在
- ✅ Server 能否正常启动
- ✅ 显示配置路径

### 2. 手动测试 Server

```bash
node dist\server\index.js
```

应该看到：
```
=================================
   健康提醒 MCP Server 启动中...
=================================
✓ MCP Server 已就绪
✓ 支持的工具:
  - start_reminder: 启动健康提醒
  ...
```

### 3. 在 Cursor 中验证

#### 如果使用 Claude Dev:
1. 打开 Claude Dev 面板
2. 点击设置图标
3. 查看 "MCP Servers" 部分
4. 应该能看到 `health-reminder` 并显示为 "Connected" 或 "Ready"

#### 如果使用 Cursor AI:
在 AI 对话框中输入：
```
列出可用的 MCP 工具
```
或者
```
使用 health-reminder 工具立即发送一次测试通知
```

---

## 🔍 故障排除

### 问题 1: "找不到任何 MCP Server"

**可能原因**:
1. Cursor 版本不支持 MCP
2. 配置路径错误
3. 配置文件格式错误
4. 需要安装 MCP 扩展

**解决方案**:

**检查 1: 验证 Cursor 版本**
```
Help → About
```
确保版本 >= 0.40

**检查 2: 验证路径**
```bash
# 在项目目录运行
echo %CD%\dist\server\index.js
```
复制输出的路径到配置文件中

**检查 3: 检查 JSON 格式**
使用在线 JSON 验证器检查配置文件是否有语法错误

**检查 4: 尝试相对路径**
```json
{
  "mcpServers": {
    "health-reminder": {
      "command": "node",
      "args": ["./dist/server/index.js"],
      "cwd": "C:\\Users\\WB-bw0017\\Desktop\\MyMCP\\health"
    }
  }
}
```

### 问题 2: Server 连接失败

**解决方案**:

1. **检查 Node.js 路径**
   ```bash
   where node
   ```
   如果有多个 Node.js 安装，使用完整路径：
   ```json
   {
     "command": "C:\\Program Files\\nodejs\\node.exe"
   }
   ```

2. **添加超时配置**
   ```json
   {
     "mcpServers": {
       "health-reminder": {
         "command": "node",
         "args": ["..."],
         "timeout": 60000
       }
     }
   }
   ```

3. **检查权限**
   确保 Cursor 有权限执行 node 命令

### 问题 3: Cursor 没有 MCP 功能

**解决方案**:

如果 Cursor 确实不支持 MCP，可以使用以下替代方案：

#### 方案 A: 使用独立 Client
```bash
npm run client
```
在终端中使用交互式界面

#### 方案 B: 使用 VSCode + MCP 扩展
VSCode 有多个 MCP 扩展支持

#### 方案 C: 集成到其他工具
参考 `examples/programmatic-client.ts` 集成到其他应用

---

## 📋 配置文件示例

### 完整的 Cursor settings.json 示例

```json
{
  // ... 其他 Cursor 设置 ...
  
  "mcpServers": {
    "health-reminder": {
      "command": "node",
      "args": [
        "C:\\Users\\WB-bw0017\\Desktop\\MyMCP\\health\\dist\\server\\index.js"
      ],
      "disabled": false,
      "env": {
        "NODE_ENV": "production"
      },
      "timeout": 60000
    }
  },
  
  // ... 其他设置 ...
}
```

### Claude Dev cline_mcp_settings.json 示例

```json
{
  "mcpServers": {
    "health-reminder": {
      "command": "node",
      "args": [
        "C:\\Users\\WB-bw0017\\Desktop\\MyMCP\\health\\dist\\server\\index.js"
      ],
      "disabled": false,
      "alwaysAllow": [
        "start_reminder",
        "stop_reminder",
        "get_status",
        "send_immediate_reminder"
      ]
    }
  }
}
```

---

## 🎯 验证成功的标志

配置成功后，你应该能够：

1. ✅ 在 Cursor AI 中看到 health-reminder 工具
2. ✅ 调用工具时不报错
3. ✅ 收到系统通知

测试命令：
```
使用 health-reminder 立即发送一次测试通知
```

---

## 💡 使用技巧

### 1. 快速启动提醒
```
启动 30 分钟健康提醒
```

### 2. 自定义配置
```
启动健康提醒，每 45 分钟提醒一次，消息是"该休息了！"
```

### 3. 检查状态
```
健康提醒的状态如何？
```

### 4. 停止提醒
```
停止健康提醒
```

---

## 🆘 获取帮助

如果仍然无法配置成功，请：

1. 运行 `test-mcp.bat` 并提供输出
2. 检查 Cursor 控制台（`Help → Toggle Developer Tools → Console`）查看错误
3. 查看详细文档：`docs/CURSOR_SETUP.md`
4. 使用独立 Client 作为替代：`npm run client`

---

## 🔄 其他选择

如果 Cursor 确实不支持 MCP 或配置困难，可以：

1. **使用独立客户端**: `npm run client`
2. **后台运行**: 配合任务计划程序
3. **Web 界面**: 可以扩展开发 Web UI
4. **其他编辑器**: VSCode + MCP 扩展

---

**记住：即使 Cursor 配置不成功，你仍然可以通过 `npm run client` 使用完整功能！** 🎉


