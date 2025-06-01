const WebSocket = require('ws');

// Connect to the WebSocket server and join the channel
const ws = new WebSocket('ws://localhost:3055');

ws.on('open', function open() {
    console.log('🔌 Connected to WebSocket server');
    
    // Join the specific channel
    const joinMessage = {
        type: "join",
        channel: "1ke9ey1n"
    };
    
    console.log('📡 Joining channel: 1ke9ey1n');
    ws.send(JSON.stringify(joinMessage));
});

ws.on('message', function message(data) {
    const response = JSON.parse(data.toString());
    console.log('📨 Received:', response);
    
    if (response.type === 'system' && response.message && response.message.result) {
        console.log('✅ Successfully connected to Figma channel: 1ke9ey1n');
        console.log('🎉 MCP Figma tools are now ready to use!');
        console.log('');
        console.log('💬 You can now use these commands in your Cursor chat:');
        console.log('   "Get the document information from Figma"');
        console.log('   "What is currently selected in Figma?"');
        console.log('   "Read my design and describe the layout"');
        console.log('   "Create a blue rectangle at position 100,100"');
        console.log('');
        console.log('🔗 Channel connection will stay active...');
        console.log('⌨️  Press Ctrl+C to disconnect');
    }
});

ws.on('error', function error(err) {
    console.error('❌ WebSocket error:', err);
});

ws.on('close', function close() {
    console.log('🔌 Disconnected from WebSocket server');
    console.log('ℹ️  MCP tools will not work until reconnected');
});

// Keep the connection alive and handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Closing connection...');
    ws.close();
    process.exit();
});

console.log('🚀 Starting Figma MCP Channel Connection...'); 