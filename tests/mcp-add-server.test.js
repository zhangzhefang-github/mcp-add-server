// tests/mcp-add-server.test.js
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { jest, describe, test, expect } from '@jest/globals';

// Increase default timeout for tests as starting a server can take time
jest.setTimeout(15000); // 15 seconds timeout for all tests in this file

describe("MCP Add Server", () => {
  const serverExecutable = "./bin.js"; // Path to the server executable

  test("should connect to the server, call the add tool, and receive the correct sum", async () => {
    const client = new Client({
      name: "jest-test-client",
      version: "1.0.0",
    });

    const transport = new StdioClientTransport({
      command: "node", // Use 'node' to execute the .js file
      args: [serverExecutable], // Arguments to 'node'
    });

    let connectionError = null;
    try {
      await client.connect(transport);
    } catch (error) {
      console.error("Failed to connect client to transport:", error);
      connectionError = error;
    }
    expect(connectionError).toBeNull(); // Ensure client connected without errors

    let toolCallResult;
    let toolCallError = null;
    try {
      toolCallResult = await client.callTool({
        name: "add",
        arguments: { a: 10, b: 5 },
      });
    } catch (error) {
      console.error("Error calling tool 'add':", error);
      toolCallError = error;
    }
    expect(toolCallError).toBeNull(); // Ensure tool call was successful

    expect(toolCallResult).toBeDefined();
    expect(toolCallResult.content).toBeDefined();
    expect(Array.isArray(toolCallResult.content)).toBe(true);
    expect(toolCallResult.content.length).toBeGreaterThan(0);
    
    const firstContentItem = toolCallResult.content[0];
    expect(firstContentItem).toBeDefined();
    expect(firstContentItem.type).toBe("text");
    expect(firstContentItem.text).toBe("结果是：15");

    // Clean up: disconnect the client.
    // The StdioClientTransport should handle shutting down the server process it started.
    if (client.isConnected) {
      await client.disconnect();
    }
  });

  test("should handle another add operation with different numbers", async () => {
    const client = new Client({
      name: "jest-test-client-2",
      version: "1.0.0",
    });

    const transport = new StdioClientTransport({
      command: "node",
      args: [serverExecutable],
    });
    
    await client.connect(transport);

    const result = await client.callTool({
      name: "add",
      arguments: { a: 7, b: 3 },
    });

    expect(result.content[0].text).toBe("结果是：10");

    if (client.isConnected) {
      await client.disconnect();
    }
  });

  // You can add more test cases here, for example, testing invalid inputs, etc.
  // For instance, if 'add' should handle non-numeric inputs gracefully (e.g. by schema validation error)
  // test("should return an error for non-numeric inputs", async () => { ... });
}); 