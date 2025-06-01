#!/bin/bash

# Figma Plugin Publishing Helper Script
echo "🎨 MCP Figma Plugin Publishing Helper"
echo "======================================"

# Check if we're in the right directory
if [ ! -f "src/mcp_plugin/manifest.json" ]; then
    echo "❌ Error: manifest.json not found. Please run this script from the project root."
    exit 1
fi

echo "✅ Plugin files found"

# Check required files
echo ""
echo "📋 Checking required files:"

# Check manifest.json
if [ -f "src/mcp_plugin/manifest.json" ]; then
    echo "✅ manifest.json"
else
    echo "❌ manifest.json - MISSING"
fi

# Check code.js
if [ -f "src/mcp_plugin/code.js" ]; then
    echo "✅ code.js"
else
    echo "❌ code.js - MISSING"
fi

# Check ui.html
if [ -f "src/mcp_plugin/ui.html" ]; then
    echo "✅ ui.html"
else
    echo "❌ ui.html - MISSING"
fi

# Check icon
if [ -f "src/mcp_plugin/icon.svg" ] || [ -f "src/mcp_plugin/icon.png" ]; then
    echo "✅ icon file"
else
    echo "❌ icon file - MISSING (need icon.svg or icon.png)"
fi

echo ""
echo "📁 Plugin directory contents:"
ls -la src/mcp_plugin/

echo ""
echo "🎯 Next Steps for Publishing:"
echo ""
echo "1. 📸 Create Assets (if missing):"
echo "   • Plugin icon (128x128px): src/mcp_plugin/icon.png"
echo "   • Cover image (1920x960px): figma-assets/cover-image.png"
echo "   • Screenshots: figma-assets/screenshots/"
echo ""
echo "2. 🧪 Test Plugin Locally:"
echo "   • Open Figma Desktop"
echo "   • Go to Plugins → Development → Import plugin from manifest"
echo "   • Select: src/mcp_plugin/manifest.json"
echo "   • Test all functionality"
echo ""
echo "3. 🚀 Publish to Figma Community:"
echo "   • Go to: https://www.figma.com/community/publish"
echo "   • Click 'Publish a plugin'"
echo "   • Upload manifest.json (Figma will bundle all files)"
echo "   • Fill in plugin details and upload assets"
echo "   • Submit for review"
echo ""
echo "4. 📖 Read Full Guide:"
echo "   • See: FIGMA_PUBLISHING_GUIDE.md for detailed instructions"
echo ""

# Check if we can zip the plugin files for easy sharing
echo "💾 Creating plugin bundle for testing..."
cd src/mcp_plugin
if command -v zip >/dev/null 2>&1; then
    zip -r ../../mcp-figma-plugin.zip . -x "*.DS_Store"
    echo "✅ Plugin bundle created: mcp-figma-plugin.zip"
    cd ../..
    echo "   You can share this zip file for testing or submit manifest.json directly to Figma"
else
    echo "ℹ️  Zip not available. You can manually bundle the files in src/mcp_plugin/"
    cd ../..
fi

echo ""
echo "🎉 Plugin is ready for publishing!"
echo "   Follow the steps above to submit to Figma Community." 