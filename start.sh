#!/bin/bash

echo "===================================="
echo "   健康提醒 MCP 系统启动脚本"
echo "===================================="
echo ""

# 检查 node_modules 是否存在
if [ ! -d "node_modules" ]; then
    echo "[1/3] 正在安装依赖..."
    npm install
    echo ""
else
    echo "[1/3] 依赖已存在，跳过安装"
    echo ""
fi

# 检查 dist 目录是否存在
if [ ! -d "dist" ]; then
    echo "[2/3] 正在编译项目..."
    npm run build
    echo ""
else
    echo "[2/3] 已编译，跳过编译步骤"
    echo ""
fi

echo "[3/3] 启动客户端..."
echo ""
npm run client

