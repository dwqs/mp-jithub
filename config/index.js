const path = require('path');

module.exports = {
    development: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
        assetsSubDirectory: 'static',
        contentBase: path.resolve(__dirname, '../dist'),
        port: 8080,
        cssSourceMap: false
    },
    production: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
        contentBase: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        bundleAnalyzerReport: false,
        productionSourceMap: false
    }
};
