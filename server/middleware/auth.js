// 登陆中间件
const assert = require('http-assert')
const jwt = require('jsonwebtoken')
const AdminUser = require('../models/AdminUser')
module.exports = (options) => {
	return async (req, res, next) => {
		// 获取 token
		const token = String(req.headers.authorization || '').split(' ').pop()
		assert(token, 401, '请提供 jwt token')
		// 对 token 进行解密.
		// 得到的是一个对象,就是你在登陆的时候传的代码.例如:
		// jwt.sign({id: user._id }, app.get('secret'))  {id: user._id} 就会得到这个
		const { id } = jwt.verify(token, req.app.get('secret'))
		assert(id, 401, '无效的 jwt token')
		// 根据 id,查找数据.
		req.user = await AdminUser.findById(id)
		assert(req.user, 401, '请先登录')
		// 执行下一步
		await next()
	}
}