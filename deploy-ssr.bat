@echo off
echo Building Angular SSR application...

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

REM Build the application for SSR
echo Building browser and server bundles...
npm run build:ssr

echo.
echo SSR build completed!
echo Browser bundle: dist\ems\browser
echo Server bundle: dist\ems\server
echo.
echo To run the SSR server:
echo npm run serve:ssr
echo.
echo To run in development mode with SSR:
echo npm run dev:ssr
pause
