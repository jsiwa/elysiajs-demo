#!/bin/bash

echo "🚀 快速测试 Elysia 应用"
echo "========================"

# 检查 Bun 是否安装
if ! command -v bun &> /dev/null; then
    echo "❌ Bun 未安装，请先安装 Bun"
    exit 1
fi

# 检查依赖
echo "📦 检查依赖..."
if [ ! -d "node_modules" ]; then
    echo "📥 安装依赖..."
    bun install
fi

# 创建 .env 文件
if [ ! -f .env ]; then
    echo "📝 创建 .env 文件..."
    cp .env.example .env
fi

echo "✅ 准备完成"
echo ""
echo "🔄 启动服务器进行测试..."

# 启动服务器并测试
bun run src/index.ts &
SERVER_PID=$!

# 等待服务器启动
sleep 2

echo "🧪 测试基本功能..."

# 测试首页
if curl -s http://localhost:3000/ > /dev/null; then
    echo "✅ 首页正常"
else
    echo "❌ 首页失败"
fi

# 测试登录页面
if curl -s http://localhost:3000/login > /dev/null; then
    echo "✅ 登录页面正常"
else
    echo "❌ 登录页面失败"
fi

# 测试API
if curl -s http://localhost:3000/api/auth/me > /dev/null; then
    echo "✅ API端点正常"
else
    echo "❌ API端点失败"
fi

# 停止服务器
kill $SERVER_PID 2>/dev/null

echo ""
echo "🎉 测试完成！如果所有项目都显示 ✅，说明修复成功"
echo "💡 运行 './start-demo.sh' 启动完整的演示服务器"