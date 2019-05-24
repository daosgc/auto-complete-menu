'use strict';

import webpack from 'webpack';
import WebpackShellPlugin from 'webpack-shell-plugin';

const glob = require('glob');
const entryArray = glob.sync('content/**/index.js');
const entryObject = entryArray.reduce((acc, item) => {
  const name = item.replace('/index.js', '');
  acc[name] = item;
  return acc;
}, {});
console.log('entryObject', entryObject);
export default {
	entry:  [
				'./client/js/App.js',
				'./client/js/directives/auto-complete-menu/auto-complete-menu.js',
				'./client/js/services/states-service.js'
			],
	output: {
		path: './dist',
		filename: '[name]-bundle.js'
	},
	watch: true,
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				exclude: '/node_modules/',
				test: /\.js?$/
			},
			{
				test: /\.scss$/,
				exclude: '/node_modules/',
				loaders: ['style', 'css', 'sass']
			},
			{
				test: /\.(html)$/,
				loader: 'html-loader'
			}
		]
	},
	plugins: [
		new WebpackShellPlugin({
			onBuildStart: ['echo "Starting"'],
			onBuildEnd: ['node -r babel-register ./server/server.js']
		})
	],
	node: {
		fs: 'empty'
	},
	resolve: {
		extensions: ['', '.js', '.scss']
	}
}
