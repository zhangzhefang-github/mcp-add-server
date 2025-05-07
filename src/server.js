import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "Add Server",
  version: "1.0.0"
});

server.tool("add", {
  a: z.number().describe("第一个加数"),
  b: z.number().describe("第二个加数")
}, async ({ a, b }) => {
  return {
    content: [{
      type: "text",
      text: `结果是：${a + b}`
    }]
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);
