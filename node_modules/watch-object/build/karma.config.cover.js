var path = require('path')
var assign = require('object-assign')
var base = require('./karma.config.base')

module.exports = function (config) {
	options = assign(base, {
		browsers: ['PhantomJS'],
		reporters: ['progress', 'coverage'],
		coverageReporter: {
			reporters: [
				{ type: 'lcov', 'dir': '../coverage', subdir: '.' },
				{ type: 'text-summary', dir: '../coverage', subdir: '.' }
			]
		}
	})
	
	options.webpack.module.preLoaders = [
		{
			test: /\.js$/,
			exclude: /test|node_modules/,
			loader: 'isparta'
		}
	]

	config.set(options)
}