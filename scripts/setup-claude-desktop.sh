#!/bin/bash

echo "🤖 Setting up MCP Figma for Claude Desktop..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Detect OS and set config path
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    CONFIG_DIR="$HOME/Library/Application Support/Claude"
    CONFIG_FILE="$CONFIG_DIR/claude_desktop_config.json"
    echo "📍 Detected macOS"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows
    CONFIG_DIR="$APPDATA/Claude"
    CONFIG_FILE="$CONFIG_DIR/claude_desktop_config.json"
    echo "📍 Detected Windows"
else
    # Linux/other
    CONFIG_DIR="$HOME/.config/claude"
    CONFIG_FILE="$CONFIG_DIR/claude_desktop_config.json"
    echo "📍 Detected Linux/Unix"
fi

# Create config directory if it doesn't exist
mkdir -p "$CONFIG_DIR"

# Create or update Claude Desktop config
echo "⚙️ Creating Claude Desktop MCP configuration..."

if [ -f "$CONFIG_FILE" ]; then
    echo "📝 Existing config found, creating backup..."
    cp "$CONFIG_FILE" "${CONFIG_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
fi

echo "{
  \"mcpServers\": {
    \"TalkToFigma\": {
      \"command\": \"npx\",
      \"args\": [
        \"mcp-figma@latest\"
      ]
    }
  }
}" > "$CONFIG_FILE"

echo "✅ Claude Desktop setup complete!"
echo ""
echo "📍 Configuration saved to: $CONFIG_FILE"
echo ""
echo "📋 Next steps:"
echo "1. Start the WebSocket server: npm run socket"
echo "2. Restart Claude Desktop"
echo "3. Install the MCP Figma Plugin in Figma"
echo "4. Connect the plugin to the WebSocket server (port 3055)"
echo "5. MCP tools will appear automatically in Claude Desktop"
echo ""
echo "🎉 You're ready to use MCP Figma with Claude Desktop!" 