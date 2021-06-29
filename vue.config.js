module.exports = {
  publicPath: './', // 部署应用包时的基本 URL。这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径，
  outputDir: process.env.outputDir, // 生成的生产环境构建文件的目录
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  indexPath: 'index.html',
  filenameHashing: true, // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希
  lintOnSave: false, // Type: boolean | 'warning' | 'default' | 'error'  设置为 true 或 'warning' 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
  // cli3 代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
  productionSourceMap: process.env.NODE_ENV == 'development' ? true : false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。开启productionSourceMap后，浏览器控制台明确的告诉我们test这条结果的输出语句在main.js的20行。这就是source map的作用，对于开发人员差错时非常有用的。
  devServer: {
    port: 8080, // 设置端口号,
    host: 'localhost',
    open: true, //配置自动启动浏览器
    proxy: { // 跨域
      '/userUrl': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/userUrl': ''
        }
      },
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
    overlay: {// 错误或者警告出现在浏览器上?
      warnings: false,
      errors: true
    },
  },
  configureWebpack: { // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
    externals: {
      './cptable': 'var cptable'
    }
  },
  // chainWebpack  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
}