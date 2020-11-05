var path = require('path')
var WebpackConfig = require('webpack-config-api')
var config = new WebpackConfig({ srcPath: 'test', distPath: 'test/unit' })
	.addFileExtension('js')
	.register('babel', require('webpack-config-api/extensions/babel')).use('babel', {
		include: [ path.resolve(process.cwd(), './src') ],
		loader: 'babel'
	})
	.withEntry('specs', 'unit/specs/index.js')	
	.withAlias({ 'watch-object': '../../../src' })
	.webpack({
		devServer: { contentBase: './test/unit', noInfo: true },
		devtool: 'source-map'
	})

module.exports = config.getConfig()