#!/bin/bash

# MLS Calendars SvelteKit Setup Script

echo "🚀 Setting up MLS Calendars with SvelteKit..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
else
  echo "✅ Dependencies already installed"
fi

# Generate calendars if they don't exist
if [ ! -f "public/ATL.ics" ]; then
  echo "📅 Generating calendar files..."
  npm run generate
else
  echo "✅ Calendar files already generated"
fi

echo ""
echo "✨ Setup complete! You can now:"
echo ""
echo "  Development mode:"
echo "    npm run dev"
echo ""
echo "  Build for production:"
echo "    npm run build"
echo ""
echo "  Generate calendars:"
echo "    npm run generate"
echo ""
echo "  Regenerate and build:"
echo "    npm run generate-and-build"
echo ""
echo "For more information, see GITHUB_PAGES_SETUP.md and SVELTEKIT_MIGRATION.md"
