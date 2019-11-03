module.exports = app => {
	const expres = require('express')
	const router = expres.Router()
	const Categories = require('../../models/Categories')
	// 保存分类
	router.post('/categories', async (req, res) => {
		// create 盲猜是创建一个方法 
		// req.body 就是请求体
		const model = await Categories.create(req.body)
		res.send(model)
	})
	// 编辑分类
	router. put('/categories/:id', async (req, res) => {
		// create 盲猜是创建一个方法 
		// req.body 就是请求体
		// req.params.id 就是请求头中 id
		const model = await Categories.findByIdAndUpdate(req.params.id, req.body)
		res.send(model)
	})
	// 获取所有的 分类
	router.get('/categories', async (req, res) => {
		// find 盲猜是找数据 
		// limit 盲猜 是获取多少条数据
		const items = await Categories.find().limit(10)
		res.send(items)
	})
	// 根据 id 获取 分类
	router.get('/categories/:id', async (req, res) => {
		const model = await Categories.findById(req.params.id)
		res.send(model)
	})
	app.use('/admin/api', router)
}