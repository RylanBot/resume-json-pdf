# 使用官方Nginx运行时作为父镜像
FROM nginx:latest

# 将Nginx配置文件复制到容器的配置目录
COPY ./dist /usr/share/nginx/html

# 暴露容器的端口
EXPOSE 80

# 启动Nginx服务器
CMD ["nginx", "-g", "daemon off;"]
