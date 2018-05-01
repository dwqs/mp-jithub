const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const utils = require('./utils');
const config = require('../config');

const env = process.env.NODE_ENV || 'development';

console.log('---------env------:', env, '\n');

function getEntry (dir, entryFile) {
    const files = fs.readdirSync(dir);
    return files.reduce((res, k) => {
        const page = path.resolve(dir, k, entryFile);
        if (fs.existsSync(page)) {
            res[k] = page;
        }
        return res;
    }, {});
}
  
const appEntry = { app: utils.resolve('./src/main.js') };
const pagesEntry = getEntry(utils.resolve('./src/pages'), 'main.js');
const entry = Object.assign({}, appEntry, pagesEntry);

module.exports = {
    context: utils.resolve('src'),
    entry: entry,
    target: require('mpvue-webpack-target'),
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'mpvue-loader',
                options: {
                    loaders: {
                        css: utils.extractCSS({
                            extract: true
                        }),
                        less: utils.extractCSS({
                            lang: 'less',
                            extract: true
                        })
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader', 
                    {
                        loader: 'mpvue-loader',
                        options: {
                            checkMPEntry: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('images/[name].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[ext]')
                }
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue': 'mpvue',
            '@src': utils.resolve('src'),
            '@components': utils.resolve('src/components')
        },
        symlinks: false
    },

    resolveLoader: {
        modules: [utils.resolve('node_modules')]
    },

    performance: {
        hints: false
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(env)
            }
        }),

        new CopyWebpackPlugin([
            { 
                context: '..', 
                from: 'static/**/*', 
                to: utils.resolve('dist'), 
                force: true,
                ignore: ['.*']
            }
        ]),
        new ProgressBarPlugin()
    ]
};
