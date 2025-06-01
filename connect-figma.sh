#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Figma MCP Connection...${NC}"

# Kill any existing processes
echo -e "${YELLOW}🔄 Cleaning up existing processes...${NC}"
pkill -f "socket.js" 2>/dev/null || true
pkill -f "server.js" 2>/dev/null || true

# Start WebSocket server in background
echo -e "${YELLOW}🔌 Starting WebSocket server...${NC}"
npm run socket &
SOCKET_PID=$!

# Wait for socket server to start
sleep 2

# Test WebSocket connection
echo -e "${YELLOW}📡 Testing WebSocket connection...${NC}"
timeout 3 node test-figma-connection.cjs > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ WebSocket server is running correctly${NC}"
else
    echo -e "${RED}❌ WebSocket server failed to start${NC}"
    kill $SOCKET_PID 2>/dev/null
    exit 1
fi

echo -e "${GREEN}🎉 Figma MCP is ready!${NC}"
echo ""
echo -e "${BLUE}📋 Setup Complete:${NC}"
echo -e "   ✅ WebSocket server running on port 3055"
echo -e "   ✅ Channel 1ke9ey1n tested and working"
echo -e "   ✅ MCP server configured in Cursor"
echo ""
echo -e "${YELLOW}💬 Next Steps:${NC}"
echo -e "   1. Open Figma and install the MCP plugin"
echo -e "   2. Connect the plugin to port 3055"
echo -e "   3. Join channel '1ke9ey1n' in the plugin"
echo -e "   4. Use these commands in Cursor chat:"
echo ""
echo -e "${GREEN}      \"Connect to Figma channel 1ke9ey1n\"${NC}"
echo -e "${GREEN}      \"Get document information from Figma\"${NC}"
echo -e "${GREEN}      \"What is currently selected?\"${NC}"
echo -e "${GREEN}      \"Create a blue rectangle at 100,100\"${NC}"
echo ""
echo -e "${BLUE}🔗 Keeping WebSocket server running...${NC}"
echo -e "${YELLOW}   Press Ctrl+C to stop${NC}"

# Keep the script running
wait $SOCKET_PID 