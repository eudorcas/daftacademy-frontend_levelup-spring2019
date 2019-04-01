const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    isProduction
                        ? MiniCssExtractPlugin.loader
                        : { loader: 'style-loader', options: { sourceMap: true } },
                    { loader: 'css-loader', options: { sourceMap: isProduction } },
                    { loader: 'postcss-loader', options: { sourceMap: isProduction } },
                    { loader: 'sass-loader', options: { sourceMap: isProduction } }
                ]

            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
};
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var path = require('path');
//
// module.exports = {
//     entry: './src/index.js',
//     output: {
//         filename: 'main.js',
//         path: path.resolve(__dirname, 'dist')
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: "babel-loader",
//                     options: {
//                         presets: [[
//                             '@babel/preset-env', {
//                                 targets: {
//                                     browsers: ['> 1%', 'last 2 versions']
//                                 }
//                             }
//                         ]]
//                     }
//                 }
//             },
//             {
//                 test: /\.css$/,
//                 use: [
//                     'style-loader',
//                     'css-loader'
//                 ]
//             },
//             {
//                 test: /\.scss$/,
//                 use: [
//                     'style-loader',
//                     'css-loader',
//                     'sass-loader'
//                 ]
//             }
//         ]
//     },
//     plugins: [new HtmlWebpackPlugin({
//         template: './src/index.html'
//     })]
// };