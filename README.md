# MCP Add Server

A minimal Model Context Protocol (MCP) server that provides a simple `add(a, b)` tool. This project serves as a basic example of an MCP server implementation.

## Features

*   Implements a Model Context Protocol compliant server.
*   Provides a single tool: `add(a, b)` which returns the sum of two numbers.

## Prerequisites

*   Node.js (version 18.x.x or higher recommended)
*   npm (comes with Node.js)

## Installation

1.  Clone the repository:
    ```bash
    git clone <你的仓库URL> # 当你推送到 GitHub 后，替换这里的 URL
    cd mcp-add-server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

## Usage

To start the server, run:

```bash
npm start
```
*(Note: You will need to add a `start` script to your `package.json`. See the suggestion below.)*

Alternatively, if you have linked the binary (e.g., after `npm link` or global installation):
```bash
mcp-add-server
```

Once the server is running, it will be available to MCP clients.

### Example Tool Call (Conceptual)

An MCP client could call the `add` tool like this (specifics depend on the client implementation):

```json
{
  "tool_name": "add",
  "arguments": {
    "a": 5,
    "b": 3
  }
}
```

The server would respond with:
```json
{
  "result": 8
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
