"use strict";

const webpack = require("webpack");
const path = require("path");

const ENVIRONMENT = process.env.APP_ENV || "development";
const PRODUCTION = ENVIRONMENT === "production";
const BUNDLE_NAME = process.env.BUNDLE_NAME || (PRODUCTION ? "aimbrain-web-sdk.min.js" : "aimbrain-web-sdk.js");

const config = {
    entry: PRODUCTION ? "./src/index.production.ts" :  "./src/index.development.ts",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: BUNDLE_NAME,
        library: "Aimbrain",
        libraryTarget: "umd",
        publicPath: "/"
    },
    resolve: {
        extensions: ["", ".ts", ".tsx", ".js"]
    },
    devtool: "inline-source-map",
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "ts",
                query: {
                    configFileName: "tsconfig.bundle.json",
                },
            },
            {
                test: /\.html$/,
                loader: "html",
            },
            {
                test: /\.css$/,
                loader: "style!css",
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                loader: "url-loader",
            }
            // { 
            //     // Disable webpack-dev-server's auto-reload feature in the browser.
            //     test: path.resolve(__dirname, 'node_modules/webpack-dev-server/client'),
            //     loader: 'null-loader'
            // }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: PRODUCTION,
        })
    ],
    cache: true,
    devServer: {
        contentBase: "test-manual",
        noInfo: true,
        hot: true,
        inline: false,
        port: 3000,
        disableHostCheck: true
    },
};

// Production specific settings
if (PRODUCTION) {
    config.devtool = false;
    config.plugins = config.plugins.concat([
        new webpack.optimize.UglifyJsPlugin({          
            comments: false,
            compress: {
                pure_funcs: [ 'console.log' ]
            }
        }),
    ]);
}

// Export the config
module.exports = config;
