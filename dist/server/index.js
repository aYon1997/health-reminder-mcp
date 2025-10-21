#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import notifier from "node-notifier";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
// 获取当前文件目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// 从配置文件加载默认配置
function loadDefaultConfig() {
    // 硬编码的默认值
    const builtInDefaults = {
        interval: 30,
        message: "该起身活动一下了！久坐对健康不利，建议站起来走动走动。",
        title: "健康提醒",
        sound: true,
    };
    // 尝试从配置文件读取（优先级：当前目录 > 项目根目录）
    const configPaths = [
        join(process.cwd(), "config.json"),
        join(__dirname, "..", "..", "config.json"),
    ];
    for (const configPath of configPaths) {
        if (existsSync(configPath)) {
            try {
                const configFile = readFileSync(configPath, "utf-8");
                const config = JSON.parse(configFile);
                if (config.reminder) {
                    console.log(`✓ 已从配置文件加载默认设置: ${configPath}`);
                    return {
                        interval: config.reminder.interval ?? builtInDefaults.interval,
                        message: config.reminder.message ?? builtInDefaults.message,
                        title: config.reminder.title ?? builtInDefaults.title,
                        sound: config.reminder.sound ?? builtInDefaults.sound,
                    };
                }
            }
            catch (error) {
                console.warn(`警告: 无法读取配置文件 ${configPath}:`, error);
            }
        }
    }
    // 从环境变量读取（最高优先级）
    if (process.env.REMINDER_INTERVAL || process.env.REMINDER_MESSAGE ||
        process.env.REMINDER_TITLE || process.env.REMINDER_SOUND) {
        console.log("✓ 检测到环境变量配置");
        return {
            interval: process.env.REMINDER_INTERVAL
                ? parseInt(process.env.REMINDER_INTERVAL)
                : builtInDefaults.interval,
            message: process.env.REMINDER_MESSAGE ?? builtInDefaults.message,
            title: process.env.REMINDER_TITLE ?? builtInDefaults.title,
            sound: process.env.REMINDER_SOUND
                ? process.env.REMINDER_SOUND === "true"
                : builtInDefaults.sound,
        };
    }
    console.log("ℹ 使用内置默认配置");
    return builtInDefaults;
}
// 默认配置
const defaultConfig = loadDefaultConfig();
// 当前活动的提醒定时器
let reminderTimer = null;
let currentConfig = { ...defaultConfig };
// 创建 MCP Server
const server = new Server({
    name: "health-reminder-server",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
// 发送系统通知
function sendNotification(config) {
    notifier.notify({
        title: config.title,
        message: config.message,
        sound: config.sound,
        wait: false,
        timeout: 10,
    });
    console.log(`[${new Date().toLocaleString()}] 已发送提醒: ${config.message}`);
}
// 启动提醒定时器
function startReminder(config) {
    // 清除现有定时器
    if (reminderTimer) {
        clearInterval(reminderTimer);
    }
    currentConfig = { ...config };
    const intervalMs = config.interval * 60 * 1000;
    // 立即发送一次通知
    sendNotification(config);
    // 设置定时器
    reminderTimer = setInterval(() => {
        sendNotification(config);
    }, intervalMs);
    console.log(`✓ 健康提醒已启动 - 每 ${config.interval} 分钟提醒一次`);
}
// 停止提醒定时器
function stopReminder() {
    if (reminderTimer) {
        clearInterval(reminderTimer);
        reminderTimer = null;
        console.log("✓ 健康提醒已停止");
        return true;
    }
    return false;
}
// 获取当前状态
function getReminderStatus() {
    return {
        active: reminderTimer !== null,
        config: currentConfig,
    };
}
// 定义可用工具
const tools = [
    {
        name: "start_reminder",
        description: "启动健康提醒定时器，每隔指定时间弹出系统通知",
        inputSchema: {
            type: "object",
            properties: {
                interval: {
                    type: "number",
                    description: "提醒间隔时间（分钟），默认 30 分钟",
                    default: 30,
                },
                message: {
                    type: "string",
                    description: "提醒消息内容",
                    default: "该起身活动一下了！久坐对健康不利，建议站起来走动走动。",
                },
                title: {
                    type: "string",
                    description: "通知标题",
                    default: "健康提醒",
                },
                sound: {
                    type: "boolean",
                    description: "是否播放提示音",
                    default: true,
                },
            },
        },
    },
    {
        name: "stop_reminder",
        description: "停止健康提醒定时器",
        inputSchema: {
            type: "object",
            properties: {},
        },
    },
    {
        name: "get_status",
        description: "获取当前健康提醒的状态和配置",
        inputSchema: {
            type: "object",
            properties: {},
        },
    },
    {
        name: "send_immediate_reminder",
        description: "立即发送一次健康提醒通知（不影响定时器）",
        inputSchema: {
            type: "object",
            properties: {
                message: {
                    type: "string",
                    description: "提醒消息内容",
                    default: "该起身活动一下了！",
                },
                title: {
                    type: "string",
                    description: "通知标题",
                    default: "健康提醒",
                },
                sound: {
                    type: "boolean",
                    description: "是否播放提示音",
                    default: true,
                },
            },
        },
    },
];
// 处理工具列表请求
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
});
// 处理工具调用请求
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        switch (name) {
            case "start_reminder": {
                const config = {
                    interval: args?.interval || defaultConfig.interval,
                    message: args?.message || defaultConfig.message,
                    title: args?.title || defaultConfig.title,
                    sound: args?.sound !== undefined ? args.sound : defaultConfig.sound,
                };
                startReminder(config);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                success: true,
                                message: `健康提醒已启动！每 ${config.interval} 分钟将收到提醒通知。`,
                                config: config,
                            }, null, 2),
                        },
                    ],
                };
            }
            case "stop_reminder": {
                const stopped = stopReminder();
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                success: stopped,
                                message: stopped ? "健康提醒已停止" : "当前没有运行中的提醒",
                            }, null, 2),
                        },
                    ],
                };
            }
            case "get_status": {
                const status = getReminderStatus();
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                success: true,
                                status: status.active ? "运行中" : "已停止",
                                active: status.active,
                                config: status.config,
                            }, null, 2),
                        },
                    ],
                };
            }
            case "send_immediate_reminder": {
                const config = {
                    message: args?.message || "该起身活动一下了！",
                    title: args?.title || "健康提醒",
                    sound: args?.sound !== undefined ? args.sound : true,
                    interval: 0, // 不使用
                };
                sendNotification(config);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                success: true,
                                message: "已发送即时提醒通知",
                            }, null, 2),
                        },
                    ],
                };
            }
            default:
                throw new Error(`未知工具: ${name}`);
        }
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        success: false,
                        error: error instanceof Error ? error.message : String(error),
                    }, null, 2),
                },
            ],
            isError: true,
        };
    }
});
// 启动服务器
async function main() {
    console.log("=================================");
    console.log("   健康提醒 MCP Server 启动中...");
    console.log("=================================");
    console.log("");
    console.log("📋 当前默认配置:");
    console.log(`  • 间隔时间: ${defaultConfig.interval} 分钟`);
    console.log(`  • 标题: ${defaultConfig.title}`);
    console.log(`  • 消息: ${defaultConfig.message.substring(0, 30)}${defaultConfig.message.length > 30 ? '...' : ''}`);
    console.log(`  • 提示音: ${defaultConfig.sound ? '开启' : '关闭'}`);
    console.log("");
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("✓ MCP Server 已就绪");
    console.log("✓ 支持的工具:");
    console.log("  - start_reminder: 启动健康提醒");
    console.log("  - stop_reminder: 停止提醒");
    console.log("  - get_status: 查看状态");
    console.log("  - send_immediate_reminder: 立即发送提醒");
    console.log("=================================");
}
// 优雅退出
process.on("SIGINT", () => {
    console.log("\n正在关闭服务器...");
    stopReminder();
    process.exit(0);
});
process.on("SIGTERM", () => {
    console.log("\n正在关闭服务器...");
    stopReminder();
    process.exit(0);
});
main().catch((error) => {
    console.error("服务器启动失败:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map