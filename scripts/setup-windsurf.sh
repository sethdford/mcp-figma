#!/bin/bash

echo "🌊 Setting up MCP Figma for Windsurf..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo "✅ Dependencies installed!"
echo ""
echo "📋 Manual configuration required for Windsurf:"
echo ""
echo "1. Open Windsurf settings"
echo "2. Navigate to Cascade → MCP Servers"
echo "3. Click 'Add MCP Server'"
echo "4. Configure the server with:"
echo ""
echo "   Server Name: TalkToFigma"
echo "   Command: npx"
echo "   Args: @sethdouglasford/mcp-figma@latest"
echo ""
echo "5. Save the configuration"
echo "6. Start the WebSocket server: npm run socket"
echo "7. Install the MCP Figma Plugin in Figma"
echo "8. Connect the plugin to the WebSocket server (port 3055)"
echo "9. Use Cascade mode in Windsurf to access MCP tools"
echo ""
echo "🎉 You're ready to use MCP Figma with Windsurf!" 