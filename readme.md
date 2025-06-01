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
- `src/cursor_mcp_plugin/` - Figma plugin for communicating with AI assistants (Cursor, GitHub Copilot, Windsurf, Claude Desktop, etc.)
- `src/socket.ts` - WebSocket server that facilitates communication between the MCP server and Figma plugin

## Quick Setup Guide

### Prerequisites

1. **Node.js** version 18 or higher:
```bash
node --version
```

2. **AI Assistant** with MCP support (see compatibility list above)

3. **Figma Plugin** - Install from [Figma community page](https://www.figma.com/community/plugin/1485687494525374295/mcp-figma-plugin) or [install locally](#figma-plugin)

### Installation

1. **Setup the project:**
```bash
npm run setup
```

2. **Start the WebSocket server:**
```bash
npm run socket
```

3. **Start the MCP server:**
```bash
npx mcp-figma
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
         "args": ["mcp-figma@latest"]
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
        "args": ["mcp-figma@latest"]
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
         "args": ["mcp-figma@latest"]
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
         "args": ["mcp-figma@latest"]
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
         "args": ["mcp-figma@latest"]
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
         "args": ["mcp-figma@latest"]
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

## Manual Setup and Installation

### MCP Server: Integration with Cursor

Add the server to your Cursor MCP configuration in `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "TalkToFigma": {
      "command": "npx",
      "args": ["mcp-figma@latest"]
    }
  }
}
```

### WebSocket Server

Start the WebSocket server:

```bash
npm run socket
```

### Figma Plugin

1. In Figma, go to Plugins > Development > New Plugin
2. Choose "Link existing plugin"
3. Select the `src/cursor_mcp_plugin/manifest.json` file
4. The plugin should now be available in your Figma development plugins

## Advanced Configuration

### Repository-Level Configuration

For **GitHub Copilot coding agent**, you can configure MCP servers at the repository level:

1. **Navigate to your repository settings on GitHub**
2. **Go to Copilot → Coding agent**
3. **Add MCP configuration:**
   ```json
   {
     "mcpServers": {
       "TalkToFigma": {
         "command": "npx",
         "args": ["mcp-figma@latest"],
         "tools": ["*"]
       }
     }
   }
   ```

### Environment Variables

For enhanced functionality, you can set environment variables:

```bash
# Optional: Custom WebSocket port
export FIGMA_WEBSOCKET_PORT=3055

# Optional: Debug mode
export DEBUG=true
```

## Troubleshooting

### Common Issues

1. **MCP Server not found**
   - Ensure Node.js is installed and `npx` is available
   - Try running `npx mcp-figma` manually

2. **WebSocket connection failed**
   - Check if the socket server is running: `npm run socket`
   - Verify the port 3055 is not blocked

3. **AI Assistant not recognizing tools**
   - Make sure you're in **Agent mode** (not Ask mode)
   - Restart your IDE after adding MCP configuration
   - Check the MCP server status in settings

4. **Permission issues**
   - Ensure the Figma plugin is installed and running
   - Check that the plugin has proper permissions

## Windows + WSL Guide

1. **Install Node.js in WSL:**
```bash
node --version
npm --version
```

2. **Update socket configuration** in `src/socket.ts`:
```typescript
// Uncomment this line for WSL
const HOST = "0.0.0.0";
// const HOST = "localhost";
```

3. **Start the WebSocket server:**
```bash
npm run socket
```

## Usage

1. Start the WebSocket server
2. Install the MCP server in Cursor
3. Open Figma and run the Cursor MCP Plugin
4. Connect the plugin to the WebSocket server by joining a channel using `join_channel`
5. Use Cursor to communicate with Figma using the MCP tools

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
   cd src/cursor_mcp_plugin
   ```

2. Edit code.js and ui.html

### Building the Project

To build the TypeScript files:

```bash
npm run build
```

To watch for changes during development:

```bash
npm run dev
```

## Best Practices

When working with the Figma MCP:

1. Always join a channel before sending commands
2. Get document overview using `get_document_info` first
3. Check current selection with `get_selection` before modifications
4. Use appropriate creation tools based on needs:
   - `create_frame` for containers
   - `create_rectangle` for basic shapes
   - `create_text` for text elements
5. Verify changes using `get_node_info`
6. Use component instances when possible for consistency
7. Handle errors appropriately as all commands can throw exceptions
8. For large designs:
   - Use chunking parameters in `scan_text_nodes`
   - Monitor progress through WebSocket updates
   - Implement appropriate error handling
9. For text operations:
   - Use batch operations when possible
   - Consider structural relationships
   - Verify changes with targeted exports
10. For converting legacy annotations:
    - Scan text nodes to identify numbered markers and descriptions
    - Use `scan_nodes_by_types` to find UI elements that annotations refer to
    - Match markers with their target elements using path, name, or proximity
    - Categorize annotations appropriately with `get_annotations`
    - Create native annotations with `set_multiple_annotations` in batches
    - Verify all annotations are properly linked to their targets
    - Delete legacy annotation nodes after successful conversion
11. Visualize prototype noodles as FigJam connectors:

- Use `get_reactions` to extract prototype flows,
- set a default connector with `set_default_connector`,
- and generate connector lines with `create_connections` for clear visual flow mapping.

## License

MIT
