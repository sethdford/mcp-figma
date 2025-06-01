const WebSocket = require('ws');

// Connect to the WebSocket server and join channel bh5o6f9d
const ws = new WebSocket('ws://localhost:3055');

ws.on('open', function open() {
    console.log('🔌 Connected to WebSocket server');
    
    // Join the specific channel
    const joinMessage = {
        type: "join",
        channel: "bh5o6f9d"
    };
    
    console.log('📡 Joining channel: bh5o6f9d');
    ws.send(JSON.stringify(joinMessage));
});

ws.on('message', function message(data) {
    const response = JSON.parse(data.toString());
    console.log('📨 Received:', response);
    
    if (response.type === 'system' && response.message && response.message.result) {
        console.log('✅ Successfully connected to Figma channel: bh5o6f9d');
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
}); 