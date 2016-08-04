const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require("webpack");
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './app/app.ts',
    output: {
        path: __dirname + "/dist/",
        publicPath: "/",
        filename: "js/[name]-build.js",
    },
    resolve: {
        root: '.',
        modulesDirectories: ['node_modules', 'bower_components', 'typings'],
        extensions: ['', '.ts', '.tsx', '.js']
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({name: "common", chunks: true}),
        new ExtractTextPlugin("css/styles.css", {allChunks: true})
    ],
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.html$/, loader: 'html' },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(
                    'css?sourceMap!less?sourceMap?rootpath=./css/'
                )
            }
        ]
    },
    watch: true
};

if(NODE_ENV !== 'development') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}