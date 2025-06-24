# MCP Add Server

A minimal Model Context Protocol (MCP) server that provides a simple `add(a, b)` tool. This project serves as a basic example of an MCP server implementation.

<a href="https://glama.ai/mcp/servers/@zhangzhefang-github/mcp-add-server">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@zhangzhefang-github/mcp-add-server/badge" alt="Add Server MCP server" />
</a>

[![npm version](https://badge.fury.io/js/@zhefang%2Fmcp-add-server.svg)](https://badge.fury.io/js/@zhefang%2Fmcp-add-server)

## Features

*   Implements a Model Context Protocol compliant server.
*   Provides a single tool: `add(a, b)` which returns the sum of two numbers.
*   Available on npm for easy installation and use.

## 实际运行效果 (Showcase)

下图展示了 `mcp-add-server` 在 `mcp.so` 服务发现平台上的配置信息，以及一个兼容 MCP 的聊天机器人 (例如 Cherry Studio) 成功调用本服务器的 `add` 工具来执行加法运算的场景：

[![MCP Add Server in Action](./images/mcp-add-server-showcase.png)](./images/mcp-add-server-showcase.png)

*   **左侧**: `mcp-add-server` 在 `mcp.so` 上的信息，展示了其概述和启动配置。
*   **右侧**: 一个 MCP 客户端 (例如 Cherry Studio 这样的聊天机器人) 接收到用户关于加法的请求后，调用了 `@zhefang/mcp-add-server` 提供的 `add` 工具，并正确返回了计算结果。

这清晰地演示了遵循 Model Context Protocol 的服务器和客户端之间如何无缝集成和协作。

## Prerequisites

*   Node.js (version 18.x.x or higher recommended)
*   npm (comes with Node.js)

## Installation

### Quick Start (Recommended)

The easiest way to use this MCP server is with `npx`:

```bash
npx @zhefang/mcp-add-server
```

### Global Installation

For frequent use, install globally:

```bash
npm install -g @zhefang/mcp-add-server
```

Then run:
```bash
mcp-add-server
```

### Development Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/zhangzhefang-github/mcp-add-server.git
    cd mcp-add-server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run locally:
    ```bash
    npm start
    ```

## Usage

There are several ways to run the `mcp-add-server`:

**1. Using `npx` (Recommended for most users):**

```bash
npx @zhefang/mcp-add-server
```
This command will download the latest version of `@zhefang/mcp-add-server` and execute it.

**2. Global installation (for frequent use):**

```bash
npm install -g @zhefang/mcp-add-server
mcp-add-server
```

**3. Running from a cloned repository:**

After cloning the repository and installing dependencies:

```bash
npm start
```

**4. Local linking for development:**
In the project's root directory:
```bash
npm link
mcp-add-server
```

Once the server is running, it will be available to MCP clients via stdio transport.

## Client Example

The `src/client.js` file demonstrates how to connect to the server:

```javascript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "npx",
  args: ["@zhefang/mcp-add-server"]
});

// Connect and use the add tool
await client.connect(transport);
const result = await client.callTool({
  name: "add",
  arguments: { a: 10, b: 5 }
});
console.log("计算结果：", result);
```

### Example Tool Call (JSON)

```json
{
  "tool_name": "add",
  "arguments": {
    "a": 5,
    "b": 3
  }
}
```

The server responds with:
```json
{
  "content": [
    {
      "type": "text", 
      "text": "结果是：8"
    }
  ]
}
```

## Running Tests

*(When tests are added, describe how to run them here)*
```bash
npm test
```
*(Currently, `npm test` will output "Error: no test specified". Update the `test` script in `package.json` when tests are added.)*

## Project Structure

```
mcp-add-server/
├── .git/               # Git directory
├── .gitignore          # Specifies intentionally untracked files that Git should ignore
├── .cursor/            # Cursor specific files (if any)
├── node_modules/       # Project dependencies
├── src/                # Source code
│   └── server.js       # Main server logic
├── bin.js              # Executable for the server
├── LICENSE             # Project license
├── package-lock.json   # Records exact versions of dependencies
├── package.json        # Project metadata and dependencies
└── README.md           # This file
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the [MIT License](LICENSE).