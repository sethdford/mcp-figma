import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

let statusBarItem: vscode.StatusBarItem;
let mcpFigmaTreeDataProvider: McpFigmaTreeDataProvider;

export function activate(context: vscode.ExtensionContext) {
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

    // Check if MCP is already configured
    checkMcpConfiguration();
}

export function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}

function createStatusBarItem(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('mcpFigma');
    if (!config.get('enableStatusBar')) {
        return;
    }

    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'mcpFigma.showStatus';
    updateStatusBarItem('configured');
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);
}

function updateStatusBarItem(status: 'configured' | 'not_configured' | 'error') {
    if (!statusBarItem) return;

    const icons: Record<string, string> = {
        configured: '$(check)',
        not_configured: '$(gear)',
        error: '$(error)'
    };

    const tooltips: Record<string, string> = {
        configured: 'MCP Figma: Configured (click to see details)',
        not_configured: 'MCP Figma: Not configured (click to setup)',
        error: 'MCP Figma: Error in configuration'
    };

    statusBarItem.text = `${icons[status]} MCP Figma`;
    statusBarItem.tooltip = tooltips[status];
}

function registerCommands(context: vscode.ExtensionContext) {
    const commandsToRegister = [
        { commandId: 'mcpFigma.setupMcpServer', handler: () => setupMcpServer(context) },
        { commandId: 'mcpFigma.openFigmaPlugin', handler: openFigmaPlugin },
        { commandId: 'mcpFigma.showStatus', handler: showStatus },
        { commandId: 'mcpFigma.openDocumentation', handler: openDocumentation },
        { commandId: 'mcpFigma.testConnection', handler: testConnection }
    ];

    commandsToRegister.forEach(cmd => {
        context.subscriptions.push(vscode.commands.registerCommand(cmd.commandId, cmd.handler));
    });
}

async function setupMcpServer(context: vscode.ExtensionContext) {
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

    if (!result) return;

    const selectedAssistant = result.value;
    
    try {
        const messageDetail = await configureMcpServer(selectedAssistant, context);
        vscode.window.showInformationMessage(
            `✅ MCP server configured for ${result.label}. ${messageDetail} Restart your AI assistant/IDE to use the new configuration.`,
            'Open Documentation'
        ).then((selection: string | undefined) => {
            if (selection === 'Open Documentation') {
                openDocumentation();
            }
        });
    } catch (error: any) {
        vscode.window.showErrorMessage(`Failed to configure MCP server: ${error.message}`);
    }
}

async function configureMcpServer(assistant: string, context: vscode.ExtensionContext) {
    const extensionPath = context.extensionPath;
    
    const baseMcpConfig = {
        "TalkToFigma": {
            "command": "node",
            "args": [path.join(extensionPath, "bundled-mcp-server", "server.js")]
        }
    };

    const npxMcpConfig = {
        "TalkToFigma": {
            "command": "npx",
            "args": ["@sethdouglasford/mcp-figma@latest"]
        }
    };

    let configToUse = baseMcpConfig;
    let messageDetail = "The bundled MCP server will be used.";

    switch (assistant) {
        case 'cursor':
            await configureCursor(configToUse);
            break;
        case 'github-copilot':
            await configureVSCode(configToUse);
            break;
        case 'windsurf':
            await configureWindsurf(configToUse);
            break;
        case 'claude-desktop':
            await configureClaudeDesktop(configToUse);
            break;
        case 'manual':
            await showManualConfiguration(configToUse, npxMcpConfig);
            messageDetail = "Manual configuration shown. For VS Code, use the node command. For other IDEs, npx is an option.";
            break;
        default:
            throw new Error(`Unsupported assistant: ${assistant}`);
    }
    return messageDetail;
}

