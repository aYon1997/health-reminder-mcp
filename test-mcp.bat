@echo off
echo ====================================
echo   测试 MCP Server 是否正常工作
echo ====================================
echo.

echo [1] 检查 Node.js 版本...
node --version
if errorlevel 1 (
    echo [错误] 找不到 Node.js，请先安装 Node.js
    pause
    exit /b 1
)
echo.

echo [2] 检查编译文件是否存在...
if exist "dist\server\index.js" (
    echo [成功] 编译文件存在
) else (
    echo [错误] 编译文件不存在，正在编译...
    call npm run build
)
echo.

echo [3] 测试 Server 启动（5秒后自动关闭）...
echo 如果看到 "MCP Server 已就绪"，说明 Server 正常工作
echo.
timeout /t 2 /nobreak >nul
start /b node dist\server\index.js
timeout /t 5 /nobreak
taskkill /f /im node.exe >nul 2>&1
echo.

echo [4] 显示 Cursor 配置信息...
echo.
echo 复制以下配置到 Cursor 的 MCP 设置中：
echo.
echo {
echo   "mcpServers": {
echo     "health-reminder": {
echo       "command": "node",
echo       "args": [
echo         "%CD%\\dist\\server\\index.js"
echo       ]
echo     }
echo   }
echo }
echo.
echo 当前完整路径: %CD%\dist\server\index.js
echo.
echo ====================================
echo   配置 Cursor 的步骤：
echo ====================================
echo.
echo 方式1 - 使用 Cursor Settings：
echo   1. 打开 Cursor
echo   2. 按 Ctrl+Shift+P
echo   3. 输入 "Preferences: Open User Settings (JSON)"
echo   4. 在打开的 settings.json 中添加上面的配置
echo   5. 保存并重启 Cursor
echo.
echo 方式2 - 使用 Claude Dev 扩展（如果已安装）：
echo   1. 打开文件资源管理器
echo   2. 在地址栏输入: %%APPDATA%%\Cursor\User\globalStorage\saoudrizwan.claude-dev\settings
echo   3. 编辑 cline_mcp_settings.json
echo   4. 添加上面的配置
echo   5. 保存并重启 Cursor
echo.
echo ====================================
pause


