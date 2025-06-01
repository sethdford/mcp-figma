# MCP Figma

This project implements a Model Context Protocol (MCP) integration between AI coding assistants (Cursor, GitHub Copilot, Windsurf) and Figma, allowing AI assistants to communicate with Figma for reading designs and modifying them programmatically.

## AI Assistant Compatibility

This MCP server works with all major AI-powered coding assistants:

- ✅ **Cursor** - Full MCP support with Agent mode
- ✅ **GitHub Copilot** (VS Code, JetBrains, Eclipse, Xcode) - Native MCP support
- ✅ **Windsurf** - Built-in MCP integration with Cascade agent
- ✅ **Claude Desktop** - Anthropic's flagship MCP client
- ✅ **VS Code** with GitHub Copilot extension
- ✅ **Zed** - Early MCP adopter
- ✅ **Neovim** - Via MCP plugin

https://github.com/user-attachments/assets/129a14d2-ed73-470f-9a4c-2240b2a4885c

## Project Structure

- `src/talk_to_figma_mcp/` - TypeScript MCP server for Figma integration
- `src/mcp_plugin/` - Figma plugin for communicating with AI assistants (Cursor, GitHub Copilot, Windsurf, Claude Desktop, etc.)
- `src/socket.ts` - WebSocket server that facilitates communication between the MCP server and Figma plugin (started automatically by the MCP server)

## Quick Setup Guide

### Prerequisites

1. **Node.js** version 18 or higher:
```bash
node --version
```

2. **AI Assistant** with MCP support (see compatibility list above)

3. **Figma Plugin** - Install from [Figma community page](https://www.figma.com/community/plugin/1485687494525374295/mcp-figma-plugin) or [install locally](#figma-plugin)

### Installation

1. **Setup the project (downloads dependencies and builds):**
```bash
npm run setup
```

2. **Start the MCP server (this will also start the WebSocket server automatically):**
```bash
npx ai-figma-mcp
```

## AI Assistant Configuration

### GitHub Copilot (VS Code, JetBrains, Eclipse, Xcode)

GitHub Copilot has native MCP support across all major IDEs.

#### Visual Studio Code

**Method 1: Using VS Code UI (Recommended)**

1. Open Command Palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Windows/Linux)
2. Type **"MCP: Add Server"** and select it
3. Choose `HTTP (sse)` as the server type
4. Enter MCP configuration:
   ```json
   {
     "mcpServers": {
       "TalkToFigma": {
         "command": "npx",
         "args": ["ai-figma-mcp@latest"]
       }
     }
   }
   ```

**Method 2: Manual Configuration**

Add to your VS Code `settings.json`:
```json
{
  "mcp": {
    "servers": {
      "TalkToFigma": {
        "command": "npx",
        "args": ["ai-figma-mcp@latest"]
      }
    }
  }
}
```

#### JetBrains IDEs

1. Click ⚙️ in the lower right corner
2. Select "Edit settings"
3. Under MCP section, click "Edit in `mcp.json`"
4. Add configuration:
   ```json
   {
     "servers": {
       "TalkToFigma": {
         "command": "npx",
         "args": ["ai-figma-mcp@latest"]
       }
     }
   }
   ```

#### Eclipse

1. Open Copilot Chat panel (click Copilot icon in status bar)
2. Select "Edit preferences"
3. Navigate to Copilot Chat → MCP
4. Add the same JSON configuration as above

#### Xcode

1. Open GitHub Copilot for Xcode extension
2. In agent mode, click the tools icon
3. Select "Edit config"
4. Add the configuration to `mcp.json`

### Cursor

Cursor has excellent MCP support with Agent mode.

1. **Open Cursor settings** (`Cmd+,` on macOS, `Ctrl+,` on Windows/Linux)
2. **Navigate to MCP configuration**
3. **Add server configuration:**
   ```json
   {
     "mcpServers": {
       "TalkToFigma": {
         "command": "npx",
         "args": ["ai-figma-mcp@latest"]
       }
     }
   }
   ```
