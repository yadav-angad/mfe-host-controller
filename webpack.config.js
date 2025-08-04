const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    publicPath: '/mfe-host-controller/',
    path: path.resolve(__dirname, "build"),
    filename: "main.js",
  },
  devServer: {
    port: 3000,
    liveReload: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  name: "shell",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin(),
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        MfeIndia: "MfeIndia@https://yadav-angad.github.io/mfe-india/remoteEntry.js",
        MfeUsa: "MfeUsa@https://yadav-angad.github.io/mfe-usa/remoteEntry.js",
      },
      exposes: {
        './context/CommonContext': "./src/context/CommonContext.js", // Expose the CommonContext
        './store': './src/store/store.js',
      },
      shared: {
        "react": {
          singleton: true,
          requiredVersion: dependencies.react
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"]
        },
        "@mui/material": {
          singleton: true,
          requiredVersion: dependencies["@mui/material"]
        },
        "@mui/icons-material": {
          singleton: true,
          requiredVersion: dependencies["@mui/icons-material"]
        },
        "redux": {
          singleton: true,
          requiredVersion: dependencies.redux
        },
        "react-redux": {
          singleton: true,
          requiredVersion: dependencies["react-redux"]
        },
      }
    })
  ],
};
