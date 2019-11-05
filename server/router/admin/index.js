module.exports = app => {
	const categoriesRouter = require('./categories/index')
	app.use('/admin/api', categoriesRouter)
}