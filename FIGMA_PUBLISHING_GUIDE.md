# Figma Plugin Publishing Guide

## 📦 **Publishing MCP Figma Plugin to Figma Community**

### **Required Assets for Publication**

#### **1. Plugin Icon (Required)**
- **Size**: 128x128px PNG or SVG
- **Style**: Clean, professional, represents the plugin's function
- **Location**: Root of plugin folder
- **Filename**: `icon.png` or `icon.svg`

#### **2. Cover Image (Required)**
- **Size**: 1920x960px
- **Format**: PNG or JPG
- **Purpose**: Main banner shown in community listing
- **Content**: Should showcase the plugin's main features

#### **3. Screenshots (Optional but Recommended)**
- **Size**: Various sizes supported
- **Count**: 2-5 screenshots showing key features
- **Content**: 
  - Connection interface
  - Plugin in action with AI assistant
  - Before/after design examples

#### **4. Plugin Description**
- **Title**: "MCP Figma Plugin"
- **Tagline**: Short description (under 50 characters)
- **Description**: Detailed explanation of functionality
- **Tags**: Relevant keywords (automation, AI, productivity, etc.)

### **Current Plugin Files Status**
✅ `manifest.json` - Ready
✅ `code.js` - Ready  
✅ `ui.html` - Ready
✅ `setcharacters.js` - Ready
❌ `icon.png` - **NEEDED**
❌ Cover image - **NEEDED**
❌ Screenshots - **RECOMMENDED**

### **Step-by-Step Publishing Process**

#### **Phase 1: Asset Creation**
1. **Create Plugin Icon**
   ```bash
   # Create a 128x128px icon representing MCP/AI connectivity
   # Suggested design: Figma logo + AI/connection elements
   # Save as: src/mcp_plugin/icon.png
   ```

2. **Create Cover Image**
   ```bash
   # Create a 1920x960px banner image
   # Show: Figma + AI assistant integration
   # Include: Plugin interface, connection flow
   # Save as: figma-assets/cover-image.png
   ```

3. **Take Screenshots**
   ```bash
   # Screenshots of:
   # - Plugin connection interface
   # - AI assistant interacting with Figma
   # - Before/after design automation examples
   # Save as: figma-assets/screenshots/
   ```

#### **Phase 2: Manifest Updates**
Update manifest.json if needed:
```json
{
  "name": "MCP Figma Plugin",
  "id": "mcp-figma-plugin",
  "api": "1.0.0",
  "main": "code.js",
  "ui": "ui.html",
  "editorType": ["figma", "figjam"],
  "permissions": [],
  "networkAccess": {
    "allowedDomains": ["https://google.com"],
    "devAllowedDomains": ["http://localhost:3055", "ws://localhost:3055"]
  },
  "documentAccess": "dynamic-page",
  "enableProposedApi": true,
  "enablePrivatePluginApi": true
}
```

#### **Phase 3: Submission Process**

