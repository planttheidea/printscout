'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    cache: false,

    devtool: '#source-map',

    entry: [
        path.resolve (__dirname, 'src', 'index.js')
    ],

    eslint: {
        configFile: '.eslintrc',
        emitError: true,
        failOnError: true,
        failOnWarning: true,
        formatter: require('eslint-friendly-formatter')
    },

    module: {
        preLoaders: [
            {
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'eslint-loader',
                test: /\.js$/
            }
        ],

        loaders: [
            {
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'babel',
                test: /\.js$/
            }
        ]
    },

    output: {
        filename: 'printscout.js',
        library: 'PrintScout',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
        umdNamedDefine: true
    },

    plugins: [
        new webpack.EnvironmentPlugin([
            'NODE_ENV'
        ])
    ],

    resolve: {
        extensions: [
            '',
            '.js'
        ],

        root: __dirname
    }
};
