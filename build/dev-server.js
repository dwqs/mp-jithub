const path = require('path');
const express = require('express');
const webpack = require('webpack');

const config = require('../config');
const webpackDevConfig = require('./webpack.dev.config');
const env = process.env.NODE_ENV || 'development';

const app = express();
const compiler = webpack(webpackDevConfig);

// serve pure static assets
const staticPath = path.posix.join(config[env].assetsPublicPath, config[env].assetsSubDirectory);
app.use(staticPath, express.static('./static'));

app.listen(config[env].port, 'localhost');

// for 小程序的文件保存机制
require('webpack-dev-middleware-hard-disk')(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    quiet: true
});
