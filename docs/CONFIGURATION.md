# 配置指南

## 📋 配置默认提醒时间的三种方式

### 方式 1: 配置文件（推荐）⭐

创建或编辑项目根目录下的 `config.json` 文件：

```json
{
  "reminder": {
    "interval": 45,
    "message": "已经工作 45 分钟了，该休息一下！",
    "title": "工作提醒",
    "sound": true
  }
}
```

**优点**：
- ✅ 简单直观
- ✅ 支持中文和 Emoji
- ✅ 可以提交到版本控制
- ✅ 团队共享配置

**字段说明**：
- `interval`: 提醒间隔时间（分钟）
- `message`: 提醒消息内容
- `title`: 系统通知标题
- `sound`: 是否播放提示音（true/false）

---

### 方式 2: 环境变量

通过环境变量设置（优先级最高）：

**Windows (PowerShell):**
```powershell
$env:REMINDER_INTERVAL="45"
$env:REMINDER_MESSAGE="该休息了！"
$env:REMINDER_TITLE="工作提醒"
$env:REMINDER_SOUND="true"
npm run server
```

**Windows (CMD):**
```cmd
set REMINDER_INTERVAL=45
set REMINDER_MESSAGE=该休息了！
set REMINDER_TITLE=工作提醒
set REMINDER_SOUND=true
npm run server
```

**macOS/Linux:**
```bash
export REMINDER_INTERVAL=45
export REMINDER_MESSAGE="该休息了！"
export REMINDER_TITLE="工作提醒"
export REMINDER_SOUND=true
npm run server
```

**优点**：
- ✅ 不同环境不同配置
- ✅ 适合 CI/CD
- ✅ 优先级最高

---

### 方式 3: 调用时传参

在调用 MCP 工具时传递参数：

**在 Cursor 中：**
```
启动健康提醒，每 45 分钟一次，消息是"该休息了！"
```

**使用 Client：**
选择菜单选项 2（自定义配置），然后输入参数

**编程方式：**
```typescript
await client.callTool({
  name: "start_reminder",
  arguments: {
    interval: 45,
    message: "该休息了！",
    title: "工作提醒",
    sound: true
  }
});
```

**优点**：
- ✅ 灵活实时调整
- ✅ 不需要重启
- ✅ 适合临时修改

---

## 🎯 配置优先级

配置的优先级从高到低：

1. **调用参数** - 最高优先级
2. **环境变量** - 第二优先级
3. **配置文件** (`config.json`) - 第三优先级
4. **内置默认值** - 最低优先级（30分钟）

**示例：**
- 配置文件设置 `interval: 45`
- 环境变量设置 `REMINDER_INTERVAL=60`
- 调用时传参 `interval: 30`

最终使用：**30 分钟**（调用参数优先级最高）

---

## 📝 配置文件示例

### 办公室工作 - 标准配置

```json
{
  "reminder": {
    "interval": 30,
    "message": "该起身活动一下了！💪",
    "title": "健康提醒",
    "sound": true
  }
}
```

### 程序员 - 长时专注

```json
{
  "reminder": {
    "interval": 60,
    "message": "已经编程一小时了！站起来活动活动，保护颈椎和眼睛。👨‍💻",
    "title": "编程休息提醒",
    "sound": true
  }
}
```

### 番茄工作法

```json
{
  "reminder": {
    "interval": 25,
    "message": "番茄时间到！休息 5 分钟吧！🍅",
    "title": "番茄钟",
    "sound": true
  }
}
```

### 学生学习

```json
{
  "reminder": {
    "interval": 45,
    "message": "学习 45 分钟了，该休息一下，喝口水吧！📚",
    "title": "学习提醒",
    "sound": true
  }
}
```

### 静音模式（不打扰）

```json
{
  "reminder": {
    "interval": 60,
    "message": "温馨提示：该活动一下了",
    "title": "提醒",
    "sound": false
  }
}
```

---

## 🔧 在 Cursor MCP 中配置

### 方法 1: 在 MCP 配置中指定环境变量

编辑 Cursor 的 MCP 配置文件：

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
        "REMINDER_MESSAGE": "该休息了！",
        "REMINDER_TITLE": "工作提醒"
      }
    }
  }
}
```

### 方法 2: 修改项目配置文件

直接编辑项目根目录的 `config.json`，然后重新编译：

```bash
npm run build
```

重启 Cursor 后，新配置生效。

---

## 💡 使用技巧

### 1. 不同时段不同配置

可以创建多个配置文件，根据时段切换：

```
config.morning.json   - 早上配置（20分钟）
config.afternoon.json - 下午配置（30分钟）
config.evening.json   - 晚上配置（45分钟）
```

需要时复制到 `config.json`：
```bash
copy config.morning.json config.json
npm run build
```

### 2. 团队共享配置

将 `config.json` 提交到代码仓库，团队成员都使用相同的默认配置。

个人定制可以使用环境变量覆盖。

### 3. 快速测试配置

修改配置后，立即测试：

```bash
# 重新编译
npm run build

# 启动并测试
npm run client
# 选择 5（立即发送提醒）查看效果
```

---

## 🔍 查看当前配置

### 启动时查看

Server 启动时会显示当前使用的默认配置：

```
=================================
   健康提醒 MCP Server 启动中...
=================================

📋 当前默认配置:
  • 间隔时间: 45 分钟
  • 标题: 工作提醒
  • 消息: 该休息了！
  • 提示音: 开启

✓ MCP Server 已就绪
```

### 运行时查看

使用 `get_status` 工具：

**在 Cursor 中：**
```
查看健康提醒的状态
```

**使用 Client：**
选择菜单选项 4

---

## ⚙️ 高级配置

### 动态消息（未来功能）

可以扩展支持动态消息数组，随机显示：

```json
{
  "reminder": {
    "interval": 30,
    "messages": [
      "该起身活动一下了！💪",
      "喝口水，休息一下吧！💧",
      "站起来走走，保护眼睛！👀",
      "伸展一下，放松肌肉！🤸"
    ],
    "title": "健康提醒",
    "sound": true
  }
}
```

### 时段配置（未来功能）

支持按时段自动切换配置：

```json
{
  "schedules": [
    {
      "time": "09:00-12:00",
      "interval": 20,
      "message": "早上要多活动！"
    },
    {
      "time": "13:00-18:00",
      "interval": 30,
      "message": "下午标准提醒"
    }
  ]
}
```

---

## 🆘 常见问题

### Q: 修改配置后不生效？

**A**: 需要重新编译并重启：
```bash
npm run build
# 然后重启 Server 或 Cursor
```

### Q: 如何恢复默认配置？

**A**: 删除或重命名 `config.json`，清除环境变量，系统将使用内置默认值（30分钟）。

### Q: 可以使用 Emoji 吗？

**A**: 可以！配置文件支持 UTF-8，可以使用任何 Unicode 字符和 Emoji。

### Q: 配置文件在哪里？

**A**: 在项目根目录 `C:\Users\WB-bw0017\Desktop\MyMCP\health\config.json`

---

**提示**: 参考 `config.example.json` 查看更多配置示例！

