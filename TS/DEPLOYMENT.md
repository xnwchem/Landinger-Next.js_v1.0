# Docker 容器部署指南

## ⚠️ 重要提示

**本项目仅支持 Docker 容器部署方式**，不允许直接运行 `npm start` 或其他非容器部署方式。

## 前置要求

1. **安装 Docker**
   - 确保已安装 Docker Engine 20.10 或更高版本
   - 安装指南: https://docs.docker.com/get-docker/

2. **安装 Docker Compose**（可选，推荐）
   - Docker Compose 2.0 或更高版本
   - 通常随 Docker Desktop 一起安装

## 快速开始

### 方式一：使用 Docker Compose（推荐）

```bash
cd /opt/Landinger-Next.js_v1.0/TS

# 构建并启动容器
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止容器
docker-compose down
```

### 方式二：使用 Docker 命令

```bash
cd /opt/Landinger-Next.js_v1.0/TS

# 构建镜像
docker build -t landinger:latest .

# 运行容器（后台）
docker run -d -p 3000:3000 --name landinger landinger:latest

# 查看日志
docker logs -f landinger

# 停止容器
docker stop landinger

# 删除容器
docker rm landinger
```

### 方式三：使用部署脚本

```bash
cd /opt/Landinger-Next.js_v1.0/TS

# 运行部署脚本
chmod +x deploy.sh
./deploy.sh

# 脚本会自动构建镜像，然后您可以手动运行容器
docker run -d -p 3000:3000 --name landinger landinger:latest
```

## 访问应用

部署成功后，应用将在以下地址可用：

- **本地访问**: http://localhost:3000
- **自动重定向**: http://localhost:3000 → http://localhost:3000/zh/home-1
- **中文首页**: http://localhost:3000/zh/home-1
- **英文首页**: http://localhost:3000/en/home-1

## 环境变量配置

### 使用环境变量文件

创建 `.env.local` 文件（如果不存在）：

```bash
NEXT_PUBLIC_APP_NAME=Landinger
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_DESCRIPTION=Multipurpose Tailwind CSS Landing Page Template
NODE_ENV=production
```

### 在 Docker Compose 中使用环境变量

编辑 `docker-compose.yml`，在 `environment` 部分添加：

```yaml
environment:
  - NODE_ENV=production
  - NEXT_PUBLIC_APP_NAME=Landinger
  - NEXT_PUBLIC_APP_URL=http://localhost:3000
  # ... 其他环境变量
```

### 在 Docker 命令中使用环境变量

```bash
docker run -d -p 3000:3000 \
  --env-file .env.local \
  --name landinger \
  landinger:latest
```

## 容器管理

### 查看运行状态

```bash
# 查看容器状态
docker ps | grep landinger

# 查看容器详细信息
docker inspect landinger

# 查看资源使用情况
docker stats landinger
```

### 查看日志

```bash
# 实时查看日志
docker logs -f landinger

# 查看最近 100 行日志
docker logs --tail 100 landinger

# 查看带时间戳的日志
docker logs -f -t landinger
```

### 进入容器

```bash
# 进入容器 shell
docker exec -it landinger sh
```

### 重启容器

```bash
docker restart landinger
```

## 更新部署

### 重新构建并部署

```bash
# 停止并删除旧容器
docker stop landinger
docker rm landinger

# 重新构建镜像
docker build -t landinger:latest .

# 启动新容器
docker run -d -p 3000:3000 --name landinger landinger:latest
```

### 使用 Docker Compose 更新

```bash
# 重新构建并启动
docker-compose up -d --build

# 仅重新构建（不启动）
docker-compose build
```

## 生产环境配置

### 使用反向代理（Nginx）

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 配置 HTTPS

使用 Let's Encrypt 或配置 SSL 证书，在 Nginx 中配置 HTTPS。

### 资源限制

在 `docker-compose.yml` 中添加资源限制：

```yaml
services:
  landinger:
    # ... 其他配置
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

## 监控和维护

### 健康检查

容器已配置健康检查，可以通过以下命令查看：

```bash
docker inspect --format='{{.State.Health.Status}}' landinger
```

### 备份

```bash
# 导出镜像
docker save landinger:latest -o landinger-backup.tar

# 导入镜像
docker load -i landinger-backup.tar
```

## 故障排除

### 容器无法启动

1. 检查日志: `docker logs landinger`
2. 检查端口占用: `lsof -i :3000`
3. 检查 Docker 服务: `docker info`

### 构建失败

1. 检查 Dockerfile 语法
2. 检查网络连接（下载依赖）
3. 清理构建缓存: `docker builder prune`

### 性能问题

1. 检查资源使用: `docker stats landinger`
2. 调整资源限制
3. 检查应用日志

## 注意事项

1. **仅支持容器部署**: 不允许直接运行 `npm start` 或其他非容器方式
2. **端口冲突**: 确保端口 3000 未被其他服务占用
3. **数据持久化**: 当前配置不包含数据卷，如需持久化数据请添加 volumes
4. **安全**: 生产环境建议使用非 root 用户运行（已在 Dockerfile 中配置）
5. **国际化路由**: 路由结构为 `/[locale]/...`，例如 `/zh/home-1` 或 `/en/home-1`

## 架构说明

- **多阶段构建**: 使用 Docker 多阶段构建优化镜像大小
- **非 root 用户**: 使用 `nextjs` 用户运行应用，提高安全性
- **Standalone 输出**: Next.js 配置为 standalone 模式，减少镜像大小
- **健康检查**: 自动监控容器健康状态
