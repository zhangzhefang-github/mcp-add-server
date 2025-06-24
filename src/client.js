import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const client = new Client({
  name: "test-client",
  version: "1.0.0"
});

/**
 * @type {StdioClientTransport}
 * StdioClientTransport an instance for client to communicate with child process via stdio.
 * The child process is `mcp-add-server` executed by `npx`.
 */
const transport = new StdioClientTransport({
  command: "npx",
  args: ["mcp-add-server"]
});

try {
  await client.connect(transport);

  const result = await client.callTool({
    name: "add",
    arguments: { a: 10, b: 5 }
  });

  console.log("计算结果：", result);
} catch (error) {
  console.error("发生错误:", error);
}
