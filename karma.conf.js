// Karma configuration
module.exports = function(config) {
  config.set({
	basePath: '',
	frameworks: ['jasmine'],
	plugins: [
		require('karma-jasmine'),
		require('karma-phantomjs-launcher')
	],
	files: [
		'./dist/main-bundle.js',
		'./node_modules/angular-mocks/angular-mocks.js',
		'./client/tests/**/*.spec.js',
    ],
	exclude: [
    ],
	preprocessors: {
    },
	reporters: ['progress'],
	port: 9876,
	colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  })
}
