@echo off
echo ====================================
echo   健康提醒 MCP 系统启动脚本
echo ====================================
echo.

REM 检查 node_modules 是否存在
if not exist "node_modules\" (
    echo [1/3] 正在安装依赖...
    call npm install
    echo.
) else (
    echo [1/3] 依赖已存在，跳过安装
    echo.
)

REM 检查 dist 目录是否存在
if not exist "dist\" (
    echo [2/3] 正在编译项目...
    call npm run build
    echo.
) else (
    echo [2/3] 已编译，跳过编译步骤
    echo.
)

echo [3/3] 启动客户端...
echo.
call npm run client

pause

