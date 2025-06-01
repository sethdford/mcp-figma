# MCP Figma Extension for VS Code

A Visual Studio Code extension that provides seamless integration between AI assistants and Figma through the Model Context Protocol (MCP). This extension makes it incredibly easy to set up and manage the MCP Figma server, eliminating complex configuration steps.

## ✨ Features

- **🚀 One-Click Setup**: Automatically configure MCP for your AI assistant (Cursor, GitHub Copilot, Windsurf, Claude Desktop)
- **🔌 WebSocket Server Management**: Start/stop/restart the WebSocket server directly from VS Code
- **📊 Real-time Status**: Visual status indicators in the status bar and explorer panel
- **🎨 Figma Plugin Integration**: Direct links to install and configure the Figma plugin
- **📚 Built-in Documentation**: Quick access to guides, examples, and troubleshooting
- **🔧 Configuration Management**: Easy settings management through VS Code preferences
- **🧪 Connection Testing**: Built-in tools to test MCP and WebSocket connections

## 🎯 What is MCP Figma?

MCP Figma enables AI assistants to interact directly with Figma designs through 40+ powerful tools:

- **Document Reading**: Access file structure, pages, frames, and components
- **Element Creation**: Create shapes, text, frames, and components
- **Style Management**: Apply colors, fonts, effects, and layout properties
- **Advanced Operations**: Clone elements, create variants, manage plugins
- **Real-time Collaboration**: Join channels for live design collaboration

## 🚀 Quick Start

1. **Install Extension**: Install this VS Code extension
2. **Setup MCP**: Click "Setup MCP Server" and select your AI assistant
3. **Start Server**: Click "Start WebSocket Server" 
4. **Install Figma Plugin**: Follow the plugin installation guide
5. **Start Designing**: Use your AI assistant to control Figma!

## 📋 Requirements

- **Node.js** 18+ (for running the MCP server)
- **AI Assistant**: One of the supported assistants (Cursor, GitHub Copilot, Windsurf, Claude Desktop)
- **Figma**: Access to Figma (browser or desktop app)

## ⚙️ Configuration

The extension provides several configuration options:

| Setting | Description | Default |
|---------|-------------|---------|
| `mcpFigma.websocketPort` | WebSocket server port | 3055 |
| `mcpFigma.autoStartWebSocket` | Auto-start server on activation | false |
| `mcpFigma.enableStatusBar` | Show status bar indicator | true |
| `mcpFigma.aiAssistant` | Default AI assistant | cursor |

Access settings: `Ctrl/Cmd + ,` → Search "MCP Figma"

## 🎮 Usage

### Command Palette Commands

- `MCP Figma: Setup MCP Server` - Configure MCP for your AI assistant
- `MCP Figma: Start WebSocket Server` - Start the WebSocket server
- `MCP Figma: Stop WebSocket Server` - Stop the WebSocket server
- `MCP Figma: Show Connection Status` - Display detailed status information
- `MCP Figma: Test MCP Connection` - Test the MCP connection
- `MCP Figma: Open Documentation` - Access comprehensive documentation

### Explorer Panel

The extension adds an "MCP Figma" panel to the Explorer with:

- **WebSocket Server**: Server status and controls
- **MCP Configuration**: Setup and settings access
- **Figma Plugin**: Installation guides and resources
- **Documentation**: Quick access to help resources

### Status Bar

The status bar shows real-time connection status:
- ✅ **Connected**: Server running and ready
- ⚠️ **Starting**: Server is starting up
- ❌ **Disconnected**: Server not running
- ❌ **Error**: Connection or server error

## 🔧 Supported AI Assistants

### Cursor IDE
Configures `~/.cursor/mcp.json` automatically.

### GitHub Copilot (VS Code)
Adds MCP configuration to VS Code settings.

### Windsurf IDE  
Configures `~/.windsurf/mcp.json` automatically.

### Claude Desktop
Configures the appropriate Claude config file for your platform:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `~/AppData/Roaming/Claude/claude_desktop_config.json`  
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

### Manual Setup
Provides copy-paste configuration for other environments.

## 🎨 Figma Plugin Setup

1. **Automated**: Use "Open Figma Plugin Instructions" command
2. **Community**: Install from [Figma Community](https://www.figma.com/community/plugin/mcp-figma-plugin)
3. **Manual**: Import plugin manifest from your project directory

## 🔍 Troubleshooting

### Common Issues

**WebSocket Server Won't Start**
- Ensure port 3055 is available
- Check if the project is built (`npm run build`)
- Verify Node.js is installed and accessible

**MCP Configuration Not Working**
- Restart your AI assistant after configuration
- Check file permissions on config directories
- Use "Test MCP Connection" command

**Figma Plugin Not Connecting**
- Verify WebSocket server is running
- Check Figma plugin is installed and running
- Ensure both use the same channel name

### Getting Help

- 📚 [Full Documentation](https://github.com/sethdford/mcp-figma#readme)
- 🐛 [Report Issues](https://github.com/sethdford/mcp-figma/issues)
- 💬 [Community Discussions](https://github.com/sethdford/mcp-figma/discussions)

## 🚀 Development

To contribute to this extension:

```bash
# Clone the repository
git clone https://github.com/sethdford/mcp-figma.git
cd mcp-figma/vscode-extension

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch for changes
npm run watch

# Package extension
npm run package
```

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details.

## 🙏 Acknowledgments

- **Model Context Protocol**: Developed by Anthropic for AI-tool integration
- **Figma API**: Enabling powerful design automation
- **VS Code Extension API**: Making this integration possible

---

**Happy Designing with AI! 🎨✨** 