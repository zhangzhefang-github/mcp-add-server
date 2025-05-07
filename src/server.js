import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

console.log("MCP Add Server - Initializing..."); // 日志1: 初始化开始

const server = new McpServer({
  name: "Add Server",
  version: "1.0.0"
});

console.log("MCP Server instance created."); // 日志2: McpServer 实例创建

server.tool("add", {
  a: z.number().describe("第一个加数"),
  b: z.number().describe("第二个加数")
}, async ({ a, b }) => {
  console.log(`Tool 'add' called with arguments: a=${a}, b=${b}`); // 日志3: 工具调用及参数
  const sum = a + b;
  console.log(`Tool 'add' - calculated sum: ${sum}`); // 日志4: 计算结果
  return {
    content: [{
      type: "text",
      text: `结果是：${sum}`
    }]
  };
});

console.log("Tool 'add' registered."); // 日志5: 工具注册完毕

const transport = new StdioServerTransport();
await server.connect(transport);

console.log("MCP Add Server connected to transport and is ready for requests."); // 日志6: 服务器已连接并准备就绪

// Graceful exit when stdin closes (e.g., when client disconnects)
process.stdin.on('end', () => {
  console.log('Server stdin stream ended, exiting gracefully...');
  process.exit(0);
});

process.stdin.on('close', () => {
  console.log('Server stdin stream closed, exiting gracefully...');
  process.exit(0);
});

// Keep the process alive until stdin closes or an explicit exit command is given
// For a stdio server, it typically runs умирает when stdin is closed by the client.
// If there were other non-daemon tasks or an actual server listener (like http.createServer),
// this explicit keep-alive might not be necessary, but for a simple stdio pipe it can be.
// However, the SDK's StdioServerTransport might already handle keeping the process alive
// as long as it's connected.
// Let's rely on the stdin 'end'/'close' events for now.
