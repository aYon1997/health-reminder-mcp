# 远程部署指南

本文档介绍如何将健康提醒 MCP 系统部署到远程服务器上。

## 📖 什么是远程部署？

**远程部署**是指将 MCP Server 部署在远程服务器（云服务器）上，而不是在本地电脑上运行。

### 本地部署 vs 远程部署

| 特性 | 本地部署 | 远程部署 |
|-----|---------|---------|
| **运行位置** | 本地电脑 | 远程服务器 |
| **网络依赖** | 不需要 | 需要网络连接 |
| **服务器成本** | 免费 | 需要租用服务器 |
| **可访问性** | 仅本机 | 可多设备访问 |
| **稳定性** | 依赖本机运行 | 7×24 小时运行 |
| **维护难度** | 简单 | 需要服务器管理知识 |

## ⚠️ 重要说明

> **注意**：健康提醒系统依赖于**系统通知**功能，而远程服务器通常没有桌面环境和通知系统。
> 
> **远程部署适用于以下场景**：
> 1. 作为 API 服务供其他应用调用
> 2. 通过 Web 接口或移动应用接收提醒
> 3. 使用其他通知方式（邮件、短信、Webhook）
> 
> **如果只是个人使用，建议使用本地部署。**

## 🎯 适用场景

### 适合远程部署
- ✅ 团队共享提醒服务
- ✅ 多设备同步提醒
- ✅ 需要 7×24 小时运行
- ✅ 通过 Web/App 接收通知
- ✅ 集成到其他系统

### 不适合远程部署
- ❌ 个人使用系统通知
- ❌ 简单的桌面提醒
- ❌ 离线使用需求

## 🚀 远程部署步骤

### 准备工作

#### 1. 服务器要求

**最低配置：**
- CPU: 1 核
- 内存: 512 MB
- 存储: 10 GB
- 操作系统: Ubuntu 20.04+ / CentOS 7+ / Debian 10+
- Node.js: 18.x 或更高版本

**推荐服务器提供商：**
- 阿里云（国内）
- 腾讯云（国内）
- AWS（国际）
- DigitalOcean（国际）
- Vultr（国际）

#### 2. 所需软件

- Node.js 18+
- npm 或 yarn
- Git
- PM2（进程管理器）
- Nginx（可选，用于反向代理）

---

## 📝 详细部署流程

### 步骤 1：连接到服务器

```bash
# 使用 SSH 连接到服务器
ssh root@your-server-ip

# 或使用密钥
ssh -i your-key.pem root@your-server-ip
```

### 步骤 2：安装 Node.js

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# 验证安装
node --version
npm --version
```

### 步骤 3：安装 PM2

```bash
# 全局安装 PM2
npm install -g pm2

# 验证安装
pm2 --version
```

### 步骤 4：上传项目到服务器

#### 方式 1：使用 Git（推荐）

```bash
# 在服务器上创建项目目录
mkdir -p /opt/mcp-servers
cd /opt/mcp-servers

# 克隆项目（如果已推送到 Git 仓库）
git clone https://github.com/your-repo/health-reminder-mcp.git
cd health-reminder-mcp

# 或者从本地上传
# 在本地电脑执行
scp -r C:\Users\WB-bw0017\Desktop\MyMCP\health root@your-server-ip:/opt/mcp-servers/
```

#### 方式 2：使用 SCP 上传

```bash
# 在本地 PowerShell 执行
scp -r C:\Users\WB-bw0017\Desktop\MyMCP\health root@your-server-ip:/opt/mcp-servers/
```

#### 方式 3：使用 FTP 工具

使用 WinSCP、FileZilla 等工具上传整个项目文件夹。

### 步骤 5：安装依赖和编译

```bash
# 进入项目目录
cd /opt/mcp-servers/health

# 安装依赖
npm install

# 编译项目
npm run build