1. **Login to Figma**
   - Go to [figma.com](https://figma.com)
   - Ensure you're logged into your Figma account

2. **Access Plugin Publishing**
   - Go to `Community` → `Publish plugins`
   - Or visit: https://www.figma.com/community/publish

3. **Upload Plugin**
   - Click "Publish a plugin"
   - Upload your `manifest.json` file
   - Figma will automatically detect and bundle all referenced files

4. **Fill Plugin Details**
   - **Name**: MCP Figma Plugin
   - **Tagline**: "Connect Figma to AI assistants for automated design"
   - **Category**: Productivity (Primary) or Developer Tools (Secondary)
   - **Description**: 
     ```
     🤖 Transform your design workflow with AI automation

     Connect your favorite AI assistants directly to Figma for unprecedented design automation capabilities. This plugin bridges the gap between design and development by enabling AI tools to read, modify, and enhance your Figma designs in real-time.

     ✨ Key Features:
     • Universal AI Integration - Works with Cursor, GitHub Copilot, Windsurf, Claude Desktop, Zed, and more
     • Real-time Design Automation - Modify layouts, update text, and create components instantly
     • Intelligent Design Reading - AI can analyze your designs and provide insights
     • Bulk Operations - Update multiple elements, replace text content, and propagate changes efficiently
     • Component Management - Create instances, apply overrides, and manage design systems
     • Annotation Support - Generate and manage design annotations programmatically
     • Layout Automation - Auto-layout configuration, spacing, and alignment controls

     🎯 Perfect for:
     - Developers building design systems and converting designs to code
     - Designers who want to automate repetitive tasks and maintain consistency
     - Product Teams streamlining design-to-development handoffs
     - AI Enthusiasts exploring the future of design automation

     ⚡ Getting Started:
     1. Install the MCP server: npm install -g @sethdouglasford/mcp-figma
     2. Configure your AI assistant with MCP support
     3. Run the WebSocket bridge: npm run socket
     4. Start automating your designs with natural language commands!

     🔧 Compatible AI Assistants:
     ✅ Cursor (Agent mode)
     ✅ GitHub Copilot (VS Code, JetBrains, Eclipse, Xcode)
     ✅ Windsurf (Cascade agent)
     ✅ Claude Desktop
     ✅ Zed, Neovim, and other MCP-compatible tools

     🌟 Example Use Cases:
     - "Update all heading text to use the new brand font"
     - "Create a consistent button component with proper spacing"
     - "Analyze this design for accessibility issues"
     - "Generate documentation for this component library"

     🔒 Privacy & Security:
     - All communication happens locally through WebSocket
     - No data is sent to external servers
     - Open source and transparent

     Ready to supercharge your design workflow? Install now and experience the future of AI-powered design automation!

     📚 Documentation: https://github.com/sethdford/mcp-figma
     ```
   - **Tags**: ai, automation, mcp, cursor, copilot, windsurf, claude, productivity, development, design-system, workflow, api, integration, real-time, component, layout, text-replacement, annotation

5. **Upload Assets**
   - **Icon**: Upload your 128x128px icon
   - **Cover Image**: Upload your 1920x960px cover
   - **Screenshots**: Upload 2-5 screenshots

6. **Review and Submit**
   - Preview your listing
   - Submit for review
   - Wait for Figma's approval (typically 1-7 days)

### **Post-Publication**

#### **Update Package References**
Once published, update your documentation to reference the published plugin:

1. **Update README.md**
   ```markdown
   ## Figma Plugin Installation

   **Option 1: From Figma Community (Recommended)**
   1. Go to [MCP Figma Plugin on Figma Community](https://www.figma.com/community/plugin/[plugin-id])
   2. Click "Install" 
   3. The plugin will be available in your Figma plugins menu

   **Option 2: Manual Installation**
   1. Download the plugin files from GitHub
   2. In Figma: Plugins → Development → Import plugin from manifest
   3. Select the manifest.json file
   ```

2. **Update Setup Scripts**
   - Reference the community plugin in setup guides
   - Include plugin installation in automated setup scripts

#### **Maintenance**
- Monitor community feedback and reviews
- Update plugin when new features are added to MCP server
- Respond to user questions and issues
- Keep documentation synchronized

### **Plugin Approval Timeline**
- **Submission**: Immediate
- **Review**: 1-7 business days
- **Approval**: Automatic publication upon approval
- **Updates**: Same review process for major changes

### **Best Practices for Approval**
1. **Code Quality**: Clean, well-documented code
2. **Error Handling**: Graceful error messages
3. **User Experience**: Intuitive interface and clear instructions
4. **Performance**: Efficient operations, no blocking UI
5. **Security**: Proper input validation and safe API usage
6. **Documentation**: Clear setup instructions and usage examples

### **Troubleshooting Common Issues**
- **Rejection for API Usage**: Ensure all API calls are properly documented
- **UI/UX Issues**: Make sure interface is intuitive and accessible
- **Performance Issues**: Optimize heavy operations with progress indicators
- **Security Concerns**: Validate all inputs and handle errors gracefully

### **Resources**
- [Figma Plugin API Documentation](https://www.figma.com/plugin-docs/)
- [Figma Community Guidelines](https://help.figma.com/hc/en-us/articles/360042813114)
- [Plugin Publishing Requirements](https://help.figma.com/hc/en-us/articles/360042933894) 