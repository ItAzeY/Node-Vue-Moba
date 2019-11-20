const path = require('path');

function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	lintOnSave: true,
	chainWebpack: (config) => {
		const oneOfsMap = config.module.rule('scss').oneOfs.store
		oneOfsMap.forEach(item => {
			item
				.use('sass-resources-loader')
				.loader('sass-resources-loader')
				.options({
					// Provide path to the file with resources
					// resources: './src/styles/utils.scss'
					resources: path.resolve(__dirname, 'src/styles/utils.scss')
				})
				.end()
		})
		config.resolve.alias
			.set('@', resolve('src'))
		// 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
	}
}