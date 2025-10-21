# 配置示例集合

## 🎯 不同场景的配置示例

### 1. 办公室标准工作

适合一般办公室工作，平衡工作和健康。

```json
{
  "reminder": {
    "interval": 30,
    "message": "该起身活动一下了！💪 喝口水、伸展一下，让眼睛休息休息。",
    "title": "健康提醒",
    "sound": true
  }
}
```

---

### 2. 程序员 - 深度工作模式

适合需要长时间专注的编程工作。

```json
{
  "reminder": {
    "interval": 60,
    "message": "已经编程一小时了！👨‍💻 站起来活动活动，保护你的颈椎和眼睛。远眺远方，做做颈部运动。",
    "title": "编程休息提醒",
    "sound": true
  }
}
```

---

### 3. 番茄工作法（25分钟）

严格的番茄工作法，25分钟工作 + 5分钟休息。

```json
{
  "reminder": {
    "interval": 25,
    "message": "🍅 番茄时间到！休息 5 分钟，放松大脑，准备下一个番茄钟。",
    "title": "番茄钟",
    "sound": true
  }
}
```

---

### 4. 学生学习模式

适合学生上网课或自习。

```json
{
  "reminder": {
    "interval": 45,
    "message": "学习 45 分钟了！📚 该休息一下了，喝口水，做做眼保健操，走动走动再继续。",
    "title": "学习提醒",
    "sound": true
  }
}
```

---

### 5. 设计师/创意工作

适合需要创意思考的工作，稍长的间隔避免打断思路。

```json
{
  "reminder": {
    "interval": 50,
    "message": "已经专注 50 分钟了！🎨 休息一下，换个环境能激发新灵感哦～",
    "title": "创意休息",
    "sound": true
  }
}
```

---

### 6. 轻度使用 - 长间隔

适合偶尔使用电脑的用户。

```json
{
  "reminder": {
    "interval": 90,
    "message": "提醒：已经一个半小时了，注意休息眼睛！👀",
    "title": "温馨提醒",
    "sound": true
  }
}
```

---

### 7. 静音模式 - 会议/直播

开会或直播时使用，不播放声音避免尴尬。

```json
{
  "reminder": {
    "interval": 30,
    "message": "温馨提示：该活动一下了（静音模式）",
    "title": "提醒",
    "sound": false
  }
}
```

---

### 8. 激励型提醒

加入激励性的语言。

```json
{
  "reminder": {
    "interval": 30,
    "message": "💪 你已经专注工作 30 分钟了，真棒！站起来活动 5 分钟，接下来会更高效！加油！",
    "title": "加油鼓励",
    "sound": true
  }
}
```

---

### 9. 健康知识型提醒

提供健康小知识。

```json
{
  "reminder": {
    "interval": 30,
    "message": "💡 健康小贴士：久坐不动会增加患心血管疾病的风险。每 30 分钟站起来活动 2-3 分钟，可以显著改善血液循环！",
    "title": "健康小贴士",
    "sound": true
  }
}
```

---

### 10. 简洁模式

简短直接的提醒。

```json
{
  "reminder": {
    "interval": 30,
    "message": "该动动了！",
    "title": "提醒",
    "sound": true
  }
}
```

---

### 11. 夜猫子模式

适合晚上工作，温和的提醒。

```json
{
  "reminder": {
    "interval": 40,
    "message": "🌙 夜深了，已经 40 分钟了。起来走走，不要太累哦，早点休息～",
    "title": "夜间提醒",
    "sound": false
  }
}
```

---

### 12. 跑步/健身提醒

提醒做特定的活动。

```json
{
  "reminder": {
    "interval": 30,
    "message": "🏃‍♂️ 该动起来了！推荐：10 个深蹲、10 个扩胸运动、眼睛看远处 30 秒。",
    "title": "健身时间",
    "sound": true
  }
}
```

---

## 🔧 在 Cursor MCP 中使用

### 示例：设置番茄工作法

在 `cursor-config.json` 中：

```json
{
  "mcpServers": {
    "health-reminder": {
      "command": "node",
      "args": [
        "C:\\Users\\WB-bw0017\\Desktop\\MyMCP\\health\\dist\\server\\index.js"
      ],
      "env": {
        "REMINDER_INTERVAL": "25",
        "REMINDER_MESSAGE": "🍅 番茄时间到！休息 5 分钟吧！",
        "REMINDER_TITLE": "番茄钟"
      }
    }
  }
}
```

---

## 💡 创意配置技巧

### 1. 使用 Emoji 增加趣味性

```json
{
  "message": "💪🏃‍♂️🚶‍♀️ 该起身活动了！💧🥤 顺便喝口水吧！👀 看看远处放松眼睛～"
}
```

### 2. 加入时间信息

虽然配置是静态的，但可以用描述性的语言：

```json
{
  "message": "半小时过去了！时光飞逝，别忘了照顾身体哦～"
}
```

### 3. 正向激励

```json
{
  "message": "🎉 你很棒！已经专注了 30 分钟。短暂休息会让你更高效！"
}
```

---

## 📱 快速切换配置

创建多个配置文件：

```
config.json              - 当前使用的配置
config.work.json         - 工作模式（30分钟）
config.study.json        - 学习模式（45分钟）
config.pomodoro.json     - 番茄工作法（25分钟）
config.relax.json        - 放松模式（60分钟）
config.silent.json       - 静音模式
```

切换时复制即可：

```bash
copy config.pomodoro.json config.json
npm run build
```

---

## 🌍 多语言支持

### English

```json
{
  "reminder": {
    "interval": 30,
    "message": "Time to take a break! 💪 Stand up, stretch, and rest your eyes.",
    "title": "Health Reminder",
    "sound": true
  }
}
```

### 日本語

```json
{
  "reminder": {
    "interval": 30,
    "message": "休憩時間です！💪 立ち上がって、ストレッチして、目を休めましょう。",
    "title": "健康リマインダー",
    "sound": true
  }
}
```

---

**选择最适合你的配置，保持健康，提高效率！** 🌟

