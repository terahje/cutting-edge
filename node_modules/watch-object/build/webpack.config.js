var WebpackConfig = require('webpack-config-api')
var config = new WebpackConfig()
	.addFileExtension('js')
	.register('babel', require('webpack-config-api/extensions/babel')).use('babel')
	.register('eslint', require('webpack-config-api/extensions/eslint')).use('eslint')
	.withStandaloneEntry('watch-object')
	.withLibrary('WatchObject')

module.exports = config