@echo off
chcp 65001 >nul
echo ====================================
echo   测试配置功能
echo ====================================
echo.

echo [测试 1] 使用内置默认配置（30分钟）
echo.
timeout /t 2 /nobreak >nul
echo 启动 Server...
start /b node dist\server\index.js
timeout /t 3 /nobreak >nul
echo.

echo [测试 2] 使用配置文件
echo.
echo 创建测试配置文件...
echo { > config.json
echo   "reminder": { >> config.json
echo     "interval": 45, >> config.json
echo     "message": "测试消息：已经 45 分钟了！", >> config.json
echo     "title": "测试提醒", >> config.json
echo     "sound": true >> config.json
echo   } >> config.json
echo } >> config.json

echo 配置文件已创建：
type config.json
echo.
echo 重启 Server 查看效果...
taskkill /f /im node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
start /b node dist\server\index.js
timeout /t 3 /nobreak >nul
echo.

echo [测试 3] 使用环境变量（优先级最高）
echo.
set REMINDER_INTERVAL=60
set REMINDER_MESSAGE=环境变量测试：已经 60 分钟了！
set REMINDER_TITLE=环境变量提醒
echo 环境变量已设置：
echo   REMINDER_INTERVAL=%REMINDER_INTERVAL%
echo   REMINDER_MESSAGE=%REMINDER_MESSAGE%
echo   REMINDER_TITLE=%REMINDER_TITLE%
echo.
echo 重启 Server 查看效果...
taskkill /f /im node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
start /b node dist\server\index.js
timeout /t 3 /nobreak >nul
echo.

echo ====================================
echo   测试完成！
echo ====================================
echo.
echo 配置优先级验证：
echo   1. 内置默认值：30 分钟
echo   2. 配置文件：45 分钟
echo   3. 环境变量：60 分钟（最高优先级）
echo.
echo 清理...
taskkill /f /im node.exe >nul 2>&1
echo.
pause

