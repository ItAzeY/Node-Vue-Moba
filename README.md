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
docker stop nginx
```

删除`nginx`

```bash
docker rm nginx
```

启动 mongo 数据库

```bash
docker run -d -p 27017:27017 -v mongo_configdb:/data/configdb -v mongo_db:/data/db --name mongo docker.io/mongo
```

关闭 mongo

```bash
docker stop mongo
```

删除 mong

```bah
docker rm mongo
```

## mongoose 插件

```js
// 引入插件
const mongoose = require("mongoose");
// 定义 Schema(架构的意思)
const schema = new mongoose.Schema({
  // 定义 name 为 string 类型.(就像 mysql 里面的varchar)
  name: { type: String },
  // 定义 parent 为 id. 必须使用这样的方式(mongoose.SchemaTypes.ObjectId)
  parent: { type: mongoose.SchemaTypes.ObjectId }
});

// 导出模型
module.exports = mongoose.model("Categories", schema);
```

## mysql

## express

bug:

- 当路由一样的情况下,最先创建的路由会覆盖后面路由

```js
// router 是 express 的子级路由
router.get("/categories/:id", async (req, res) => {
  const item = await db.getItemId(req.params.id);
  res.send(item);
});
// 此时你调用 /categories/parent 这个路由的时候 会直接调用上面的路由.你可以 console 一下看看
// 这是 restful 的风格. 可以通过类似于 `命名空间` 的方式来写路由,达到唯一性.
router.get("/categories/parent", async (req, res) => {
  const items = await db.getCategoriesParent();
  res.send(items);
});
```

## bcrypt

`bcrypt` 是一个不可以的密码加密工具,比`md5`相对还要安全

```javascript
// 引入 npm 包,hashSync 是异步方法,val是密码, 10 是安全等级.越大耗时越长,一般 10-12
require("bcrypt").hashSync(val, 10);
// password 是传递过来的密码, user.password 是数据库的密码. 返回的是一个布尔值
require("bcrypt").compareSync(password, user.password);
```

## 登陆界面

登陆界面的布局,使用`vw` 和 `vh` 来做,这样不管是什么分辨率的情况都可以正常展示,额,宽度配上媒体查询

## jsonwebtoken

`jsonwebtoken` 是一个生成 `token` 的插件

```javascript
// 第一个是加密的数据.
// 第二个是 express 的全局变量需要用 get 来获取
// app.get 两种用途 1. get 请求,需要指定第二个参数(callback), 2. 获取全局变量.不能穿第二个参数.
const token = jwt.sign({ id: user._id }, app.get("secret"));
```

## 统一处理接口错误返回

```js
// 错误处理函数
app.use(async (err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    message: err.message
  });
});
```

## http-assert

`http-assert` 我理解就是 简化 if 操作

```js
// 引入包
const assert = require('http-assert')
// 第一个参数是要校验的值, 第二个是返回的 code 值,第三个是 message 值.
// 应该是返回给 错误处理函数的 err 对象
assert(token, 401, '请提供 jwt token')
```

## req.app

```js
// 在 req 中是可以访问 app 的,也就是 express
req.app.get('secret')
```

