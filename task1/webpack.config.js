var path = require('path');
var HTMLWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: "./src/index.jsx", // входная точка - исходный файл
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'main.js'
    },
    devServer: {
        historyApiFallback: {
            disableDotRule: true
        }
    },
    module: {
        rules: [{
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                        ],
                        sourceMap: true,
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            }
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "index.html"
        }),
        // new CopyWebpackPlugin({
        //     patterns: [{
        //             from: path.resolve(__dirname, "public/back.jpg"),
        //             to: path.resolve(__dirname, "dist")
        //         },
        //         {
        //             from: path.resolve(__dirname, "public/18338.otf"),
        //             to: path.resolve(__dirname, "dist")
        //         },
        //         {
        //             from: path.resolve(__dirname, "public/edit.png"),
        //             to: path.resolve(__dirname, "dist")
        //         },
        //         {
        //             from: path.resolve(__dirname, "public/ok.png"),
        //             to: path.resolve(__dirname, "dist")
        //         }
        //     ]
        // })
    ],
    resolve: {
        extensions: ['.jsx', '.js', '.json']
    }
}