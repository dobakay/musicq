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
    // node: {
    //     fs: 'empty',
    //     net: 'empty'
    // },
	/**
     * The "output" property is what our build files will be named and where the
     * build file will be placed
     */
    output: {
        path: path.resolve(__dirname, '../bin/js/'),
        filename: '[name].js',
        publicPath: '../bin/js/',
        libraryTarget: "commonjs"
    },

    // resolveLoader: {
    //     modules: [
    //         path.join(__dirname, './node_modules/source-map-loader/index.js'),
    //         path.join(__dirname, './node_modules/awesome-typescript-loader/index.js'),
    //     ]
    // },
    resolve: {
        extensions: ['.ts', '.tsx', '.webpack.js', '.web.js', '.js'],
        symlinks:true,
        modules: [
            'node_modules',
            // path.join(__dirname, './node_modules/source-map-loader/index.js'),
            // path.join(__dirname, './node_modules/awesome-typescript-loader/index.js'),
            // path.join(__dirname, './node_modules/tsyringe/index.js'),
            path.resolve(__dirname, '../src/ts/')
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