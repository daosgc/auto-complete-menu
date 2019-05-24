'use strict';

import webpack from 'webpack';
import WebpackShellPlugin from 'webpack-shell-plugin';

const glob = require('glob');
const entryArray = glob.sync('client/js/**/*.js');
const entryList = entryArray.map((item)=>{
	return `./${item}`
});

export default {
	entry:  entryList,
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
