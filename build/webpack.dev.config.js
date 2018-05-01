const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const utils = require('./utils');
const baseWebpackConfig = require('./webpack.base.config');
const config = require('../config');

const env = process.env.NODE_ENV || 'development';

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: [
            {
                test: /\.less$/,
                use: utils.extractCSS({
                    lang: 'less'
                })
            },
            {
                test: /\.css$/,
                use: utils.extractCSS()
            }
        ]
    },
    devtool: '#source-map',
    output: {
        path: config[env].assetsRoot,
        filename: utils.assetsPath('js/[name].js'),
        chunkFilename: utils.assetsPath('js/[id].js')
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // 
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf('node_modules') >= 0
                );
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),

        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].wxss')
        }),

        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),

        new webpack.NoEmitOnErrorsPlugin()
    ]
});
