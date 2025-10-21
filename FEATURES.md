# 功能特性详解

## 🎯 核心功能

### 1. 定时健康提醒

- ✅ 定时弹出系统通知
- ✅ 自定义提醒间隔（分钟为单位）
- ✅ 自定义消息内容
- ✅ 自定义通知标题
- ✅ 可控制提示音开关
- ✅ 跨平台支持（Windows/macOS/Linux）

### 2. 灵活配置系统

#### 三级配置优先级

```
调用参数 > 环境变量 > 配置文件 > 内置默认值
```

**优势**：
- 🎯 开发/生产环境分离
- 🎯 团队共享默认配置
- 🎯 个人临时调整
- 🎯 无需修改代码

#### 配置方式对比

| 方式 | 优先级 | 适用场景 | 持久化 |
|------|--------|----------|--------|
| 调用参数 | 最高 | 临时调整 | ❌ |
| 环境变量 | 高 | 不同环境 | ✅ |
| 配置文件 | 中 | 默认设置 | ✅ |
| 内置默认 | 最低 | 备用方案 | ✅ |

### 3. MCP 架构

#### Server 端

- ✅ 完整的 MCP Server 实现
- ✅ 4 个标准 MCP 工具
- ✅ Stdio 传输协议
- ✅ 优雅的错误处理
- ✅ 日志输出

#### Client 端

- ✅ 交互式 CLI 界面
- ✅ 友好的菜单系统
- ✅ 实时状态查询
- ✅ 编程式调用支持

### 4. 易用性

- ✅ 一键启动脚本（Windows/Linux/macOS）
- ✅ 自动环境检测
- ✅ 详细的错误提示
- ✅ 丰富的文档和示例

---

## 🔧 MCP 工具详解

### 1. start_reminder

**功能**：启动健康提醒定时器

**参数**：
```typescript
{
  interval?: number,    // 间隔时间（分钟），默认 30
  message?: string,     // 消息内容
  title?: string,       // 通知标题
  sound?: boolean       // 是否播放声音
}
```

**特点**：
- ✅ 启动时立即发送第一次通知
- ✅ 自动覆盖之前的定时器
- ✅ 支持参数合并（未提供的参数使用默认值）

**使用示例**：
```javascript
// 使用默认配置
start_reminder()

// 自定义间隔
start_reminder({ interval: 45 })

// 完全自定义
start_reminder({
  interval: 60,
  message: "一小时了，休息一下！",
  title: "工作提醒",
  sound: true
})
```

---

### 2. stop_reminder

**功能**：停止当前运行的提醒定时器

**参数**：无

**返回**：
```json
{
  "success": true/false,
  "message": "状态描述"
}
```

**特点**：
- ✅ 立即停止定时器
- ✅ 清理资源
- ✅ 幂等操作（重复调用不报错）

---

### 3. get_status

**功能**：获取当前提醒系统状态

**参数**：无

**返回**：
```json
{
  "success": true,
  "status": "运行中" | "已停止",
  "active": true/false,
  "config": {
    "interval": 30,
    "message": "...",
    "title": "...",
    "sound": true
  }
}
```

**特点**：
- ✅ 实时状态
- ✅ 完整配置信息
- ✅ 便于监控和调试

---

### 4. send_immediate_reminder

**功能**：立即发送一次通知（不影响定时器）

**参数**：
```typescript
{
  message?: string,
  title?: string,
  sound?: boolean
}
```

**特点**：
- ✅ 独立于定时器
- ✅ 适合测试通知
- ✅ 可自定义内容

**使用场景**：
- 测试系统通知是否正常
- 发送临时提醒
- 验证配置效果

---

## 📦 配置系统详解

### 配置文件结构

```json
{
  "reminder": {
    "interval": 30,
    "message": "消息内容",
    "title": "通知标题",
    "sound": true
  }
}
```

### 环境变量列表

| 变量名 | 类型 | 说明 | 示例 |
|--------|------|------|------|
| REMINDER_INTERVAL | number | 间隔时间 | 45 |
| REMINDER_MESSAGE | string | 消息内容 | "该休息了！" |
| REMINDER_TITLE | string | 通知标题 | "工作提醒" |
| REMINDER_SOUND | boolean | 提示音 | "true"/"false" |

