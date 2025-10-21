# 更新说明 - 配置功能

## 🎉 新增功能

### ⭐ 灵活的配置系统

现在支持三种方式自定义默认提醒时间和消息！

---

## 📝 更新内容

### 1. 配置文件支持

创建 `config.json` 文件即可自定义默认配置：

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

**文件位置**：项目根目录 `config.json`

**优势**：
- ✅ 简单直观
- ✅ 团队共享
- ✅ 版本控制

---

### 2. 环境变量支持

通过环境变量设置配置（优先级最高）：

**Windows:**
```cmd
set REMINDER_INTERVAL=60
set REMINDER_MESSAGE=该休息了！
set REMINDER_TITLE=工作提醒
npm run server
```

**Linux/Mac:**
```bash
export REMINDER_INTERVAL=60
export REMINDER_MESSAGE="该休息了！"
npm run server
```

**在 Cursor MCP 配置中**：
```json
{
  "mcpServers": {
    "health-reminder": {
      "command": "node",
      "args": ["path/to/dist/server/index.js"],
      "env": {
        "REMINDER_INTERVAL": "60",
        "REMINDER_MESSAGE": "该休息了！"
      }
    }
  }
}
```

---

### 3. 配置优先级

```
调用参数 > 环境变量 > 配置文件 > 内置默认值(30分钟)
```

**示例**：
- 配置文件设置：45 分钟
- 环境变量设置：60 分钟
- 调用时传参：30 分钟

**最终使用**：30 分钟（调用参数优先级最高）

---

### 4. 启动时显示配置

Server 启动时会显示当前使用的配置：

```
=================================
   健康提醒 MCP Server 启动中...
=================================

✓ 已从配置文件加载默认设置: C:\...\config.json

📋 当前默认配置:
  • 间隔时间: 45 分钟
  • 标题: 工作提醒
  • 消息: 已经 45 分钟了...
  • 提示音: 开启

✓ MCP Server 已就绪
```

---

## 📚 新增文档

### 1. 配置指南
`docs/CONFIGURATION.md` - 详细的配置说明和使用方法

### 2. 配置示例
`examples/config-examples.md` - 12+ 种场景的配置示例

### 3. 功能详解
`FEATURES.md` - 完整的功能特性说明

---

## 🔧 新增工具

### 1. 配置测试脚本
`test-config.bat` - 自动测试配置功能

### 2. 示例配置文件
`config.example.json` - 包含详细说明的示例配置

---

## 📖 使用示例

### 场景 1: 番茄工作法

创建 `config.json`:
```json
{
  "reminder": {
    "interval": 25,
    "message": "🍅 番茄时间到！休息 5 分钟吧！",
    "title": "番茄钟",
    "sound": true
  }
}
```

### 场景 2: 程序员模式

```json
{
  "reminder": {
    "interval": 60,
    "message": "已经编程一小时了！👨‍💻 该活动一下～",
    "title": "编程提醒",
    "sound": true
  }
}
```

### 场景 3: 静音模式

```json
{
  "reminder": {
    "interval": 30,
    "message": "温馨提示：该活动一下了",
    "title": "提醒",
    "sound": false
  }
}
```

---

## 🚀 如何使用

### 方法 1: 直接编辑配置文件

1. 创建或编辑 `config.json`
2. 填写你的配置
3. 重新编译：`npm run build`
4. 启动使用

### 方法 2: 使用环境变量

1. 设置环境变量
2. 启动 Server

### 方法 3: 调用时传参（不变）

继续使用原来的方式，在调用工具时传参。

---

## ✨ 优势

1. **灵活性**：三种配置方式，适应不同场景
2. **优先级**：明确的优先级规则，避免混淆
3. **可见性**：启动时显示配置，便于确认
4. **兼容性**：完全向后兼容，不影响原有功能
5. **团队友好**：支持团队共享配置

---

## 📦 完整文件列表

新增/修改的文件：

```
新增：
├── config.json                    # 默认配置文件
├── config.example.json            # 配置示例（含说明）
├── test-config.bat                # 配置测试脚本
├── docs/CONFIGURATION.md          # 配置指南
├── examples/config-examples.md    # 配置示例集
├── FEATURES.md                    # 功能详解
└── UPDATE.md                      # 本文件

修改：
├── src/server/index.ts            # 添加配置加载逻辑
├── README.md                      # 添加配置说明
└── .gitignore                     # 配置文件注释
```

---

## 🎓 快速开始

### 1. 使用默认配置文件

```bash
# 复制示例配置
copy config.example.json config.json

# 编辑 config.json，设置你想要的间隔时间

# 重新编译
npm run build

# 启动
npm run client
```

### 2. 测试配置

```bash
# 运行测试脚本
test-config.bat
```

### 3. 查看文档

- 详细配置：`docs/CONFIGURATION.md`
- 配置示例：`examples/config-examples.md`
- 功能列表：`FEATURES.md`

---

## 💡 小贴士

1. **配置文件格式**：必须是有效的 JSON 格式
2. **环境变量优先**：环境变量会覆盖配置文件
3. **UTF-8 编码**：支持中文和 Emoji
4. **实时生效**：修改配置后需重新编译和重启
5. **共享配置**：可以将 `config.json` 提交到 Git

---

## ❓ 常见问题

**Q: 配置修改后不生效？**
A: 需要重新编译 (`npm run build`) 并重启

**Q: 如何恢复默认配置？**
A: 删除 `config.json` 和环境变量即可

**Q: 支持动态修改吗？**
A: 当前版本需要重启，v1.1.0 将支持热加载

---

**享受更灵活的健康提醒体验！** 🎉

