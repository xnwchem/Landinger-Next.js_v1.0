#!/bin/bash

# Landinger 项目 Docker 部署脚本
# 注意：本项目仅支持 Docker 容器部署

set -e

echo "🚀 开始使用 Docker 部署 Landinger 项目..."

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ 错误: Docker 未安装"
    echo "请先安装 Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

# 检查 Docker 是否运行
if ! docker info &> /dev/null; then
    echo "❌ 错误: Docker 守护进程未运行"
    echo "请启动 Docker 服务"
    exit 1
fi

echo "✅ Docker 环境检查通过"

# 停止并删除现有容器（如果存在）
if docker ps -a | grep -q landinger; then
    echo "🛑 停止现有容器..."
    docker stop landinger 2>/dev/null || true
    docker rm landinger 2>/dev/null || true
fi

# 构建 Docker 镜像
echo "🔨 构建 Docker 镜像..."
docker build -t landinger:latest .

# 检查构建结果
if docker images | grep -q landinger; then
    echo "✅ 镜像构建成功！"
    echo ""
    echo "📋 部署选项："
    echo ""
    echo "1. 运行容器（前台）:"
    echo "   docker run -p 3000:3000 --name landinger landinger:latest"
    echo ""
    echo "2. 运行容器（后台）:"
    echo "   docker run -d -p 3000:3000 --name landinger landinger:latest"
    echo ""
    echo "3. 使用 docker-compose:"
    echo "   docker-compose up -d"
    echo ""
    echo "4. 查看容器日志:"
    echo "   docker logs -f landinger"
    echo ""
    echo "5. 停止容器:"
    echo "   docker stop landinger"
    echo ""
    echo "6. 删除容器:"
    echo "   docker rm landinger"
    echo ""
else
    echo "❌ 镜像构建失败！"
    exit 1
fi
