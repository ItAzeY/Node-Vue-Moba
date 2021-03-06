const express = require('express')
const app = express()
app.set('secret', 'baierge')
app.use(require('cors')())
app.use(express.json())
app.use('/uploads',express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./router/admin/index')(app)

app.listen(3000, () => {
	console.log('http://localhost:3000')
})