# 确认编译成功
ls -la dist/server/
```

### 步骤 6：配置服务器环境

创建生产环境配置文件：

```bash
# 编辑配置文件
nano /opt/mcp-servers/health/config.production.json
```

内容示例：

```json
{
  "reminder": {
    "interval": 30,
    "message": "该起身活动一下了！",
    "title": "健康提醒",
    "sound": true
  },
  "server": {
    "host": "0.0.0.0",
    "port": 3000,
    "logLevel": "info"
  }
}
```

### 步骤 7：使用 PM2 启动服务

```bash
# 进入项目目录
cd /opt/mcp-servers/health

# 使用 PM2 启动
pm2 start dist/server/index.js --name health-reminder-mcp

# 设置开机自启动
pm2 startup
pm2 save

# 查看运行状态
pm2 status

# 查看日志
pm2 logs health-reminder-mcp

# 监控
pm2 monit
```

### 步骤 8：配置防火墙

```bash
# Ubuntu/Debian (UFW)
sudo ufw allow 3000/tcp
sudo ufw reload

# CentOS (firewalld)
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload
```

### 步骤 9：配置 Nginx 反向代理（可选）

```bash
# 安装 Nginx
sudo apt-get install nginx  # Ubuntu/Debian
sudo yum install nginx      # CentOS

# 创建配置文件
sudo nano /etc/nginx/sites-available/health-reminder
```

Nginx 配置示例：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为你的域名

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

启用配置：

```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/health-reminder /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

### 步骤 10：配置 SSL（HTTPS）

```bash
# 安装 Certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取 SSL 证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

---

## 🔧 客户端连接配置

### 方式 1：通过 HTTP/HTTPS 连接

修改 Cursor 的 MCP 配置（`mcp.json`）：

```json
{
  "mcpServers": {
    "health-reminder": {
      "command": "node",
      "args": [
        "-e",
        "require('@modelcontextprotocol/sdk').connect('https://your-domain.com/mcp')"
      ],
      "env": {}
    }
  }
}
```

### 方式 2：通过 SSH 隧道连接

```json
{
  "mcpServers": {
    "health-reminder": {
      "command": "ssh",
      "args": [
        "-L", "3000:localhost:3000",
        "root@your-server-ip",
        "cd /opt/mcp-servers/health && node dist/server/index.js"
      ]
    }
  }
}
```

### 方式 3：修改为 WebSocket 连接

需要修改服务器代码以支持 WebSocket（需要额外开发）。

---

## 📊 服务器管理命令

### PM2 常用命令

```bash
# 查看所有进程
pm2 list

# 查看特定进程状态
pm2 show health-reminder-mcp

# 查看日志
pm2 logs health-reminder-mcp
pm2 logs health-reminder-mcp --lines 100

# 重启服务
pm2 restart health-reminder-mcp

# 停止服务
pm2 stop health-reminder-mcp

# 删除服务
pm2 delete health-reminder-mcp

# 监控
pm2 monit

# 清空日志
pm2 flush
```

### 更新部署

```bash
# 1. 拉取最新代码
cd /opt/mcp-servers/health
git pull

# 2. 重新安装依赖（如有变化）
npm install

# 3. 重新编译
npm run build

# 4. 重启服务
pm2 restart health-reminder-mcp
```

### 查看日志

```bash
# PM2 日志
pm2 logs health-reminder-mcp

# 系统日志
journalctl -u nginx
tail -f /var/log/nginx/error.log
```

---

## 🛡️ 安全建议

### 1. 服务器安全

```bash
# 创建非 root 用户
adduser mcpuser
usermod -aG sudo mcpuser

# 禁用 root SSH 登录
sudo nano /etc/ssh/sshd_config
# 修改: PermitRootLogin no
sudo systemctl restart sshd

