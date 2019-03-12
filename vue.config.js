/* eslint-disable */
module.exports = {
  // 基本路径
  publicPath: '/',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // compiler: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/zh/guide/webpack.md
  chainWebpack: (config) => {
    // html-loader & markdown-loader
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('markdown-loader')
      .loader('html-loader')
    //     .loader('markdown-loader')
    //     .options({})

    // html-webpack-plugin
    config
      .plugin('html')
      .tap(args => {
        args[0].favicon = 'public/favicon.ico';
        return args;
      })
  },
  configureWebpack: () => {},
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    sourceMap: false,
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    },
    modules: false,
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 4321,
    https: false,
    hotOnly: false,
    // 设置代理, 监听后台端口
    proxy: 'http://ngabbs.com',
    before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    'cube-ui': {
      postCompile: false,
      theme: false
    }
  }
 }
 
