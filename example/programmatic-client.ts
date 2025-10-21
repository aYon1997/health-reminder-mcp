/**
 * 编程式使用 MCP Client 的示例
 * 展示如何在代码中直接调用 MCP Server 的工具
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  // 创建客户端
  const client = new Client(
    {
      name: "programmatic-health-reminder",
      version: "1.0.0",
    },
    {
      capabilities: {},
    }
  );

  try {
    console.log("连接到 MCP Server...");
    
    // 连接到 server
    const transport = new StdioClientTransport({
      command: "node",
      args: ["../dist/server/index.js"],
    });

    await client.connect(transport);
    console.log("✓ 已连接到 Server\n");

    // 示例 1: 启动默认提醒（30分钟）
    console.log("示例 1: 启动默认提醒");
    const result1 = await client.callTool({
      name: "start_reminder",
      arguments: {},
    });
    console.log("结果:", result1.content[0]);

    // 等待 3 秒
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 示例 2: 查看状态
    console.log("\n示例 2: 查看状态");
    const result2 = await client.callTool({
      name: "get_status",
      arguments: {},
    });
    console.log("结果:", result2.content[0]);

    // 等待 3 秒
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 示例 3: 自定义配置（每 15 分钟提醒）
    console.log("\n示例 3: 更改为每 15 分钟提醒");
    const result3 = await client.callTool({
      name: "start_reminder",
      arguments: {
        interval: 15,
        title: "短时提醒",
        message: "已经15分钟了，活动一下吧！",
        sound: true,
      },
    });
    console.log("结果:", result3.content[0]);

    // 等待 5 秒
    await new Promise(resolve => setTimeout(resolve, 5000));

    // 示例 4: 立即发送提醒
    console.log("\n示例 4: 立即发送一次提醒");
    const result4 = await client.callTool({
      name: "send_immediate_reminder",
      arguments: {
        title: "测试通知",
        message: "这是一条测试通知！",
      },
    });
    console.log("结果:", result4.content[0]);

    // 等待 3 秒
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 示例 5: 停止提醒
    console.log("\n示例 5: 停止提醒");
    const result5 = await client.callTool({
      name: "stop_reminder",
      arguments: {},
    });
    console.log("结果:", result5.content[0]);

    console.log("\n所有示例执行完成！");
    process.exit(0);

  } catch (error) {
    console.error("发生错误:", error);
    process.exit(1);
  }
}

main();

