const { spawn } = require('child_process');
const { McpClient } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');

async function connectToMCP() {
    try {
        console.log('Starting MCP client...');
        
        // Start the MCP server process
        const serverProcess = spawn('node', ['dist/talk_to_figma_mcp/server.js'], {
            stdio: ['pipe', 'pipe', 'pipe']
        });

        // Create MCP client with stdio transport
        const transport = new StdioClientTransport({
            command: 'node',
            args: ['dist/talk_to_figma_mcp/server.js']
        });

        const client = new McpClient({
            name: "figma-test-client",
            version: "1.0.0",
        }, {
            capabilities: {}
        });

        await client.connect(transport);
        console.log('Connected to MCP server');

        // List available tools
        const tools = await client.listTools();
        console.log('Available tools:', tools.tools.map(t => t.name));

        // Try to join the channel
        if (tools.tools.some(t => t.name === 'join_channel')) {
            console.log('Joining channel 1ke9ey1n...');
            const result = await client.callTool({
                name: 'join_channel',
                arguments: { channel: '1ke9ey1n' }
            });
            console.log('Join result:', result);

            // Now try to get document info
            console.log('Getting document info...');
            const docResult = await client.callTool({
                name: 'get_document_info',
                arguments: {}
            });
            console.log('Document info:', docResult);
        } else {
            console.log('join_channel tool not found!');
        }

        await client.close();
        serverProcess.kill();

    } catch (error) {
        console.error('Error:', error);
    }
}

connectToMCP(); 