#!/bin/bash

echo "🚀 启动 Elysia 全栈应用演示"
echo "================================"
echo ""
echo "📋 功能清单:"
echo "✅ 多语言支持 (中英日)"
echo "✅ 模拟登录系统"
echo "✅ 后台管理仪表板"
echo "✅ 文件管理 (模拟 + 真实 R2 支持)"
echo "✅ 响应式设计"
echo "✅ Bun 原生性能"
echo ""
echo "🔐 演示账号:"
echo "  管理员: admin@example.com / admin123"
echo "  演示用户: demo@example.com / demo123"
echo "  普通用户: user@example.com / user123"
echo ""
echo "🌐 重要链接:"
echo "  首页: http://localhost:3000"
echo "  登录: http://localhost:3000/login"
echo "  管理后台: http://localhost:3000/admin"
echo "  文件管理: http://localhost:3000/admin/files"
echo "  测试页面: http://localhost:3000/test-login"
echo ""
echo "💾 存储模式:"
echo "  - 默认使用模拟存储 (无需配置)"
echo "  - 配置 .env 文件可连接真实 Cloudflare R2"
echo ""

# 检查是否存在 .env 文件
if [ ! -f .env ]; then
    echo "📝 创建 .env 文件..."
    cp .env.example .env
    echo "✅ 已创建 .env 文件 (使用模拟存储)"
    echo ""
fi

# 检查 Bun 是否安装
if ! command -v bun &> /dev/null; then
    echo "❌ Bun 未安装，请先安装 Bun:"
    echo "   curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

echo "🔄 启动开发服务器..."
echo "💡 服务器启动后，可以运行 'node test-fix.js' 进行测试"
echo ""
bun dev