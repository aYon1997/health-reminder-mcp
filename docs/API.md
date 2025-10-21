# API 文档

## MCP Tools

### 1. start_reminder

启动健康提醒定时器，定时发送系统通知。

**参数：**

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| interval | number | 否 | 30 | 提醒间隔时间（分钟） |
| message | string | 否 | "该起身活动一下了！..." | 提醒消息内容 |
| title | string | 否 | "健康提醒" | 通知标题 |
| sound | boolean | 否 | true | 是否播放提示音 |

**返回值：**

```json
{
  "success": true,
  "message": "健康提醒已启动！每 30 分钟将收到提醒通知。",
  "config": {
    "interval": 30,
    "message": "该起身活动一下了！...",
    "title": "健康提醒",
    "sound": true
  }
}
```

**使用示例：**

```typescript
// 使用默认配置
await client.callTool({
  name: "start_reminder",
  arguments: {}
});

// 自定义配置
await client.callTool({
  name: "start_reminder",
  arguments: {
    interval: 60,
    title: "工作提醒",
    message: "已经工作一小时了，该休息一下！",
    sound: true
  }
});
```

---

### 2. stop_reminder

停止当前运行的健康提醒定时器。

**参数：** 无

**返回值：**

```json
{
  "success": true,
  "message": "健康提醒已停止"
}
```

**使用示例：**

```typescript
await client.callTool({
  name: "stop_reminder",
  arguments: {}
});
```

---

### 3. get_status

获取当前健康提醒的运行状态和配置信息。

**参数：** 无

**返回值：**

```json
{
  "success": true,
  "status": "运行中",
  "active": true,
  "config": {
    "interval": 30,
    "message": "该起身活动一下了！...",
    "title": "健康提醒",
    "sound": true
  }
}
```

**使用示例：**

```typescript
const result = await client.callTool({
  name: "get_status",
  arguments: {}
});

const data = JSON.parse(result.content[0].text);
if (data.active) {
  console.log("提醒正在运行，间隔:", data.config.interval, "分钟");
} else {
  console.log("提醒未运行");
}
```

---

### 4. send_immediate_reminder

立即发送一次健康提醒通知，不影响当前的定时器。

**参数：**

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| message | string | 否 | "该起身活动一下了！" | 提醒消息内容 |
| title | string | 否 | "健康提醒" | 通知标题 |
| sound | boolean | 否 | true | 是否播放提示音 |

**返回值：**

```json
{
  "success": true,
  "message": "已发送即时提醒通知"
}
```

**使用示例：**

```typescript
// 发送默认提醒
await client.callTool({
  name: "send_immediate_reminder",
  arguments: {}
});

// 发送自定义提醒
await client.callTool({
  name: "send_immediate_reminder",
  arguments: {
    title: "紧急提醒",
    message: "该休息眼睛了！",
    sound: true
  }
});
```

---

## 错误处理

所有工具调用可能返回错误响应：

```json
{
  "success": false,
  "error": "错误描述信息"
}
```

建议在调用工具后检查 `success` 字段：

```typescript
const result = await client.callTool({
  name: "start_reminder",
  arguments: { interval: 30 }
});

const data = JSON.parse(result.content[0].text);
if (data.success) {
  console.log("操作成功:", data.message);
} else {
  console.error("操作失败:", data.error);
}
```

---

## 工作流程示例

### 典型使用流程

```typescript
// 1. 连接到 Server
await client.connect(transport);

// 2. 启动提醒
await client.callTool({
  name: "start_reminder",
  arguments: { interval: 30 }
});

// 3. 运行一段时间后检查状态
await client.callTool({
  name: "get_status",
  arguments: {}
});

// 4. 需要时可以调整配置
await client.callTool({
  name: "start_reminder",
  arguments: { interval: 45 }
});

// 5. 完成后停止提醒
await client.callTool({
  name: "stop_reminder",
  arguments: {}
});
```

---

## 注意事项

1. **定时器唯一性**：同时只能运行一个提醒定时器。启动新提醒会自动停止旧的。

2. **立即生效**：调用 `start_reminder` 会立即发送第一次通知，然后按间隔继续。

3. **时间单位**：所有时间参数都以分钟为单位。

4. **系统通知**：通知效果依赖于操作系统的通知中心配置。

5. **持久化**：当前版本不保存配置，重启后需要重新设置。

---

## 扩展开发

如需添加新功能，可以在 `src/server/index.ts` 中：

1. 在 `tools` 数组中定义新工具
2. 在 `CallToolRequestSchema` 处理器中添加对应的 case
3. 实现具体功能逻辑

示例：

```typescript
// 添加工具定义
{
  name: "pause_reminder",
  description: "暂停提醒一段时间",
  inputSchema: {
    type: "object",
    properties: {
      minutes: {
        type: "number",
        description: "暂停时长（分钟）"
      }
    }
  }
}

// 添加处理逻辑
case "pause_reminder": {
  const minutes = (args?.minutes as number) || 15;
  // 实现暂停逻辑
  // ...
}
```

