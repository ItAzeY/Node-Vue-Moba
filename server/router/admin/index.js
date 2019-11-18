module.exports = app => {
	const expres = require('express')
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
	router.get('/', async (req, res) => {
		// find 盲猜是找数据 
		// limit 盲猜 是获取多少条数据
		const queryOption = {}
		// 如果接口是 Category 那么请求的时候 就要带上一个对象
		if (req.Model.modelName === 'Category') {
			// 通过 setOptions 来传入给 mongoose
			queryOption.populate = 'parent'
		}
		let items = {}
		if(req.query){
			const current = req.query.current - 1
			const size = +req.query.size
			items = await req.Model.find().setOptions(queryOption).skip(current * size).limit(size)
		}else{
			items = await req.Model.find().setOptions(queryOption)
		}
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
	app.use('/admin/api/rest/:resource', (req, res, next) => {
		// 给中间价加上一个通用的函数,这个函数会在挂载 router 之前执行
		// 引入 inflection, 并且调用 classify 方法 
		const ModelName = require('inflection').classify(req.params.resource)
		// 得到一个新的值,把这个值赋值给 req 这个对象
		req.Model = require(`../../models/${ModelName}`)
		// 放行
		next()
	}, router) 

	const multer = require('multer')
	let upload = multer({ dest: __dirname + '/../../uploads' })
	// 定义上传图片的接口
	app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
		const file = req.file
		file.url = `http://localhost:3000/uploads/${file.filename}`
		res.send(file)
	}) 

	app.post('/admin/api/login', async (req, res) => {
		const {username, password } = req.body
		// 1. 根据用户名找用户
		const AdminUser = require('../../models/AdminUser') 
		const user = await AdminUser.findOne({ username }).select('+password')
		if(!user){
			return res.status(422).send({
				message: '用户名不存在',
				code: 422,
				data: null
			})
		}
		// 2. 校验密码
		// password 是传递过来的密码, 
		// user.password 是数据库的密码.
		// 返回的是一个布尔值
		const isValid = require('bcrypt').compareSync(password,user.password )
		if(!isValid){
			return res.status(422).send({
				message: '密码错误',
				status: 422
			})
		}
		// 3. 返回 token
		// 引用包
		const jwt = require('jsonwebtoken')
		// 第一个是加密的数据.  
		// 第二个是 express 的全局变量需要用 get 来获取
		// app.get 两种用途 1. get 请求,需要指定第二个参数(callback), 2. 获取全局变量.不能穿第二个参数.
		const token = jwt.sign({id: user._id }, app.get('secret'))
		res.send({token})
	})
}