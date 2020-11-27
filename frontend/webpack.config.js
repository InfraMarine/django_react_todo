const webpack = require('webpack');
const path = require("path")
const BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,

  entry: './static/index', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs

  output: {
      path: path.resolve('./static/bundles/'),
      filename: "[name]-[hash].js",
      publicPath: '',
  },

  plugins: [
    new BundleTracker({
        path: __dirname,
        filename: './webpack-stats.json',}),
  ],

  module: {
    rules: [
      {
        test: /\.js?$/, exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },     
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  },

  watchOptions: {
    aggregateTimeout: 1000,
    ignored: /node_modules/
  },
}
  