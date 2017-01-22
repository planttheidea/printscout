'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');

const PORT = 3000;

module.exports = {
    cache: true,

    devServer : {
        contentBase: './dist',
        host: 'localhost',
        inline: true,
        lazy: false,
        noInfo: false,
        quiet: false,
        port: PORT,
        stats: {
            colors: true,
            progress: true
        }
    },

    devtool: '#source-map',

    entry: [
        path.resolve (__dirname, 'DEV_ONLY', 'App.js')
    ],

    eslint: {
        configFile: '.eslintrc',
        emitError: true,
        failOnError: true,
        failOnWarning: false,
        formatter: eslintFriendlyFormatter
    },

    module: {
        preLoaders: [
            {
                cacheable: true,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'eslint-loader',
                test: /\.js$/
            }
        ],

        loaders: [
            {
                cacheable: true,
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'DEV_ONLY')
                ],
                loader: 'babel',
                query: {
                  cacheDirectory: true,
                  preset: [
                    'react'
                  ]
                },
                test: /\.js$/
            }
        ]
    },

    output: {
        filename: 'printscout.js',
        library: 'printscout',
        path: path.resolve(__dirname, 'dist'),
        publicPath: `http://localhost:${PORT}/`,
        umdNamedDefine: true
    },

    plugins: [
        new webpack.EnvironmentPlugin([
            'NODE_ENV'
        ]),
        new HtmlWebpackPlugin()
    ],

    resolve: {
        extensions: [
            '',
            '.js'
        ],

        root: __dirname
    }
};
