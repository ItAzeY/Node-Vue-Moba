module.exports = app => {
	const expres = require('express')
	const router = expres.Router()
	const Categories = require('../../models/Categories')
	router.post('/categories', async (req, res) => {
		const model = await Categories.create(req.body)
		res.send(model)
	})
	app.use('/admin/api', router)
}