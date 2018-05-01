const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('../config');

const env = process.env.NODE_ENV || 'development';

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

function assetsPath (_path) {
    const assetsSubDirectory = config[env].assetsSubDirectory || 'static';
    return path.posix.join(assetsSubDirectory, _path);
}

function extractCSS (opts) {
    // only support css/less
    const options = merge(opts, {
        extract: true
    });

    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: env === 'production',
            sourceMap: false
        }
    };

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: false
        }
    };

    const px2rpxLoader = {
        loader: 'px2rpx-loader',
        options: {
            baseDpr: 1,
            rpxUnit: 0.5
        }
    };

    const loaders = [cssLoader, postcssLoader, px2rpxLoader];
    if (options.lang === 'less') {
        loaders.push({
            loader: 'less-loader',
            options: {
                sourceMap: false
            }
        });
    }

    if (env === 'production' || options.extract) {
        return ExtractTextPlugin.extract({
            use: loaders,
            fallback: 'vue-style-loader'
        });
    } else {
        return ['vue-style-loader'].concat(loaders);
    }
}

module.exports = {
    resolve: resolve,
    assetsPath: assetsPath,
    extractCSS: extractCSS
};