4. **Restart Cursor**
5. **Switch to Agent mode** in the chat interface
6. **The MCP tools will appear automatically** in the available tools list

### Windsurf

Windsurf has native MCP support with its Cascade agent.

1. **Open Windsurf settings**
2. **Navigate to Cascade → MCP Servers**
3. **Click "Add MCP Server"**
4. **Configure the server:**
   ```json
   {
     "servers": {
       "TalkToFigma": {
         "command": "npx",
         "args": ["ai-figma-mcp@latest"]
       }
     }
   }
   ```
5. **The server will appear in your MCP tools** in Cascade mode

### Claude Desktop

1. **Locate Claude Desktop config file:**
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%/Claude/claude_desktop_config.json`

2. **Add MCP server configuration:**
   ```json
   {
     "mcpServers": {
       "TalkToFigma": {
         "command": "npx",
         "args": ["ai-figma-mcp@latest"]
       }
     }
   }
   ```

3. **Restart Claude Desktop**

## Usage Examples

Once configured, you can use natural language to interact with Figma through your AI assistant:

### Getting Started
```
"Join the Figma channel 'vblckgfu' and tell me about the current design"
```

### Reading Designs
```
"What elements are currently selected in Figma?"
"Read the design and describe the layout structure"
"Get information about all text nodes in the current design"
```

### Design Analysis
```
"Analyze the current Figma design and suggest improvements"
"What colors are being used in this design?"
"Check if there are any accessibility issues with the text contrast"
```

### Design Modifications
```
"Change the background color of the selected frame to blue"
"Update all heading text to use a larger font size"
"Create a new button component with consistent styling"
```

### Annotations and Documentation
```
"Add annotations to explain the design decisions"
"Create documentation for this component library"
"Scan for any missing annotations in the design system"
```

## Quick Video Tutorial

[Video Link](https://www.linkedin.com/posts/sonnylazuardi_just-wanted-to-share-my-latest-experiment-activity-7307821553654657024-yrh8)

## Design Automation Example

**Bulk text content replacement**

Thanks to [@dusskapark](https://github.com/dusskapark) for contributing the bulk text replacement feature. Here is the [demo video](https://www.youtube.com/watch?v=j05gGT3xfCs).

**Instance Override Propagation**
Another contribution from [@dusskapark](https://github.com/dusskapark)
Propagate component instance overrides from a source instance to multiple target instances with a single command. This feature dramatically reduces repetitive design work when working with component instances that need similar customizations. Check out our [demo video](https://youtu.be/uvuT8LByroI).

## Development Setup

### Building from Source

If you want to build from source or contribute to the project:

1. **Clone the repository:**
```bash
git clone https://github.com/your-repo/ai-figma-mcp.git
cd ai-figma-mcp
```

2. **Install dependencies and build:**
```bash
npm run setup
```

3. **For local development, you can point directly to the built server:**
```json
{
  "mcpServers": {
    "TalkToFigmaLocal": {
      "command": "node",
      "args": ["/path/to/your/project/dist/talk_to_figma_mcp/server.js"]
    }
  }
}
```
Replace `/path/to/your/project/` with the actual absolute path to this cloned repository.

### Figma Plugin

**Option 1: From Figma Community (Recommended)**
1. Go to [MCP Figma Plugin on Figma Community](https://www.figma.com/community/plugin/1485687494525374295/mcp-figma-plugin)
2. Click "Install"
3. The plugin will be available in your Figma plugins menu

**Option 2: Manual Installation (Development)**
1. In Figma, go to Plugins > Development > New Plugin
2. Choose "Link existing plugin"
3. Select the `src/mcp_plugin/manifest.json` file from this project.
4. The plugin should now be available in your Figma development plugins.

## Usage

1. **Start the MCP Server**: Run `npx ai-figma-mcp` in your terminal. This also starts the WebSocket server.
2. **Configure your AI Assistant**: Follow the instructions in the "AI Assistant Configuration" section for your specific assistant to recognize the MCP server.
3. **Open Figma and run the MCP Figma Plugin**: Find it in your plugins list.
4. **Connect**: In your AI assistant, use a command like `"Join Figma channel abcdefg"` (replace `abcdefg` with the channel ID displayed in the Figma plugin).
5. **Interact**: Start giving commands to your AI assistant to interact with Figma.

## Advanced Configuration

### Repository-Level Configuration (GitHub Copilot)

For **GitHub Copilot coding agent**, you can configure MCP servers at the repository level:

1. **Navigate to your repository settings on GitHub**
2. **Go to Copilot → Coding agent**
3. **Add MCP configuration:**
   ```json
   {
     "mcpServers": {
       "TalkToFigma": {
         "command": "npx",
         "args": ["ai-figma-mcp@latest"],
         "tools": ["*"]
       }
     }
   }
   ```

### Environment Variables

The MCP server respects the following environment variables:

- `FIGMA_WEBSOCKET_PORT`: (Optional) Custom port for the WebSocket server. Defaults to `3055`.
  ```bash
  export FIGMA_WEBSOCKET_PORT=3056
  ```
- `DEBUG`: (Optional) Set to `true` for more verbose logging from the MCP server.
  ```bash
  export DEBUG=true
  ```
If you are running the MCP server via `npx`, these variables should be set in the environment where you run the `npx` command.

## Troubleshooting

### Common Issues

1.  **MCP Server not found or `npx` command fails:**
    *   Ensure Node.js (v18+) is installed and that `npx` is available in your system's PATH.
    *   Try running `npx ai-figma-mcp --version` manually in your terminal to see if it executes.
    *   If you've recently published or updated the package, there might be a delay for the npm registry. Try `npx ai-figma-mcp@latest` or `npm cache clean --force` then try `npx` again.

2.  **WebSocket connection failed / No connection to Figma plugin:**
    *   **Check MCP Server Logs**: The MCP server (e.g., `npx @sethdouglasford/mcp-figma`) automatically starts the WebSocket server. Examine the console output from the MCP server for any errors related to "Socket script not found", "Starting WebSocket server", or "WebSocket server process exited".
    *   **Port Conflicts**: Ensure the port `3055` (or your configured `FIGMA_WEBSOCKET_PORT`) is not being used by another application. You can check this with `lsof -i :3055` (macOS/Linux) or `netstat -ano | findstr "3055"` (Windows).
    *   **Firewall**: Verify that your firewall is not blocking connections on the WebSocket port.
    *   **Figma Plugin Channel**: Double-check that the channel ID you used with the `join_channel` command in your AI assistant matches the channel ID displayed in the Figma plugin UI.
    *   **WSL Issues**: If using Windows Subsystem for Linux (WSL), see the "Windows + WSL Guide".

3.  **AI Assistant not recognizing tools / MCP server not listed:**
    *   **Correct Configuration**: Double-check the JSON configuration in your AI assistant's settings. Typos in the command (`npx`), package name (`@sethdouglasford/mcp-figma`), or arguments can cause issues.
    *   **Agent Mode**: Ensure your AI assistant is in "Agent" or "Tools" mode, not just a simple "Chat" or "Ask" mode.
    *   **Restart Assistant/IDE**: After adding or modifying the MCP configuration, restart your AI assistant or IDE (Cursor, VS Code, etc.).
    *   **MCP Server Status**: Some assistants might show the status of connected MCP servers in their settings or a dedicated panel. Check if "TalkToFigma" (or the name you used) is listed and if there are any error messages.

4.  **Permission issues with Figma Plugin:**
    *   Ensure the MCP Figma Plugin is installed and actively running in your Figma file.
    *   The plugin needs to be the active window/context in Figma for some operations.

## Windows + WSL Guide

If you are running the MCP server (Node.js part) within WSL and Figma on Windows:

1.  **Node.js in WSL**: Ensure Node.js v18+ is installed in your WSL distribution.
    ```bash
    node --version
    npm --version
    ```
2.  **Host Configuration for WebSocket Server**:
    The WebSocket server (`src/socket.ts`) by default listens on `localhost`. When running the MCP server in WSL and the Figma plugin on Windows, the plugin needs to connect to WSL's IP address.
    *   Modify `src/socket.ts` in your local project:
        ```typescript
        // const HOST = process.env.WS_HOST || 'localhost';
        const HOST = process.env.WS_HOST || '0.0.0.0'; // Change 'localhost' to '0.0.0.0'
        ```
    *   Rebuild the project: `npm run build`.
    *   When you run the MCP server (e.g., `npx ai-figma-mcp`), it will now use the `socket.js` that listens on `0.0.0.0`.
3.  **Figma Plugin Connection**:
    *   In the Figma plugin, when it asks for the WebSocket server address, you'll need to provide the IP address of your WSL instance. You can find this by running `hostname -I` in your WSL terminal.
    *   For example, if `hostname -I` gives `172.23.x.x`, you'd enter `ws://172.23.x.x:3055` (or your configured port) into the Figma plugin.
    *   **Alternatively**: Instead of modifying the plugin, if your `npx` command runs the server from your WSL environment, the MCP server will start the socket server within WSL. The Figma plugin on Windows then needs to connect to `ws://<WSL_IP_ADDRESS>:<PORT>`. The `join_channel` command from your AI assistant (which also runs in WSL or connects to the MCP server in WSL) will correctly interact with this setup. The crucial part is that the Figma plugin on Windows must be able to reach the WebSocket server running inside WSL.
