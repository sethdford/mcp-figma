"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const child_process_1 = require("child_process");
let statusBarItem;
let webSocketProcess = null;
let mcpFigmaTreeDataProvider;
function activate(context) {
    console.log('MCP Figma extension is now active!');
    // Initialize tree data provider
    mcpFigmaTreeDataProvider = new McpFigmaTreeDataProvider();
    vscode.window.registerTreeDataProvider('mcpFigmaView', mcpFigmaTreeDataProvider);
    // Set context for view
    vscode.commands.executeCommand('setContext', 'mcpFigma.enabled', true);
    // Create status bar item
    createStatusBarItem(context);
    // Register commands
    registerCommands(context);
    // Auto-start WebSocket if configured
    const config = vscode.workspace.getConfiguration('mcpFigma');
    if (config.get('autoStartWebSocket')) {
        startWebSocketServer();
    }
    // Check if MCP is already configured
    checkMcpConfiguration();
}
function deactivate() {
    if (webSocketProcess) {
        webSocketProcess.kill();
    }
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}
function createStatusBarItem(context) {
    const config = vscode.workspace.getConfiguration('mcpFigma');
    if (!config.get('enableStatusBar')) {
        return;
    }
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'mcpFigma.showStatus';
    updateStatusBarItem('disconnected');
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);
}
function updateStatusBarItem(status) {
    if (!statusBarItem)
        return;
    const icons = {
        connected: '$(check)',
        disconnected: '$(circle-outline)',
        starting: '$(loading~spin)',
        error: '$(error)'
    };
    const colors = {
        connected: '#4CAF50',
        disconnected: '#9E9E9E',
        starting: '#FF9800',
        error: '#F44336'
    };
    statusBarItem.text = `${icons[status]} MCP Figma`;
    statusBarItem.color = colors[status];
    statusBarItem.tooltip = `MCP Figma Status: ${status}`;
}
function registerCommands(context) {
    const commands = [
        vscode.commands.registerCommand('mcpFigma.setupMcpServer', setupMcpServer),
        vscode.commands.registerCommand('mcpFigma.startWebSocketServer', startWebSocketServer),
        vscode.commands.registerCommand('mcpFigma.stopWebSocketServer', stopWebSocketServer),
        vscode.commands.registerCommand('mcpFigma.restartWebSocketServer', restartWebSocketServer),
        vscode.commands.registerCommand('mcpFigma.openFigmaPlugin', openFigmaPlugin),
        vscode.commands.registerCommand('mcpFigma.showStatus', showStatus),
        vscode.commands.registerCommand('mcpFigma.openDocumentation', openDocumentation),
        vscode.commands.registerCommand('mcpFigma.testConnection', testConnection)
    ];
    commands.forEach(command => context.subscriptions.push(command));
}
async function setupMcpServer() {
    const result = await vscode.window.showQuickPick([
        {
            label: '$(gear) Cursor',
            description: 'Configure MCP for Cursor IDE',
            detail: 'Adds MCP server to Cursor configuration',
            value: 'cursor'
        },
        {
            label: '$(github) GitHub Copilot',
            description: 'Configure MCP for VS Code with GitHub Copilot',
            detail: 'Adds MCP server to VS Code settings',
            value: 'github-copilot'
        },
        {
            label: '$(wind) Windsurf',
            description: 'Configure MCP for Windsurf IDE',
            detail: 'Adds MCP server to Windsurf configuration',
            value: 'windsurf'
        },
        {
            label: '$(browser) Claude Desktop',
            description: 'Configure MCP for Claude Desktop',
            detail: 'Adds MCP server to Claude Desktop configuration',
            value: 'claude-desktop'
        },
        {
            label: '$(tools) Manual Setup',
            description: 'Show manual configuration instructions',
            detail: 'Display configuration JSON for manual setup',
            value: 'manual'
        }
    ], {
        placeHolder: 'Select your AI assistant to configure MCP server',
        ignoreFocusOut: true
    });
    if (!result)
        return;
    const selectedAssistant = result.value;
    try {
        await configureMcpServer(selectedAssistant);
        vscode.window.showInformationMessage(`✅ MCP server configured for ${result.label}. Restart your AI assistant to use the new configuration.`, 'Open Documentation').then((selection) => {
            if (selection === 'Open Documentation') {
                openDocumentation();
            }
        });
    }
    catch (error) {
        vscode.window.showErrorMessage(`Failed to configure MCP server: ${error}`);
    }
}
async function configureMcpServer(assistant) {
    const mcpConfig = {
        "TalkToFigma": {
            "command": "npx",
            "args": ["@sethdouglasford/mcp-figma@latest"]
        }
    };
    switch (assistant) {
        case 'cursor':
            await configureCursor(mcpConfig);
            break;
        case 'github-copilot':
            await configureVSCode(mcpConfig);
            break;
        case 'windsurf':
            await configureWindsurf(mcpConfig);
            break;
        case 'claude-desktop':
            await configureClaudeDesktop(mcpConfig);
            break;
        case 'manual':
            await showManualConfiguration(mcpConfig);
            break;
        default:
            throw new Error(`Unsupported assistant: ${assistant}`);
    }
}
async function configureCursor(mcpConfig) {
    const cursorConfigPath = path.join(os.homedir(), '.cursor', 'mcp.json');
    await ensureDirectoryExists(path.dirname(cursorConfigPath));
    let existingConfig = {};
    if (fs.existsSync(cursorConfigPath)) {
        try {
            existingConfig = JSON.parse(fs.readFileSync(cursorConfigPath, 'utf8'));
        }
        catch (error) {
            console.warn('Failed to parse existing Cursor config:', error);
        }
    }
    const updatedConfig = {
        ...existingConfig,
        mcpServers: {
            ...existingConfig.mcpServers,
            ...mcpConfig
        }
    };
    fs.writeFileSync(cursorConfigPath, JSON.stringify(updatedConfig, null, 2));
}
async function configureVSCode(mcpConfig) {
    const config = vscode.workspace.getConfiguration();
    const existingMcp = config.get('mcp') || {};
    const updatedMcp = {
        ...existingMcp,
        servers: {
            ...existingMcp.servers,
            ...mcpConfig
        }
    };
    await config.update('mcp', updatedMcp, vscode.ConfigurationTarget.Global);
}
async function configureWindsurf(mcpConfig) {
    const windsurfConfigPath = path.join(os.homedir(), '.windsurf', 'mcp.json');
    await ensureDirectoryExists(path.dirname(windsurfConfigPath));
    let existingConfig = {};
    if (fs.existsSync(windsurfConfigPath)) {
        try {
            existingConfig = JSON.parse(fs.readFileSync(windsurfConfigPath, 'utf8'));
        }
        catch (error) {
            console.warn('Failed to parse existing Windsurf config:', error);
        }
    }
    const updatedConfig = {
        ...existingConfig,
        servers: {
            ...existingConfig.servers,
            ...mcpConfig
        }
    };
    fs.writeFileSync(windsurfConfigPath, JSON.stringify(updatedConfig, null, 2));
}
async function configureClaudeDesktop(mcpConfig) {
    let claudeConfigPath;
    switch (os.platform()) {
        case 'darwin':
            claudeConfigPath = path.join(os.homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');
            break;
        case 'win32':
            claudeConfigPath = path.join(os.homedir(), 'AppData', 'Roaming', 'Claude', 'claude_desktop_config.json');
            break;
        default:
            claudeConfigPath = path.join(os.homedir(), '.config', 'Claude', 'claude_desktop_config.json');
    }
    await ensureDirectoryExists(path.dirname(claudeConfigPath));
    let existingConfig = {};
    if (fs.existsSync(claudeConfigPath)) {
        try {
            existingConfig = JSON.parse(fs.readFileSync(claudeConfigPath, 'utf8'));
        }
        catch (error) {
            console.warn('Failed to parse existing Claude config:', error);
        }
    }
    const updatedConfig = {
        ...existingConfig,
        mcpServers: {
            ...existingConfig.mcpServers,
            ...mcpConfig
        }
    };
    fs.writeFileSync(claudeConfigPath, JSON.stringify(updatedConfig, null, 2));
}
async function showManualConfiguration(mcpConfig) {
    const configText = JSON.stringify({ mcpServers: mcpConfig }, null, 2);
    const document = await vscode.workspace.openTextDocument({
        content: configText,
        language: 'json'
    });
    await vscode.window.showTextDocument(document);
    vscode.window.showInformationMessage('Copy this configuration to your AI assistant\'s MCP configuration file', 'Copy to Clipboard').then((selection) => {
        if (selection === 'Copy to Clipboard') {
            vscode.env.clipboard.writeText(configText);
            vscode.window.showInformationMessage('Configuration copied to clipboard!');
        }
    });
}
async function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}
async function startWebSocketServer() {
    if (webSocketProcess) {
        vscode.window.showWarningMessage('WebSocket server is already running');
        return;
    }
    updateStatusBarItem('starting');
    try {
        const config = vscode.workspace.getConfiguration('mcpFigma');
        const port = config.get('websocketPort') || 3055;
        // Find the workspace root or use the extension path
        const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        const socketScriptPath = workspaceRoot ?
            path.join(workspaceRoot, 'dist', 'socket.js') :
            path.join(__dirname, '..', '..', 'dist', 'socket.js');
        if (!fs.existsSync(socketScriptPath)) {
            throw new Error(`Socket script not found at ${socketScriptPath}. Please run 'npm run build' first.`);
        }
        webSocketProcess = (0, child_process_1.spawn)('node', [socketScriptPath], {
            env: { ...process.env, PORT: port.toString() },
            cwd: workspaceRoot || __dirname
        });
        webSocketProcess.stdout?.on('data', (data) => {
            console.log(`WebSocket Server: ${data}`);
            if (data.toString().includes('listening on port')) {
                updateStatusBarItem('connected');
                vscode.commands.executeCommand('setContext', 'mcpFigma.webSocketRunning', true);
                mcpFigmaTreeDataProvider.refresh();
            }
        });
        webSocketProcess.stderr?.on('data', (data) => {
            console.error(`WebSocket Server Error: ${data}`);
        });
        webSocketProcess.on('close', (code) => {
            console.log(`WebSocket server exited with code ${code}`);
            webSocketProcess = null;
            updateStatusBarItem('disconnected');
            vscode.commands.executeCommand('setContext', 'mcpFigma.webSocketRunning', false);
            mcpFigmaTreeDataProvider.refresh();
        });
        webSocketProcess.on('error', (error) => {
            console.error('Failed to start WebSocket server:', error);
            webSocketProcess = null;
            updateStatusBarItem('error');
            vscode.window.showErrorMessage(`Failed to start WebSocket server: ${error.message}`);
        });
        vscode.window.showInformationMessage(`🚀 WebSocket server starting on port ${port}...`);
    }
    catch (error) {
        updateStatusBarItem('error');
        vscode.window.showErrorMessage(`Failed to start WebSocket server: ${error}`);
    }
}
async function stopWebSocketServer() {
    if (!webSocketProcess) {
        vscode.window.showWarningMessage('WebSocket server is not running');
        return;
    }
    webSocketProcess.kill();
    webSocketProcess = null;
    updateStatusBarItem('disconnected');
    vscode.commands.executeCommand('setContext', 'mcpFigma.webSocketRunning', false);
    mcpFigmaTreeDataProvider.refresh();
    vscode.window.showInformationMessage('🛑 WebSocket server stopped');
}
async function restartWebSocketServer() {
    await stopWebSocketServer();
    // Wait a moment before restarting
    setTimeout(() => {
        startWebSocketServer();
    }, 1000);
}
async function openFigmaPlugin() {
    const message = `To install the Figma plugin:

1. **Option 1: From Figma Community (Recommended)**
   - Visit: https://www.figma.com/community/plugin/mcp-figma-plugin
   - Click "Install"

2. **Option 2: Manual Installation**
   - In Figma: Plugins → Development → Import plugin from manifest
   - Select the manifest.json file from your project

3. **Usage**
   - Run the plugin in Figma
   - Join a channel to connect with your AI assistant
   - Use your AI assistant to control Figma through MCP

Need help? Check the documentation for detailed setup instructions.`;
    const selection = await vscode.window.showInformationMessage('Figma Plugin Installation Instructions', 'Open Community Page', 'Show Local Plugin', 'Copy Instructions');
    switch (selection) {
        case 'Open Community Page':
            vscode.env.openExternal(vscode.Uri.parse('https://www.figma.com/community/plugin/mcp-figma-plugin'));
            break;
        case 'Show Local Plugin':
            const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
            if (workspaceRoot) {
                const pluginPath = path.join(workspaceRoot, 'src', 'mcp_plugin');
                if (fs.existsSync(pluginPath)) {
                    vscode.commands.executeCommand('revealFileInOS', vscode.Uri.file(pluginPath));
                }
                else {
                    vscode.window.showErrorMessage('Plugin files not found in workspace');
                }
            }
            else {
                vscode.window.showErrorMessage('No workspace found');
            }
            break;
        case 'Copy Instructions':
            vscode.env.clipboard.writeText(message);
            vscode.window.showInformationMessage('Instructions copied to clipboard!');
            break;
    }
}
async function showStatus() {
    const config = vscode.workspace.getConfiguration('mcpFigma');
    const port = config.get('websocketPort') || 3055;
    const isRunning = webSocketProcess !== null;
    const status = `**MCP Figma Status**

🔌 **WebSocket Server**: ${isRunning ? '✅ Running' : '❌ Stopped'}
🌐 **Port**: ${port}
⚙️ **AI Assistant**: ${config.get('aiAssistant')}
📦 **Auto Start**: ${config.get('autoStartWebSocket') ? 'Enabled' : 'Disabled'}

${isRunning ? '✨ Ready to connect with Figma!' : '⚠️ Start the WebSocket server to begin'}`;
    const selection = await vscode.window.showInformationMessage(status, ...(isRunning ? ['Test Connection', 'Stop Server'] : ['Start Server']), 'Open Settings');
    switch (selection) {
        case 'Start Server':
            startWebSocketServer();
            break;
        case 'Stop Server':
            stopWebSocketServer();
            break;
        case 'Test Connection':
            testConnection();
            break;
        case 'Open Settings':
            vscode.commands.executeCommand('workbench.action.openSettings', 'mcpFigma');
            break;
    }
}
async function openDocumentation() {
    const selection = await vscode.window.showQuickPick([
        {
            label: '$(book) Full Documentation',
            description: 'Complete setup and usage guide',
            url: 'https://github.com/sethdford/mcp-figma#readme'
        },
        {
            label: '$(rocket) Quick Start Guide',
            description: 'Get started in 5 minutes',
            url: 'https://github.com/sethdford/mcp-figma#quick-setup-guide'
        },
        {
            label: '$(tools) MCP Tools Reference',
            description: 'All available MCP tools and commands',
            url: 'https://github.com/sethdford/mcp-figma#mcp-tools'
        },
        {
            label: '$(question) Troubleshooting',
            description: 'Common issues and solutions',
            url: 'https://github.com/sethdford/mcp-figma#troubleshooting'
        },
        {
            label: '$(video) Demo Video',
            description: 'Watch MCP Figma in action',
            url: 'https://www.linkedin.com/posts/sonnylazuardi_just-wanted-to-share-my-latest-experiment-activity-7307821553654657024-yrh8'
        }
    ], {
        placeHolder: 'Choose documentation to open',
        ignoreFocusOut: true
    });
    if (selection) {
        vscode.env.openExternal(vscode.Uri.parse(selection.url));
    }
}
async function testConnection() {
    if (!webSocketProcess) {
        vscode.window.showWarningMessage('WebSocket server is not running. Start it first.');
        return;
    }
    const config = vscode.workspace.getConfiguration('mcpFigma');
    const port = config.get('websocketPort') || 3055;
    try {
        // Test WebSocket connection
        const WebSocket = require('ws');
        const ws = new WebSocket(`ws://localhost:${port}`);
        ws.on('open', () => {
            vscode.window.showInformationMessage('✅ WebSocket connection successful!');
            ws.close();
        });
        ws.on('error', (error) => {
            vscode.window.showErrorMessage(`❌ WebSocket connection failed: ${error.message}`);
        });
    }
    catch (error) {
        vscode.window.showErrorMessage(`❌ Connection test failed: ${error}`);
    }
}
async function checkMcpConfiguration() {
    // Check if MCP is configured in the current environment
    const config = vscode.workspace.getConfiguration();
    const mcpConfig = config.get('mcp');
    if (!mcpConfig || !mcpConfig.servers?.TalkToFigma) {
        // Show notification to set up MCP
        const selection = await vscode.window.showInformationMessage('🎨 MCP Figma is not configured. Set it up now to start using AI-powered Figma automation!', 'Setup Now', 'Don\'t Show Again');
        if (selection === 'Setup Now') {
            setupMcpServer();
        }
        else if (selection === 'Don\'t Show Again') {
            // Store user preference
            await config.update('mcpFigma.hideSetupNotification', true, vscode.ConfigurationTarget.Global);
        }
    }
}
class McpFigmaTreeDataProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (!element) {
            // Root items
            return Promise.resolve([
                new TreeItem('WebSocket Server', vscode.TreeItemCollapsibleState.Expanded, 'server'),
                new TreeItem('MCP Configuration', vscode.TreeItemCollapsibleState.Expanded, 'config'),
                new TreeItem('Figma Plugin', vscode.TreeItemCollapsibleState.Expanded, 'plugin'),
                new TreeItem('Documentation', vscode.TreeItemCollapsibleState.Collapsed, 'docs')
            ]);
        }
        else if (element.type === 'server') {
            const isRunning = webSocketProcess !== null;
            return Promise.resolve([
                new TreeItem(isRunning ? '✅ Running' : '❌ Stopped', vscode.TreeItemCollapsibleState.None, 'status', isRunning ? 'mcpFigma.stopWebSocketServer' : 'mcpFigma.startWebSocketServer'),
                new TreeItem('Test Connection', vscode.TreeItemCollapsibleState.None, 'test', 'mcpFigma.testConnection')
            ]);
        }
        else if (element.type === 'config') {
            return Promise.resolve([
                new TreeItem('Setup MCP Server', vscode.TreeItemCollapsibleState.None, 'setup', 'mcpFigma.setupMcpServer'),
                new TreeItem('Open Settings', vscode.TreeItemCollapsibleState.None, 'settings', 'workbench.action.openSettings')
            ]);
        }
        else if (element.type === 'plugin') {
            return Promise.resolve([
                new TreeItem('Installation Guide', vscode.TreeItemCollapsibleState.None, 'guide', 'mcpFigma.openFigmaPlugin')
            ]);
        }
        else if (element.type === 'docs') {
            return Promise.resolve([
                new TreeItem('Open Documentation', vscode.TreeItemCollapsibleState.None, 'docs', 'mcpFigma.openDocumentation')
            ]);
        }
        return Promise.resolve([]);
    }
}
class TreeItem extends vscode.TreeItem {
    constructor(label, collapsibleState, type, commandId) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.type = type;
        this.commandId = commandId;
        this.tooltip = this.label;
        if (commandId) {
            this.command = {
                command: commandId,
                title: this.label
            };
        }
        // Set icons based on type
        switch (type) {
            case 'server':
                this.iconPath = new vscode.ThemeIcon('server');
                break;
            case 'config':
                this.iconPath = new vscode.ThemeIcon('gear');
                break;
            case 'plugin':
                this.iconPath = new vscode.ThemeIcon('extensions');
                break;
            case 'docs':
                this.iconPath = new vscode.ThemeIcon('book');
                break;
            case 'status':
                this.iconPath = new vscode.ThemeIcon(webSocketProcess ? 'check' : 'circle-outline');
                break;
            default:
                this.iconPath = new vscode.ThemeIcon('circle-outline');
        }
    }
}
//# sourceMappingURL=extension.js.map