const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (env, argv) => {
  return {
    entry: "./src/index.js",
    output: {
      filename: "bundled.js",
      publicPath: argv.mode === 'production' ? '/riga-safety-perception-map' : '/',
      path: path.resolve(__dirname, "build"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
    resolve: {
      modules: [__dirname, "src", "node_modules"],
      extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    },
    devServer: {
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: require.resolve("babel-loader"),
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.png|svg|jpg|gif$/,
          use: ["file-loader"],
        }, 
      ],
    },
  };
};