4.  **Port Forwarding (If needed)**:
    In some WSL setups, you might need to explicitly forward the port from Windows to WSL.
    ```powershell
    # Run in PowerShell as Administrator on Windows
    netsh interface portproxy add v4tov4 listenport=3055 listenaddress=0.0.0.0 connectport=3055 connectaddress=<Your_WSL_IP_Address>
    ```
    And to remove it:
    ```powershell
    netsh interface portproxy delete v4tov4 listenport=3055 listenaddress=0.0.0.0
    ```
    Replace `<Your_WSL_IP_Address>` with the actual IP of your WSL instance.

The primary change here is that the `npm run socket` step is removed from the "Windows + WSL Guide" because the MCP server handles starting the socket server. The instruction to modify `src/socket.ts` to listen on `0.0.0.0` is still relevant for WSL scenarios if users are building from source and need the WebSocket server to be accessible from Windows. If they are using the `npx` published package, they cannot directly modify `src/socket.ts`. The `FIGMA_WEBSOCKET_HOST` environment variable would be a better way to control this for the packaged version, which we should add to `socket.ts`.

## MCP Tools

The MCP server provides the following tools for interacting with Figma:

### Document & Selection

- `get_document_info` - Get information about the current Figma document
- `get_selection` - Get information about the current selection
- `read_my_design` - Get detailed node information about the current selection without parameters
- `get_node_info` - Get detailed information about a specific node
- `get_nodes_info` - Get detailed information about multiple nodes by providing an array of node IDs

