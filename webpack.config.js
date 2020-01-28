'use strict';
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
    entry: {
        'main': './src/ts/index.ts'
    },
    devtool: 'source-map',
    devServer: {},
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './bin/js/'),
        filename: '[name].js',
        publicPath: './bin/js/',
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.webpack.js', '.web.js', '.js'],
        symlinks:true,
        modules: [
            'node_modules',
            path.resolve(__dirname, './src/ts/')
        ]
    },

    module: {
        rules: [
            /****************
            * PRE-LOADERS
            *****************/
           {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader'
            },
            {
                enforce: 'pre',
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'tslint-loader'
            },

            /****************
            * LOADERS
            *****************/
            {
                test: /\.ts$/,
                exclude: [ /node_modules/ ],
                use: 'awesome-typescript-loader'
            }   
        ]      
    },
    externals: {
        puppeteer: 'require("puppeteer")',
        express: 'require("express")',
        fs: 'require("fs")',
    },
    plugins: [
        new CheckerPlugin()
    ]
};