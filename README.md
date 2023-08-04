# README

# 典典的小卖部后台管理平台

使用`react,umi,antd`前后端分离的方式编写

# 安装依赖

```bash
pnpm install
```

# 运行

```bash
pnpm dev
```

# 修改为线上接口

```js
修改src / constants / index.ts里面的HOST_NAME变量;
```

```bash

docker run -id -p 80:80 \
--name dd_admin --restart always --privileged=true \
-v /opt/docker/openresty/nginx/conf/nginx.conf:/usr/local/openresty/nginx/conf/nginx.conf \
-v /opt/docker/openresty/nginx/logs:/usr/local/openresty/nginx/logs \
-v /opt/docker/openresty/html:/usr/local/openresty/nginx/html \
-v /etc/localtime:/etc/localtime \
openresty/openresty

```
