"use strict";

const webpack = require("webpack");
const path = require("path");

const APP_NAME = "aimbrain-web-sdk";
const APP_ENV = process.env.APP_ENV || "local";
const BUNDLE_NAME = process.env.BUNDLE_NAME || "bundle.js";

// Webpack configuration object
const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: BUNDLE_NAME,
    library: "Aimbrain",
    libraryTarget: "umd",
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ["", ".ts", ".tsx", ".js"]
  },
  // Turn on sourcemaps
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
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_ENV: JSON.stringify(APP_ENV),
    }),
  ],
  cache: true,
  devServer: {
    contentBase: "public",
    noInfo: true,
    hot: false,
    inline: true,
    port: 3000,
  },
};

// Production specific settings
if (APP_ENV === "production") {
  config.devtool = false;
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
    }),
  ]);
}

// Export the config
module.exports = config;
