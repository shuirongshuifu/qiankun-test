const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const { name } = require('./package')

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    output: {
      /**
       * 把子应用打包成 umd 库格式，不加主应用报错：application 'child1' died in status
       *                                          You need to export lifecycle functions in child1 entry
       * */
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    }
  },
  devServer: {
    open: false,
    host: "0.0.0.0",
    port: 10001,
    https: false,
    hotOnly: false,
    /**
     * 本地代理服务要允许跨域，否则qiankun主应用无法加载此子应用资源
     * */
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}
