#!/usr/bin/env node
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { spawn } from "child_process";
import * as readline from "readline";
// 创建 MCP Client
const client = new Client({
    name: "health-reminder-client",
    version: "1.0.0",
}, {
    capabilities: {},
});
// 创建交互界面
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// 打印菜单
function printMenu() {
    console.log("\n╔════════════════════════════════════╗");
    console.log("║     健康提醒 MCP Client 控制台     ║");
    console.log("╠════════════════════════════════════╣");
    console.log("║  1. 启动健康提醒（默认30分钟）     ║");
    console.log("║  2. 启动健康提醒（自定义配置）     ║");
    console.log("║  3. 停止健康提醒                   ║");
    console.log("║  4. 查看当前状态                   ║");
    console.log("║  5. 立即发送提醒                   ║");
    console.log("║  6. 查看可用工具                   ║");
    console.log("║  0. 退出程序                       ║");
    console.log("╚════════════════════════════════════╝");
}
// 提问函数
function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}
// 调用工具
async function callTool(name, args) {
    try {
        const result = await client.callTool({
            name,
            arguments: args || {},
        });
        if (result.content && Array.isArray(result.content) && result.content.length > 0) {
            const content = result.content[0];
            if (content.type === "text" && "text" in content) {
                const data = JSON.parse(content.text);
                return data;
            }
        }
        return null;
    }
    catch (error) {
        console.error("❌ 工具调用失败:", error);
        return null;
    }
}
// 启动默认提醒
async function startDefaultReminder() {
    console.log("\n正在启动默认健康提醒（30分钟间隔）...");
    const result = await callTool("start_reminder");
    if (result && result.success) {
        console.log("✓", result.message);
        console.log("\n配置详情:");
        console.log(`  - 间隔时间: ${result.config.interval} 分钟`);
        console.log(`  - 标题: ${result.config.title}`);
        console.log(`  - 消息: ${result.config.message}`);
        console.log(`  - 提示音: ${result.config.sound ? "开启" : "关闭"}`);
    }
}
// 启动自定义提醒
async function startCustomReminder() {
    console.log("\n=== 自定义健康提醒配置 ===");
    const intervalStr = await question("请输入提醒间隔（分钟，直接回车使用默认30）: ");
    const interval = intervalStr.trim() ? parseInt(intervalStr) : 30;
    const title = await question("请输入通知标题（直接回车使用默认）: ") || "健康提醒";
    const message = await question("请输入提醒消息（直接回车使用默认）: ") ||
        "该起身活动一下了！久坐对健康不利，建议站起来走动走动。";
    const soundStr = await question("是否播放提示音？(y/n, 直接回车为是): ");
    const sound = soundStr.toLowerCase() !== "n";
    console.log("\n正在启动自定义健康提醒...");
    const result = await callTool("start_reminder", {
        interval,
        title,
        message,
        sound,
    });
    if (result && result.success) {
        console.log("✓", result.message);
        console.log("\n配置详情:");
        console.log(`  - 间隔时间: ${result.config.interval} 分钟`);
        console.log(`  - 标题: ${result.config.title}`);
        console.log(`  - 消息: ${result.config.message}`);
        console.log(`  - 提示音: ${result.config.sound ? "开启" : "关闭"}`);
    }
}
// 停止提醒
async function stopReminder() {
    console.log("\n正在停止健康提醒...");
    const result = await callTool("stop_reminder");
    if (result) {
        if (result.success) {
            console.log("✓", result.message);
        }
        else {
            console.log("ℹ", result.message);
        }
    }
}
// 查看状态
async function getStatus() {
    console.log("\n正在获取状态信息...");
    const result = await callTool("get_status");
    if (result && result.success) {
        console.log("\n=== 当前状态 ===");
        console.log(`状态: ${result.status}`);
        if (result.active) {
            console.log("\n当前配置:");
            console.log(`  - 间隔时间: ${result.config.interval} 分钟`);
            console.log(`  - 标题: ${result.config.title}`);
            console.log(`  - 消息: ${result.config.message}`);
            console.log(`  - 提示音: ${result.config.sound ? "开启" : "关闭"}`);
        }
    }
}
// 立即发送提醒
async function sendImmediateReminder() {
    console.log("\n正在发送即时提醒...");
    const result = await callTool("send_immediate_reminder");
    if (result && result.success) {
        console.log("✓", result.message);
    }
}
// 查看可用工具
async function listTools() {
    try {
        const result = await client.listTools();
        console.log("\n=== 可用工具列表 ===");
        result.tools.forEach((tool, index) => {
            console.log(`\n${index + 1}. ${tool.name}`);
            console.log(`   描述: ${tool.description}`);
        });
    }
    catch (error) {
        console.error("❌ 获取工具列表失败:", error);
    }
}
// 主交互循环
async function interactiveLoop() {
    while (true) {
        printMenu();
        const choice = await question("\n请选择操作 (0-6): ");
        switch (choice.trim()) {
            case "1":
                await startDefaultReminder();
                break;
            case "2":
                await startCustomReminder();
                break;
            case "3":
                await stopReminder();
                break;
            case "4":
                await getStatus();
                break;
            case "5":
                await sendImmediateReminder();
                break;
            case "6":
                await listTools();
                break;
            case "0":
                console.log("\n感谢使用健康提醒系统，保重身体！👋");
                rl.close();
                process.exit(0);
                break;
            default:
                console.log("❌ 无效选择，请输入 0-6 之间的数字");
        }
        await question("\n按回车键继续...");
    }
}
// 启动客户端
async function main() {
    try {
        console.log("正在连接到 MCP Server...");
        // 启动 server 进程
        const serverProcess = spawn("node", ["dist/server/index.js"], {
            stdio: ["pipe", "pipe", "pipe"],
        });
        // 监听 server 的错误输出
        serverProcess.stderr?.on("data", (data) => {
            console.error("Server Error:", data.toString());
        });
        // 创建传输层
        const transport = new StdioClientTransport({
            command: "node",
            args: ["dist/server/index.js"],
        });
        // 连接到 server
        await client.connect(transport);
        console.log("✓ 已成功连接到 MCP Server");
        // 启动交互循环
        await interactiveLoop();
    }
    catch (error) {
        console.error("客户端启动失败:", error);
        process.exit(1);
    }
}
// 优雅退出
process.on("SIGINT", () => {
    console.log("\n\n正在退出...");
    rl.close();
    process.exit(0);
});
main().catch((error) => {
    console.error("程序运行出错:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map