# 配置防火墙
sudo ufw enable
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
```

### 2. 访问控制

```bash
# 限制 IP 访问（Nginx）
location / {
    allow 192.168.1.0/24;  # 允许特定 IP 段
    deny all;               # 拒绝其他所有
    proxy_pass http://localhost:3000;
}
```

### 3. 环境变量管理

```bash
# 使用 PM2 生态系统文件
pm2 ecosystem
```

编辑 `ecosystem.config.js`：

```javascript
module.exports = {
  apps: [{
    name: 'health-reminder-mcp',
    script: './dist/server/index.js',
    env: {
      NODE_ENV: 'production',
      REMINDER_INTERVAL: '30',
      REMINDER_MESSAGE: '该起身活动了！'
    }
  }]
}

// 使用配置启动
pm2 start ecosystem.config.js
```

---

## 🔍 故障排查

### 服务无法启动

```bash
# 检查端口占用
sudo lsof -i :3000
sudo netstat -tlnp | grep 3000

# 检查 Node.js 版本
node --version

# 检查权限
ls -la /opt/mcp-servers/health/dist/server/

# 手动运行查看错误
cd /opt/mcp-servers/health
node dist/server/index.js
```

### 无法连接

```bash
# 检查服务状态
pm2 status
pm2 logs health-reminder-mcp

# 检查防火墙
sudo ufw status
sudo firewall-cmd --list-all

# 测试端口
telnet your-server-ip 3000
curl http://your-server-ip:3000
```

### 内存不足

```bash
# 查看内存使用
free -h
pm2 monit

# 限制内存使用
pm2 start dist/server/index.js --name health-reminder-mcp --max-memory-restart 200M
```

---

## 💰 成本估算

### 服务器成本（月付）

| 提供商 | 配置 | 价格 |
|-------|-----|------|
| 阿里云 | 1核 1GB | ¥50-100 |
| 腾讯云 | 1核 2GB | ¥60-120 |
| AWS | t2.micro | $8-15 |
| DigitalOcean | Basic Droplet | $5-10 |
| Vultr | 1核 1GB | $5-10 |

### 域名成本（年付）

- .com 域名：¥50-100/年
- .cn 域名：¥30-80/年

### SSL 证书

- Let's Encrypt：免费
- 商业证书：¥100-1000/年

---

## 🎯 推荐方案

### 个人使用

**建议：本地部署**
- 免费
- 配置简单
- 无需服务器管理

### 小团队（3-10人）

**建议：低配服务器**
- 阿里云/腾讯云 1核2GB
- 使用 PM2 管理
- 配置简单的防火墙

### 中大型团队（10人以上）

**建议：标准配置**
- 2核4GB 服务器
- Nginx 反向代理
- HTTPS 加密
- 日志监控
- 负载均衡（可选）

---

## 📚 相关文档

- [本地部署指南](./CURSOR_SETUP.md)
- [配置说明](./CONFIGURATION.md)
- [API 文档](./API.md)
- [故障排查](./TROUBLESHOOTING.md)

---

## ❓ 常见问题

### 1. 远程部署后通知还能显示吗？

不能。远程服务器没有桌面环境，无法显示系统通知。需要修改代码以支持其他通知方式（邮件、短信、Webhook、推送通知等）。

### 2. 可以同时连接多个客户端吗？

可以，但需要修改服务器代码以支持多客户端连接。当前版本是单连接设计。

### 3. 需要公网 IP 吗？

- 如果需要从外网访问：需要公网 IP
- 如果只在内网使用：不需要公网 IP

### 4. 可以使用云函数（Serverless）部署吗？

理论上可以，但不推荐。因为：
- 定时任务需要持续运行
- 云函数有超时限制
- 成本可能更高

### 5. 数据存储在哪里？

当前版本没有持久化存储。如需存储数据，可以集成：
- SQLite（本地数据库）
- MySQL/PostgreSQL（关系型数据库）
- Redis（缓存）
- MongoDB（文档数据库）

---

## 📞 技术支持

如有问题，请查看：
1. [项目 README](../README.md)
2. [配置文档](./CONFIGURATION.md)
3. [GitHub Issues](https://github.com/your-repo/issues)

---

**祝部署顺利！** 🚀

