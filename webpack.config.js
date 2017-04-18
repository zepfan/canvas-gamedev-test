const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.join(__dirname, "client"),
	devtool: debug ? "inline-sourcemap" : false,
	entry: "./main.js",
	module: {
		loaders: [
            {
                test: /\.jsx?$/,
    			exclude: /(node_modules|bower_components)/,
    			loader: 'babel-loader',
    			query: {
    				presets: ['es2016', 'stage-0']
    			}
            },
            {
				test: /\.less$/,
				loader:	'style-loader!css-loader!less-loader'
			},
            {
				test: /\.css$/,
				loader: 'style-loader!css-loader'
            }
		]
	},
	output: {
		path: __dirname + "/client/",
		filename: "main.min.js"
	},
	plugins: debug ? [] : [
    	new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
	]
};
