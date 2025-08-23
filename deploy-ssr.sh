#!/bin/bash

echo "Building Angular SSR application..."

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build the application for SSR
echo "Building browser and server bundles..."
npm run build:ssr

echo "SSR build completed!"
echo "Browser bundle: dist/coreui-free-angular-admin-template/browser"
echo "Server bundle: dist/coreui-free-angular-admin-template/server"
echo ""
echo "To run the SSR server:"
echo "npm run serve:ssr"
echo ""
echo "To run in development mode with SSR:"
echo "npm run dev:ssr"
