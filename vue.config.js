const path = require("path");

module.exports = {
  publicPath: "/", // 根域上下文目录
  outputDir: "dist", // 构建输出目录
  assetsDir: "static/app/wap", // 静态资源目录 (js, css, img, fonts)
  lintOnSave: true, // 是否开启eslint保存检测，有效值：ture | false | "error"
  runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  chainWebpack: (config) => { // webpack的共同配置
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", path.resolve("src"))
      .set("stylus", path.resolve("src/assets/stylus"))
      .set("common", path.resolve("src/components"))
  },
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
    sourceMap: false // 是否在构建样式地图，false将提高构建速度
  },
  parallel: require("os").cpus().length > 1, // 构建时开启多进程处理babel编译
  devServer: {
    proxy: {
      "/api": {
        target: "http://kf0001.rungyun.cn",
        ws: true,
        changeOrigin: true
      }
    }
  }
};