# Publishing Guide: AI Figma MCP

## 📦 Package Name Change

We've renamed the package from `cursor-talk-to-figma-mcp` to **`ai-figma-mcp`** because the original name was already taken on npm.

## 🚀 Publishing to npm

### 1. Prerequisites

- **npm account**: Create one at [npmjs.com](https://www.npmjs.com)
- **npm CLI**: Make sure you're logged in

```bash
npm login
```

### 2. Pre-Publishing Checklist

- ✅ Package name is unique (`ai-figma-mcp`)
- ✅ Version is set correctly (`1.0.0`)
- ✅ All files are built (`npm run build`)
- ✅ Package.json has correct metadata
- ✅ README is updated with new package name

### 3. Publish the Package

```bash
# Dry run to see what will be published
npm publish --dry-run

# Actually publish
npm publish
```

### 4. Post-Publishing

After publishing, users can install with:

```bash
# Global installation
npm install -g ai-figma-mcp

# Or use directly with npx
npx ai-figma-mcp
```

## 🔄 Alternative: Local Installation

If you don't want to publish to npm yet, you can use local installation methods:

### Option 1: Local npm link

```bash
# In your project directory
npm link

# Users can then link to it globally
npm link ai-figma-mcp
```

### Option 2: Direct path reference

Update MCP configurations to use the local path:

```json
{
  "mcpServers": {
    "TalkToFigma": {
      "command": "node",
      "args": ["/path/to/your/project/dist/talk_to_figma_mcp/server.js"]
    }
  }
}
```

### Option 3: GitHub installation

If you push to GitHub, users can install directly:

```bash
npx github:yourusername/ai-figma-mcp
```

Update MCP configs to use:
```json
{
  "mcpServers": {
    "TalkToFigma": {
      "command": "npx",
      "args": ["github:yourusername/ai-figma-mcp"]
    }
  }
}
```

## 📋 Documentation Updates Needed

### If you publish to npm:
- ✅ Already done! All configs now use `ai-figma-mcp`

### If you use GitHub installation:
- Update all `ai-figma-mcp@latest` references to `github:yourusername/ai-figma-mcp`

### If you use local paths:
- Update all configs to use absolute paths to your built server

## 🎯 Recommended Approach

**For public use**: Publish to npm with the new name `ai-figma-mcp`

**For personal/team use**: Use GitHub installation method

**For development**: Use local npm link method

## 🔧 Configuration Updates by AI Assistant

After publishing, users will configure their AI assistants like this:

### Cursor
```json
{
  "mcpServers": {
    "TalkToFigma": {
      "command": "npx",
      "args": ["ai-figma-mcp@latest"]
    }
  }
}
```

### GitHub Copilot (VS Code)
```json
{
  "mcp": {
    "servers": {
      "TalkToFigma": {
        "command": "npx",
        "args": ["ai-figma-mcp@latest"]
      }
    }
  }
}
```

### Windsurf
```json
{
  "servers": {
    "TalkToFigma": {
      "command": "npx",
      "args": ["ai-figma-mcp@latest"]
    }
  }
}
```

### Claude Desktop
```json
{
  "mcpServers": {
    "TalkToFigma": {
      "command": "npx",
      "args": ["ai-figma-mcp@latest"]
    }
  }
}
```

## 🎉 Next Steps

1. **Choose your distribution method** (npm, GitHub, or local)
2. **Update package.json** with your details (repository URL, author)
3. **Test the installation** with a fresh environment
4. **Share with the community!**

The package is now ready for distribution with broad AI assistant compatibility! 🚀 