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
const mongoose = require('mongoose')
// 定义 Schema(架构的意思)
const schema = new mongoose.Schema({
  // 定义 name 为 string 类型.(就像 mysql 里面的varchar)
  name: { type: String },
  // 定义 parent 为 id. 必须使用这样的方式(mongoose.SchemaTypes.ObjectId)
  parent: { type: mongoose.SchemaTypes.ObjectId}
})

// 导出模型
module.exports = mongoose.model('Categories',schema)
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
