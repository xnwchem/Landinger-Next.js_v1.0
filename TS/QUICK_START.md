# 快速部署指南

## ⚠️ 重要提示

**本项目仅支持 Docker 容器部署**，不允许直接运行 `npm start` 或其他非容器部署方式。

## 🚀 快速部署命令

### 方式 1: 使用 Docker Compose（推荐）

```bash
cd /opt/Landinger-Next.js_v1.0/TS

# 构建并启动容器
docker-compose up -d

# 查看日志
docker-compose logs -f
```

访问: http://localhost:3000

### 方式 2: 使用 Docker 命令

```bash
cd /opt/Landinger-Next.js_v1.0/TS

# 构建镜像
docker build -t landinger:latest .

# 运行容器（后台）
docker run -d -p 3000:3000 --name landinger landinger:latest

# 查看日志
docker logs -f landinger
```

访问: http://localhost:3000

### 方式 3: 使用部署脚本

```bash
cd /opt/Landinger-Next.js_v1.0/TS

# 运行部署脚本（会自动构建镜像）
chmod +x deploy.sh
./deploy.sh

# 然后手动启动容器
docker run -d -p 3000:3000 --name landinger landinger:latest
```

访问: http://localhost:3000

## 📋 容器管理命令

### 停止容器

```bash
# 使用 Docker Compose
docker-compose down

# 使用 Docker 命令
docker stop landinger
docker rm landinger
```

### 查看状态

```bash
# 查看容器状态
docker ps | grep landinger

# 查看日志
docker logs -f landinger
```

### 重启容器

```bash
docker restart landinger
```

## 📝 注意事项

1. **仅支持容器部署**: 不允许直接运行 `npm start` 或其他非容器方式
2. **环境变量**: 如需配置环境变量，请使用 `--env-file .env.local` 或编辑 `docker-compose.yml`
3. **端口**: 默认端口为 3000，确保端口未被占用
4. **国际化**: 访问 `/zh/home-1` 或 `/en/home-1`
5. **Docker 要求**: 确保已安装 Docker Engine 20.10+ 和 Docker Compose 2.0+

## 🔧 故障排除

如果遇到问题，请查看 `DEPLOYMENT.md` 获取详细说明。

常见问题：
- **Docker 未安装**: 请访问 https://docs.docker.com/get-docker/
- **端口被占用**: 使用 `lsof -i :3000` 检查端口占用情况
- **构建失败**: 查看 `docker build` 输出日志
- **容器无法启动**: 使用 `docker logs landinger` 查看日志