### Annotations

- `get_annotations` - Get all annotations in the current document or specific node
- `set_annotation` - Create or update an annotation with markdown support
- `set_multiple_annotations` - Batch create/update multiple annotations efficiently
- `scan_nodes_by_types` - Scan for nodes with specific types (useful for finding annotation targets)

### Prototyping & Connections

- `get_reactions` - Get all prototype reactions from nodes with visual highlight animation
- `set_default_connector` - Set a copied FigJam connector as the default connector style for creating connections (must be set before creating connections)
- `create_connections` - Create FigJam connector lines between nodes, based on prototype flows or custom mapping

### Creating Elements

- `create_rectangle` - Create a new rectangle with position, size, and optional name
- `create_frame` - Create a new frame with position, size, and optional name
- `create_text` - Create a new text node with customizable font properties

### Modifying text content

- `scan_text_nodes` - Scan text nodes with intelligent chunking for large designs
- `set_text_content` - Set the text content of a single text node
- `set_multiple_text_contents` - Batch update multiple text nodes efficiently

### Auto Layout & Spacing

- `set_layout_mode` - Set the layout mode and wrap behavior of a frame (NONE, HORIZONTAL, VERTICAL)
- `set_padding` - Set padding values for an auto-layout frame (top, right, bottom, left)
- `set_axis_align` - Set primary and counter axis alignment for auto-layout frames
- `set_layout_sizing` - Set horizontal and vertical sizing modes for auto-layout frames (FIXED, HUG, FILL)
- `set_item_spacing` - Set distance between children in an auto-layout frame

