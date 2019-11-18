module.exports = app => {
	const expres = require('express')
	const assert = require('http-assert')
	const jwt = require('jsonwebtoken')
	const AdminUser = require('../../models/AdminUser')
	const router = expres.Router({
		mergeParams: true
	})

	// 保存分类
	router.post('/', async (req, res) => {
		// create 盲猜是创建一个方法 
		// req.body 就是请求体
		const model = await req.Model.create(req.body)
		res.send(model)
	})

	// 编辑分类
	router.put('/:id', async (req, res) => {
		// create 盲猜是创建一个方法 
		// req.body 就是请求体
		// req.params.id 就是请求头中 id
		const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
		res.send(model)
	})

	// 获取所有的 分类
	router.get('/', async (req, res, next) => {
		// 获取 token
		const token = String(req.headers.authorization || '').split(' ').pop()
		assert(token, 401, '请提供 jwt token')
		// 对 token 进行解密.
		// 得到的是一个对象,就是你在登陆的时候传的代码.例如:
		// jwt.sign({id: user._id }, app.get('secret'))  {id: user._id} 就会得到这个
		const {id} = jwt.verify(token, app.get('secret'))
		assert(id, 401, '无效的 jwt token')
		// 根据 id,查找数据.
		req.user = await AdminUser.findById(id)
		assert(req.user, 401, '请先登录')
		// 执行下一步
		await next()
	}, async (req, res) => {
		// find 盲猜是找数据 
		const queryOption = {}
		// 如果接口是 Category 那么请求的时候 就要带上一个对象
		if (req.Model.modelName === 'Category') {
			// 通过 setOptions 来传入给 mongoose
			queryOption.populate = 'parent'
		}
		let items = {}
		// 如果有参数就代表是有分页(后面应该加上搜索条件)
		if(req.query){
			// 传递过来的分页是1,而 skip 方法是忽略多少项,所以要 - 1
			const current = req.query.current - 1
			// size 是转成数字
			const size = +req.query.size
			// skip 是忽略多少项,如果为 10, 那就是从 11 项开始返回
			// limit 是返回多少项
			items = await req.Model.find().setOptions(queryOption).skip(current * size).limit(size)
		}else{
			items = await req.Model.find().setOptions(queryOption)
		}
		// count 是获取一共有多少项
		const total = await req.Model.find().setOptions(queryOption).count()
		const data = {
			data: items,
			total: total
		}
		res.send(data)
	})

	// 根据 id 获取 分类
	router.get('/:id', async (req, res) => {
		const model = await req.Model.findById(req.params.id)
		res.send(model)
	})
	
	//  根据 id 删除分类
	router.delete('/:id', async (req, res) => {
		const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
		res.send(model)
	})

	// 通用 CRUD 接口
	app.use('/admin/api/rest/:resource', (req, res, next) => {
		// 给中间价加上一个通用的函数,这个函数会在挂载 router 之前执行
		// 引入 inflection, 并且调用 classify 方法 
		const ModelName = require('inflection').classify(req.params.resource)
		// 得到一个新的值,把这个值赋值给 req 这个对象
		req.Model = require(`../../models/${ModelName}`)
		// 放行
		next()
	}, router) 

	// 上传接口
	const multer = require('multer')
	let upload = multer({ dest: __dirname + '/../../uploads' })
	// 定义上传图片的接口
	app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
		const file = req.file
		file.url = `http://localhost:3000/uploads/${file.filename}`
		res.send(file)
	}) 

	// 登陆接口
	app.post('/admin/api/login', async (req, res) => {
		const {username, password } = req.body
		// 1. 根据用户名找用户
		const user = await AdminUser.findOne({ username }).select('+password')
		assert(user, 422, '用户名不存在')
		// 2. 校验密码
		// password 是传递过来的密码, 
		// user.password 是数据库的密码.
		// 返回的是一个布尔值
		const isValid = require('bcrypt').compareSync(password,user.password )
		assert(isValid, 422, '密码错误')
		// 3. 返回 token
		// 第一个是加密的数据.  
		// 第二个是 express 的全局变量需要用 get 来获取
		// app.get 两种用途 1. get 请求,需要指定第二个参数(callback), 2. 获取全局变量.不能穿第二个参数.
		const token = jwt.sign({id: user._id }, app.get('secret'))
		res.send({token})
	})

	// 错误处理函数
	app.use(async (err, req, res, next) => {
		res.status(err.statusCode || 500).send({
			message: err.message
		})
	})
}