async function configureCursor(mcpConfig: any) {
    const cursorConfigPath = path.join(os.homedir(), '.cursor', 'mcp.json');
    await ensureDirectoryExists(path.dirname(cursorConfigPath));
    
    let existingConfig: any = {};
    if (fs.existsSync(cursorConfigPath)) {
        try {
            existingConfig = JSON.parse(fs.readFileSync(cursorConfigPath, 'utf8'));
        } catch (error) {
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

async function configureVSCode(mcpConfig: any) {
    const config = vscode.workspace.getConfiguration();
    const currentMcpServers = config.get('mcp.servers') || {};
    const updatedMcpServers = {
        ...currentMcpServers,
        ...mcpConfig
    };
    await config.update('mcp.servers', updatedMcpServers, vscode.ConfigurationTarget.Global);
}

async function configureWindsurf(mcpConfig: any) {
    const windsurfConfigPath = path.join(os.homedir(), '.windsurf', 'mcp.json');
    await ensureDirectoryExists(path.dirname(windsurfConfigPath));
    
    let existingConfig: any = {};
    if (fs.existsSync(windsurfConfigPath)) {
        try {
            existingConfig = JSON.parse(fs.readFileSync(windsurfConfigPath, 'utf8'));
        } catch (error) {
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

async function configureClaudeDesktop(mcpConfig: any) {
    let claudeConfigPath: string;
    
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
    
    let existingConfig: any = {};
    if (fs.existsSync(claudeConfigPath)) {
        try {
            existingConfig = JSON.parse(fs.readFileSync(claudeConfigPath, 'utf8'));
        } catch (error) {
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

async function showManualConfiguration(bundledConfig: any, npxConfig: any) {
    const bundledJson = JSON.stringify({ mcpServers: bundledConfig }, null, 2);
    const npxJson = JSON.stringify({ mcpServers: npxConfig }, null, 2);

    const message = `For seamless integration with this VS Code extension, use the following configuration (points to the bundled server):

\`\`\`json
${bundledJson}
\`\`\`

If you need to configure an MCP client outside of this VS Code extension (e.g., in another IDE or a standalone tool), you can use the \`npx\` command (requires internet to fetch the package):

\`\`\`json
${npxJson}
\`\`\`

Ensure the package name in the npx command (\`@sethdouglasford/mcp-figma@latest\`) is correct if you are using a different or self-published version.`;

    const doc = await vscode.workspace.openTextDocument({ content: message, language: 'markdown' });
    await vscode.window.showTextDocument(doc);
}

async function ensureDirectoryExists(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
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

    const selection = await vscode.window.showInformationMessage(
        'Figma Plugin Installation Instructions',
        'Open Community Page',
        'Show Local Plugin',
        'Copy Instructions'
    );

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
                } else {
                    vscode.window.showErrorMessage('Plugin files not found in workspace');
                }
            } else {
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
    const config = vscode.workspace.getConfiguration('mcp');
    const mcpServers = config.get('servers') as { [key: string]: any } | undefined;
    const isConfigured = mcpServers && (mcpServers['TalkToFigma'] || mcpServers['TalkToFigmaLocal']);

    let statusMessage = "**MCP Figma Status**\n\n";
    if (isConfigured) {
        statusMessage += "✅ MCP Server is configured in VS Code settings.\n";
        statusMessage += "Ensure the Figma plugin is running and you have joined a channel via your AI assistant.\n";
        statusMessage += `Configuration: \`node ${mcpServers?.TalkToFigma?.args?.[0] || 'path/to/server.js'}\`\n`;
        updateStatusBarItem('configured');
    } else {
        statusMessage += "❌ MCP Server is NOT configured in VS Code settings.\n";
        statusMessage += "Use the \"Setup MCP Server\" command to configure it.\n";
        updateStatusBarItem('not_configured');
    }

    vscode.window.showInformationMessage(statusMessage, 'Setup MCP Server', 'Open Documentation').then(selection => {
        if (selection === 'Setup MCP Server') {
            vscode.commands.executeCommand('mcpFigma.setupMcpServer');
        } else if (selection === 'Open Documentation') {
            openDocumentation();
        }
    });
    mcpFigmaTreeDataProvider.refresh(); // Refresh tree view
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
    // Since the extension no longer directly manages the server process,
    // a direct "test" is harder. We can guide the user.
    vscode.window.showInformationMessage(
        'To test the MCP Figma connection:\n1. Ensure MCP server is configured (run "Setup MCP Server").\n2. Ensure the Figma plugin is open in Figma and you have a channel ID.\n3. Use your AI Assistant (e.g., Copilot Chat, Cursor) to run: "@TalkToFigma join_channel channel YOUR_CHANNEL_ID_HERE" then "@TalkToFigma get_document_info".\n4. Check the MCP server output/logs if issues arise.',
        { modal: true }
    );
}

async function checkMcpConfiguration() {
    const config = vscode.workspace.getConfiguration('mcp');
    const mcpServers = config.get('servers') as { [key: string]: any } | undefined;

    const isConfigured = mcpServers && (
        mcpServers['TalkToFigma'] || 
        mcpServers['TalkToFigmaLocal'] // Check for old or new name
    );

    if (isConfigured) {
        updateStatusBarItem('configured');
        console.log('MCP Figma server appears to be configured.');
    } else {
        updateStatusBarItem('not_configured');
        console.log('MCP Figma server not found in configuration.');
        
        // Check if we should prompt the user
        const memento = vscode.extensions.getExtension('sethdford.mcp-figma-extension')?.exports?.memento; // Assuming memento is exported
        if (memento && memento.get('dontShowSetupPrompt')) {
            return;
        }

        const selection = await vscode.window.showInformationMessage(
            'MCP server for Figma is not configured. Setup now?',
            'Setup Now', 'Don\'t Show Again'
        );

        if (selection === 'Setup Now') {
            vscode.commands.executeCommand('mcpFigma.setupMcpServer');
        } else if (selection === 'Don\'t Show Again') {
            // Store user preference
            if (memento) {
                memento.update('dontShowSetupPrompt', true);
            }
        }
    }
}

class McpFigmaTreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined | null | void> = new vscode.EventEmitter<TreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: TreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: TreeItem): Promise<TreeItem[]> {
        if (element) {
            // For sub-items if any (e.g. under 'status')
            return Promise.resolve([]);
        } else {
            // Root items
            const config = vscode.workspace.getConfiguration('mcp');
            const mcpServers = config.get('servers') as { [key: string]: any } | undefined;
            const isConfigured = mcpServers && (mcpServers['TalkToFigma'] || mcpServers['TalkToFigmaLocal']);
            
            const statusLabel = isConfigured ? 'Status: Configured' : 'Status: Not Configured';

            return Promise.resolve([
                new TreeItem(statusLabel, vscode.TreeItemCollapsibleState.None, 'status', 'mcpFigma.showStatus', new vscode.ThemeIcon(isConfigured ? 'symbol-event' : 'error')),
                new TreeItem('Setup MCP Server', vscode.TreeItemCollapsibleState.None, 'command', 'mcpFigma.setupMcpServer', new vscode.ThemeIcon('tools')),
                new TreeItem('Open Figma Plugin Instructions', vscode.TreeItemCollapsibleState.None, 'command', 'mcpFigma.openFigmaPlugin', new vscode.ThemeIcon('plug')),
                new TreeItem('Open Documentation', vscode.TreeItemCollapsibleState.None, 'command', 'mcpFigma.openDocumentation', new vscode.ThemeIcon('book')),
                new TreeItem('Test Connection Guide', vscode.TreeItemCollapsibleState.None, 'command', 'mcpFigma.testConnection', new vscode.ThemeIcon('beaker'))
            ]);
        }
    }
}

class TreeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly type: string, // e.g., 'status', 'command'
        public readonly commandId?: string,
        public readonly iconPath?: vscode.ThemeIcon
    ) {
        super(label, collapsibleState);
        this.tooltip = this.label;
        if (commandId) {
            this.command = { command: commandId, title: this.label };
        }
        this.iconPath = iconPath || (type === 'command' ? new vscode.ThemeIcon('chevron-right') : undefined);
    }
} 