### Styling

- `set_fill_color` - Set the fill color of a node (RGBA)
- `set_stroke_color` - Set the stroke color and weight of a node
- `set_corner_radius` - Set the corner radius of a node with optional per-corner control

### Layout & Organization

- `move_node` - Move a node to a new position
- `resize_node` - Resize a node with new dimensions
- `delete_node` - Delete a node
- `delete_multiple_nodes` - Delete multiple nodes at once efficiently
- `clone_node` - Create a copy of an existing node with optional position offset

### Components & Styles

- `get_styles` - Get information about local styles
- `get_local_components` - Get information about local components
- `create_component_instance` - Create an instance of a component
- `get_instance_overrides` - Extract override properties from a selected component instance
- `set_instance_overrides` - Apply extracted overrides to target instances

### Export & Advanced

- `export_node_as_image` - Export a node as an image (PNG, JPG, SVG, or PDF) - limited support on image currently returning base64 as text

### Connection Management

- `join_channel` - Join a specific channel to communicate with Figma

### MCP Prompts

The MCP server includes several helper prompts to guide you through complex design tasks:

- `design_strategy` - Best practices for working with Figma designs
- `read_design_strategy` - Best practices for reading Figma designs
- `text_replacement_strategy` - Systematic approach for replacing text in Figma designs
- `annotation_conversion_strategy` - Strategy for converting manual annotations to Figma's native annotations
- `swap_overrides_instances` - Strategy for transferring overrides between component instances in Figma
- `reaction_to_connector_strategy` - Strategy for converting Figma prototype reactions to connector lines using the output of 'get_reactions', and guiding the use 'create_connections' in sequence

## Development

### Building the Figma Plugin

1. Navigate to the Figma plugin directory:
   ```
   cd src/mcp_plugin
   ```
2. Edit `code.js` and `ui.html`.

### Building the Project

To build the TypeScript files for the MCP server and WebSocket server:
```bash
npm run build
```
This will output files to the `dist` directory.

To watch for changes and rebuild automatically during development:
```bash
npm run dev
```

## Best Practices

When working with the Figma MCP:

1.  Always join a channel before sending commands to ensure the MCP server is connected to the correct Figma plugin instance.
2.  Get an overview of the document using `get_document_info` first.
3.  Check the current selection with `get_selection` before making modifications intended for selected items.
4.  Use the appropriate creation tools based on needs:
    *   `create_frame` for containers that might hold other elements or use auto-layout.
    *   `create_rectangle` for basic vector shapes.
    *   `create_text` for text elements.
5.  Verify changes using `get_node_info` or by visually inspecting Figma.
6.  Utilize component instances (`create_component_instance`, `get_instance_overrides`, `set_instance_overrides`) for design consistency and efficiency.
7.  Handle potential errors gracefully, as all commands can throw exceptions (e.g., if a node ID is not found, or parameters are invalid).
8.  For large designs:
    *   Use chunking parameters if available in tools like `scan_text_nodes`.
    *   Monitor progress messages if provided by the tool for long operations.
9.  For text operations:
    *   Use batch operations like `set_multiple_text_contents` when possible for better performance.
10. For converting legacy annotations:
    *   Scan text nodes to identify markers and descriptions.
    *   Use `scan_nodes_by_types` to find UI elements that annotations refer to.
    *   Match markers with their target elements.
    *   Categorize annotations appropriately.
    *   Create native annotations with `set_multiple_annotations` in batches.
11. Visualize prototype interactions as FigJam connectors:
    *   Use `get_reactions` to extract prototype flows.
    *   Set a default connector style using `set_default_connector` (by copying a FigJam connector first).
    *   Generate connector lines with `create_connections`.

## License

MIT