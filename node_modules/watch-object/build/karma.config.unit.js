var assign = require('object-assign')
var base = require('./karma.config.base')

module.exports = function (config) {
	config.set(assign(base, {
		browsers: ['PhantomJS'],
		reporters: ['progress']
	}))
}