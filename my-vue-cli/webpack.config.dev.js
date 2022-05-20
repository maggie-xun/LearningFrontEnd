const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/main.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    open: true,
    hot: true, //开启HMR
    //样式文件：可以使用HMR，因为style-loader内部实现了
    //js:默认没有HMR功能,需要添加支持HMR的代码
    // if(modue.hot){
    //   module.hot.accept('./pring.js',function(){
    //   //方法会监听pring.js文件的变化，一旦发生变化，其他文件就不会重新打包了，
    //   print();
    //   })
    // }
    //HMTL文件，默认没有HMR功能，同时不能热更新了
    //解决：在入口文件加入HTML
    proxy: {
      "/dist": "/",
    },
  },
  devtool: "cheap-source-map",
  module: {
    rules: [
      { test: /\.vue$/, use: "vue-loader" },
      {
        test: /\.s[ca]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
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
        test: /\.html$/,
        loader: "html.loader",
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin(), new VueLoaderPlugin()],
};
