const path = require('path')
const env = process.env.NODE_ENV

// 拼接路径
function resolve(dir) {
  return path.join(__dirname, dir)
}

// const baseUrl =  '/'

module.exports = {
  // baseUrl,
  outputDir: 'build',

  devServer: {
    // publicPath: process.env.BASE_URL,
    proxy: {
      '/.*\.(json|htm)': {
        target: 'http://localhost:8893',
        changeOrigin: true,
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  },
  devServer: {
    port: 8081,
  },
  // webpack.config
  configureWebpack: config => {
    config.resolve.alias['assets'] = resolve('src/assets')
    config.resolve.alias['components'] = resolve('src/components')
    config.resolve.alias['sass'] = resolve('src/sass')
    config.resolve.alias['views'] = resolve('src/views')
  }
}