### 配置加载流程

```
1. 加载内置默认值（30分钟）
   ↓
2. 检查配置文件是否存在
   ├─ 存在 → 加载并合并
   └─ 不存在 → 跳过
   ↓
3. 检查环境变量
   ├─ 存在 → 覆盖对应项
   └─ 不存在 → 跳过
   ↓
4. 启动时显示最终配置
```

---

## 🎨 使用场景

### 场景 1：开发者个人使用

**需求**：
- 每小时提醒
- 自定义消息
- 静音模式（开会时）

**配置**：
```json
{
  "reminder": {
    "interval": 60,
    "message": "已经编程一小时了！该活动一下～",
    "title": "编程提醒",
    "sound": false
  }
}
```

---

### 场景 2：团队共享配置

**需求**：
- 统一团队默认配置
- 个人可临时调整

**实现**：
1. 将 `config.json` 提交到代码仓库
2. 团队成员拉取后自动使用
3. 需要调整时使用环境变量或调用参数

---

### 场景 3：多环境部署

**需求**：
- 开发环境：20 分钟（快速测试）
- 生产环境：30 分钟（标准配置）

**实现**：
```bash
# 开发环境
set REMINDER_INTERVAL=20
npm run server

# 生产环境
set REMINDER_INTERVAL=30
npm run server
```

---

### 场景 4：集成到 Cursor

**需求**：
- 在 Cursor 中使用
- 番茄工作法（25分钟）

**配置**：
```json
{
  "mcpServers": {
    "health-reminder": {
      "command": "node",
      "args": ["path/to/dist/server/index.js"],
      "env": {
        "REMINDER_INTERVAL": "25",
        "REMINDER_MESSAGE": "🍅 番茄时间到！",
        "REMINDER_TITLE": "番茄钟"
      }
    }
  }
}
```

---

## 💡 高级特性

### 1. 动态配置切换

创建多个配置文件，根据需要切换：

```bash
# 工作模式
copy config.work.json config.json

# 学习模式
copy config.study.json config.json

# 番茄模式
copy config.pomodoro.json config.json
```

### 2. 配置验证

启动时自动验证并显示最终配置：

```
📋 当前默认配置:
  • 间隔时间: 45 分钟
  • 标题: 工作提醒
  • 消息: 已经 45 分钟了...
  • 提示音: 开启
```

### 3. 配置继承

未设置的字段自动使用默认值：

```json
{
  "reminder": {
    "interval": 45
    // 其他字段使用默认值
  }
}
```

---

## 🔌 集成能力

### 1. Cursor 集成

- ✅ MCP 标准协议
- ✅ AI 自然语言控制
- ✅ 环境变量配置

### 2. 其他应用集成

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

// 连接到 Server
const client = new Client(...);
await client.connect(transport);

// 调用工具
await client.callTool({
  name: "start_reminder",
  arguments: { interval: 30 }
});
```

### 3. 命令行集成

```bash
# 独立使用
npm run client

# 后台运行
pm2 start npm --name "health-reminder" -- run client
```

---

## 📊 性能特点

- ⚡ 轻量级：占用内存 < 50MB
- ⚡ 高效：基于 Node.js 事件循环
- ⚡ 稳定：优雅的错误处理
- ⚡ 可靠：自动重连机制（Client）

---

## 🛡️ 安全性

- ✅ 本地运行，无网络请求
- ✅ 无数据收集
- ✅ 开源代码，可审计
- ✅ MIT 许可证

---

## 🚀 未来规划

### v1.1.0
- [ ] 配置热加载（无需重启）
- [ ] 多定时器支持
- [ ] 提醒历史记录
- [ ] 数据统计和分析

### v1.2.0
- [ ] Web UI 控制面板
- [ ] 移动端通知同步
- [ ] 智能提醒时间建议
- [ ] 插件系统

### v2.0.0
- [ ] 云同步配置
- [ ] 多用户支持
- [ ] AI 优化提醒策略
- [ ] 健康设备集成

---

**所有功能都已就绪，开始使用吧！** 🎉

