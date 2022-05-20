const path = require("path");
const title = "Hainan site";
function resolve(dir) {
  return path.join(__dirname, dir);
}
const IS_PROD = process.env.NODE_ENV === 'production'

module.exports = {
  devServer: {
    before: require("./mock/mock-server.js"),
  },
  lintOnSave:false,
  configureWebpack: {
    name: title,
    devtool:IS_PROD?"":"source-map"
  },
  chainWebpack(config) {
    // 1.修改svg规则，排除icons目录下的svg文件
    config.module.rule("svg").exclude.add(resolve("src/assets/icons"));
    // 2.新增icons规则，仅打包icons目录下的svg文件
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" })
      .end();
  },
};
