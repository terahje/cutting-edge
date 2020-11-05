var webpackConfig = require('./webpack.config.test')
delete webpackConfig.entry
webpackConfig.devtool = 'inline-source-map'

module.exports = {
	frameworks: ['jasmine'],
	files: [
		'../test/unit/specs/index.js'
	],
	preprocessors: {
		'../test/unit/specs/index.js': ['webpack', 'sourcemap']
	},
	webpack: webpackConfig,
	webpackMiddleware: {
		noInfo: true
	},
	singleRun: true
}