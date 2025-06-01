#!/bin/bash

echo "🐙 Setting up MCP Figma for GitHub Copilot..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo "✅ Dependencies installed!"
echo ""
echo "📋 Configuration for GitHub Copilot:"
echo ""
echo "🔹 For VS Code:"
echo "1. Open Command Palette (Cmd+Shift+P / Ctrl+Shift+P)"
echo "2. Type 'MCP: Add Server' and select it"
echo "3. Choose 'HTTP (sse)' as the server type"
echo "4. Enter MCP configuration:"
echo ""
echo '   {
     "mcpServers": {
       "TalkToFigma": {
         "command": "npx",
         "args": ["mcp-figma@latest"]
       }
     }
   }'
echo ""
echo "🔹 For JetBrains IDEs:"
echo "1. Click ⚙️ in the lower right corner"
echo "2. Select 'Edit settings'"
echo "3. Under MCP section, click 'Edit in mcp.json'"
echo "4. Add the same configuration as above"
echo ""
echo "🔹 For Eclipse:"
echo "1. Open Copilot Chat panel"
echo "2. Select 'Edit preferences'"
echo "3. Navigate to Copilot Chat → MCP"
echo "4. Add the JSON configuration"
echo ""
echo "🔹 For Xcode:"
echo "1. Open GitHub Copilot for Xcode extension"
echo "2. In agent mode, click the tools icon"
echo "3. Select 'Edit config'"
echo "4. Add the configuration to mcp.json"
echo ""
echo "📋 Final steps:"
echo "1. Start the WebSocket server: npm run socket"
echo "2. Install the MCP Figma Plugin in Figma"
echo "3. Connect the plugin to the WebSocket server (port 3055)"
echo "4. Use GitHub Copilot in your IDE to access MCP tools"
echo ""
echo "🎉 You're ready to use MCP Figma with GitHub Copilot!" 