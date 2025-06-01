const WebSocket = require('ws');

// Connect to the WebSocket server
const ws = new WebSocket('ws://localhost:3055');

ws.on('open', function open() {
    console.log('Connected to WebSocket server');
    
    // Join the specific channel
    const joinMessage = {
        type: "join",
        channel: "1ke9ey1n"
    };
    
    console.log('Joining channel: 1ke9ey1n');
    ws.send(JSON.stringify(joinMessage));
});

ws.on('message', function message(data) {
    const response = JSON.parse(data.toString());
    console.log('Received:', response);
    
    if (response.type === 'system' && response.message && response.message.result) {
        console.log('✅ Successfully connected to Figma channel: 1ke9ey1n');
        console.log('Channel connection established. You can now use MCP tools with Figma.');
        
        // Test getting document info
        setTimeout(() => {
            const testMessage = {
                type: "message",
                channel: "1ke9ey1n",
                message: {
                    id: "test-123",
                    command: "get_document_info",
                    params: {}
                }
            };
            console.log('Testing document info...');
            ws.send(JSON.stringify(testMessage));
        }, 1000);
    }
});

ws.on('error', function error(err) {
    console.error('WebSocket error:', err);
});

ws.on('close', function close() {
    console.log('Disconnected from WebSocket server');
});

// Keep the script running
process.on('SIGINT', () => {
    console.log('\nClosing connection...');
    ws.close();
    process.exit();
}); 