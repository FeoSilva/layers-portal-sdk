const package = require('./package.json')
const path = require('path');
const webpack = require('webpack');

const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
	mode: 'production',

	entry: './src/index.js',

	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
		new webpack.ProgressPlugin(),
		new webpack.DefinePlugin({
			SDK_VERSION: JSON.stringify(package.version)
		}),
		new MinifyPlugin(),
	],

	module: {
		// rules: [
		// 	{
		// 		test: /.(js|jsx)$/,
		// 		include: [],
		// 		loader: 'babel-loader',

		// 		options: {
		// 			plugins: ['syntax-dynamic-import'],

		// 			presets: [
		// 				[
		// 					'@babel/preset-env',
		// 					{
		// 						modules: false
		// 					}
		// 				]
		// 			]
		// 		}
		// 	}
		// ]
	},

	// optimization: {
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			vendors: {
	// 				priority: -10,
	// 				test: /[\\/]node_modules[\\/]/
	// 			}
	// 		},

	// 		chunks: 'async',
	// 		minChunks: 1,
	// 		minSize: 30000,
	// 		name: true
	// 	}
	// },

	devServer: {
		open: true
	}
};
