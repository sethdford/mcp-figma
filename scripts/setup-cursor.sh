#!/bin/bash

echo "🎯 Setting up MCP Figma for Cursor..."

# Create .cursor directory if it doesn't exist
mkdir -p .cursor

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create mcp.json for Cursor
echo "⚙️ Creating Cursor MCP configuration..."
echo "{
  \"mcpServers\": {
    \"TalkToFigma\": {
      \"command\": \"npx\",
      \"args\": [
        \"@sethdouglasford/mcp-figma@latest\"
      ]
    }
  }
}" > .cursor/mcp.json

echo "✅ Cursor setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Start the WebSocket server: npm run socket"
echo "2. Restart Cursor"
echo "3. Switch to Agent mode in Cursor's chat interface"
echo "4. Install the MCP Figma Plugin in Figma"
echo "5. Connect the plugin to the WebSocket server (port 3055)"
echo ""
 