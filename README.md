# Node-Vue-Moba

构建 node 后台和 vue 开发的移动端

## docker

### docker 命令

例如安装 `nginx`

```bash
docker pull nginx
```

启动`nginx`

```bash
# 在本地启动一个 80 端口的服务
docker run -d -p 80:80 --name webserver nginx
```

关闭`nginx`

```bash
docker stop webserver
```

删除`nginx`

```bash
docker rm webserver
```
