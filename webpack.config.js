const package = require('./package.json')
const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'production',

	entry: {
		app: './src/app.js',
		parent: './src/parent.js'
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
		new webpack.DefinePlugin({
			SDK_VERSION: JSON.stringify(package.version)
		}),
		new webpack.ProgressPlugin(),
	],

	devServer: {
		open: true
	},

	optimization: {
		minimize: true
	}
};
