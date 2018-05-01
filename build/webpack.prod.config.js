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

const buildWebpackConfig = merge(baseWebpackConfig, {
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
    devtool: config[env].productionSourceMap ? '#source-map' : false,
    output: {
        path: config[env].assetsRoot,
        filename: utils.assetsPath('js/[name].js'),
        chunkFilename: utils.assetsPath('js/[id].js')
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf('node_modules') >= 0
                );
            }
        }),

        new webpack.HashedModuleIdsPlugin(),

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

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        })
    ]
});

if (config[env].bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    buildWebpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = buildWebpackConfig;
