/* eslint-disable no-undef */
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.[hash:10].js",
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    open: true,
    hot: true,
    proxy: {
      "/dist": "/",
    },
  },
  devtool: "cheap-source-map",
  module: {
    rules: [
      { test: /\.vue$/, use: "vue-loader" },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          // inject style into style-loader,production不需要
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",

          {
            //配合package.json中定义browserslist
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [["postcss-preset-env"]],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                // {
                //   useBuiltIns: "usage", //按需加载babel/polyfill
                //   corejs: { version: 3 },
                //   targets: {
                //     ie: "9",
                //   },
                // },
              ],
            ],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg|webp)$/,
      //   type: "asset/resource",
      // },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          // 问题：因为url-loader默认使用es6模块化解析，而html-loader是使用commonJS
          esModule: false,
          name: "[hash:10].[ext]",
        },
      },
      {
        //处理html中引入的资源，如图片
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        exclude: /\.(js|css|sas|html|jpg|png|gif)/,
        loader: "file-loader",
        options: {
          outputPath: "public",
        },
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        //html压缩
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "build.[hash:10].css",
    }),
    new ESLintPlugin({
      fix: true,
    }),
  ],
};
