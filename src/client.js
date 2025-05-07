import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const client = new Client({
  name: "test-client",
  version: "1.0.0"
});

const transport = new StdioClientTransport({
  command: "npx",
  args: ["mcp-add-server"]
});

await client.connect(transport);

const result = await client.callTool({
  name: "add",
  arguments: { a: 10, b: 5 }
});

console.log("计算结果：", result);
