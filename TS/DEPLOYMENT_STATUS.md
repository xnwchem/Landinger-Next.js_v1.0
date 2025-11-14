# 🚀 部署状态报告

## ⚠️ 部署策略

**本项目仅支持 Docker 容器部署**，不允许直接运行 `npm start` 或其他非容器部署方式。

## 📋 当前状态

**部署时间**: 2025-11-14 01:43:08
**部署方式**: Docker 容器
**状态**: 🟢 运行中
**容器 ID**: 6cf7593cb14f
**镜像大小**: 207MB

## 🐳 Docker 部署信息

### 快速启动

```bash
cd /opt/Landinger-Next.js_v1.0/TS

# 使用 Docker Compose（推荐）
docker-compose up -d

# 或使用 Docker 命令
docker build -t landinger:latest .
docker run -d -p 3000:3000 --name landinger landinger:latest
```

### 访问地址

部署成功后，应用将在以下地址可用：

- **根路径**: http://localhost:3000
  - 自动重定向到: http://localhost:3000/zh/home-1

- **中文首页**: http://localhost:3000/zh/home-1

- **英文首页**: http://localhost:3000/en/home-1

## 📊 构建信息

### 镜像信息

- **镜像名称**: `landinger:latest`
- **基础镜像**: `node:20-alpine`
- **构建方式**: 多阶段构建
- **运行用户**: `nextjs` (非 root)

### 应用统计

- **总路由数**: 42 个页面
- **静态页面**: 全部预渲染
- **中间件大小**: 50.7 kB
- **共享 JS**: 101 kB

## 🔧 配置信息

### 环境变量

- `NODE_ENV`: production
- `NEXT_TELEMETRY_DISABLED`: 1
- `PORT`: 3000
- `HOSTNAME`: 0.0.0.0

### 功能特性

- ✅ 国际化支持 (中文/英文)
- ✅ 图片优化 (AVIF/WebP)
- ✅ 错误边界
- ✅ 响应式设计
- ✅ SEO 优化
- ✅ Docker 容器化部署

## 📝 容器管理命令

### 启动容器

```bash
# 使用 Docker Compose
docker-compose up -d

# 使用 Docker 命令
docker run -d -p 3000:3000 --name landinger landinger:latest
```

### 查看状态

```bash
# 查看容器状态
docker ps | grep landinger

# 查看日志
docker logs -f landinger

# 查看资源使用
docker stats landinger
```

### 停止容器

```bash
# 停止容器
docker stop landinger

# 停止并删除容器
docker stop landinger && docker rm landinger

# 使用 Docker Compose
docker-compose down
```

### 重启容器

```bash
docker restart landinger
```

### 更新部署

```bash
# 停止旧容器
docker stop landinger && docker rm landinger

# 重新构建镜像
docker build -t landinger:latest .

# 启动新容器
docker run -d -p 3000:3000 --name landinger landinger:latest

# 或使用 Docker Compose
docker-compose up -d --build
```

## 🎯 下一步

1. **构建 Docker 镜像**: `docker build -t landinger:latest .`
2. **启动容器**: `docker run -d -p 3000:3000 --name landinger landinger:latest`
3. **配置域名** (如需要)
4. **设置 HTTPS** (生产环境推荐)
5. **配置反向代理** (Nginx)
6. **监控和日志** (集成监控服务)

## ⚠️ 重要提示

1. **仅支持容器部署**: 不允许直接运行 `npm start` 或其他非容器方式
2. **端口管理**: 确保端口 3000 未被占用
3. **数据持久化**: 当前配置不包含数据卷，如需持久化请添加 volumes
4. **安全**: 生产环境建议配置防火墙和反向代理
5. **备份**: 定期备份 Docker 镜像和配置

## 🔍 健康检查

容器已配置健康检查，可以通过以下命令查看：

```bash
docker inspect --format='{{.State.Health.Status}}' landinger
```

---

**状态**: 🟢 正常运行中
**部署方式**: 🐳 Docker 容器（唯一支持的方式）
**容器状态**: running
**访问地址**: http://localhost:3000
