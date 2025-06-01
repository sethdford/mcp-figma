const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..', '..'); // Moves up from vscode-extension/scripts to project root
const sourceDir = path.join(projectRoot, 'dist');
const targetDir = path.join(__dirname, '..', 'bundled-mcp-server');

async function bundleMcpServer() {
  try {
    // Ensure target directory exists and is clean
    if (fs.existsSync(targetDir)) {
      await fs.promises.rm(targetDir, { recursive: true, force: true });
    }
    await fs.promises.mkdir(targetDir, { recursive: true });
    console.log(`Created target directory: ${targetDir}`);

    // Files to copy
    const filesToCopy = [
      { from: path.join(sourceDir, 'socket.js'), to: path.join(targetDir, 'socket.js') },
      { from: path.join(sourceDir, 'socket.js.map'), to: path.join(targetDir, 'socket.js.map') },
      { from: path.join(sourceDir, 'talk_to_figma_mcp', 'server.js'), to: path.join(targetDir, 'server.js') },
      { from: path.join(sourceDir, 'talk_to_figma_mcp', 'server.js.map'), to: path.join(targetDir, 'server.js.map') },
    ];

    for (const file of filesToCopy) {
      if (fs.existsSync(file.from)) {
        await fs.promises.copyFile(file.from, file.to);
        console.log(`Copied ${file.from} to ${file.to}`);
      } else {
        console.error(`Source file not found: ${file.from}. Run 'npm run build' in the root directory first.`);
        process.exit(1);
      }
    }

    console.log('MCP server files bundled successfully for the VS Code extension.');
  } catch (err) {
    console.error('Error bundling MCP server files:', err);
    process.exit(1);
  }
}

bundleMcpServer(); 