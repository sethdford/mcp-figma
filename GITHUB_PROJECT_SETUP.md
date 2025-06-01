# GitHub Project Setup Guide

## 📋 Project Naming Updates

We've updated the project naming scheme to be more consistent and professional:

### Old vs New Names:
- **Project Name**: `cursor-talk-to-figma-mcp` → `@sethdouglasford/mcp-figma`
- **Package Name**: `ai-figma-mcp` → `@sethdouglasford/mcp-figma`
- **Plugin Name**: `AI Figma MCP Plugin` → `MCP Figma Plugin`
- **Repository**: Should be `github.com/sethford/@sethdouglasford/mcp-figma`

## 🔄 Required GitHub Repository Changes

### 1. Repository Setup
```bash
# If creating a new repository:
gh repo create @sethdouglasford/mcp-figma --public --description "MCP server for Figma integration with AI assistants"

# If renaming existing repository:
# Go to Settings → General → Repository name → Rename
```

### 2. Updated Package.json
- ✅ Repository URL: `https://github.com/sethford/@sethdouglasford/mcp-figma.git`
- ✅ Package name: `@sethdouglasford/mcp-figma`
- ✅ Binary name: `@sethdouglasford/mcp-figma`
- ✅ Author: `Seth Ford <seth@sethford.com>`

### 3. Installation Commands Updated
All setup scripts now use:
```bash
npx @sethdouglasford/mcp-figma@latest
```

### 4. File Updates Made
- ✅ `package.json` - Repository URL, name, bin, author
- ✅ `scripts/setup-*.sh` - Package name in all setup scripts
- ✅ `readme.md` - All package references updated
- ✅ `smithery.yaml` - Package name updated
- ✅ `src/cursor_mcp_plugin/manifest.json` - Plugin name and ID
- ✅ `src/cursor_mcp_plugin/ui.html` - All UI text updated
- ✅ `src/cursor_mcp_plugin/code.js` - Comments updated

## 🚀 Publishing Checklist

### NPM Publishing
```bash
# Test the package
npm run build
npm publish --dry-run

# Publish to NPM
npm publish
```

### GitHub Repository
1. **Create/rename repository** to `@sethdouglasford/mcp-figma`
2. **Update repository description**: "MCP server for Figma integration with AI assistants (Cursor, GitHub Copilot, Windsurf, Claude Desktop)"
3. **Add topics**: `mcp`, `figma`, `ai`, `cursor`, `copilot`, `windsurf`, `claude`, `model-context-protocol`
4. **Set up repository settings**:
   - Enable Issues
   - Enable Wiki (optional)
   - Set up branch protection for `main`

### Community Files
- ✅ **README.md** - Updated with new naming
- 📝 **LICENSE** - Already MIT
- 📝 **Contributing Guidelines** - Consider adding
- 📝 **Issue Templates** - Consider adding
- 📝 **Pull Request Template** - Consider adding

## 🎯 Final Result

Users will be able to install and use the package with:

```bash
# Install globally
npm install -g @sethdouglasford/mcp-figma

# Use with npx
npx @sethdouglasford/mcp-figma

# Setup scripts
npm run setup:cursor
npm run setup:windsurf
npm run setup:github-copilot
npm run setup:claude-desktop
```

## 📦 NPM Package Name

The package `@sethdouglasford/mcp-figma` is:
- ✅ Short and memorable
- ✅ Clearly indicates MCP + Figma
- ✅ Follows NPM naming conventions
- ✅ Available on NPM registry

This creates a clean, professional project structure that's easy for users to find and remember! 