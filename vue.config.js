const path = require('path')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
   lintOnSave: true,
  // webpack.config
  configureWebpack: config => {
    config.resolve.alias['assets'] = resolve('src/assets')
    config.resolve.alias['components'] = resolve('src/components')
    config.resolve.alias['sass'] = resolve('src/sass')
    config.resolve.alias['views'] = resolve('src/views')
    config.resolve.alias['store'] = resolve('src/store')
    config.resolve.alias['mixins'] = resolve('src/mixins')
    config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'
    config.resolve.alias['utilities'] = resolve('src/utilities')
  },

  //css
  css: {
    loaderOptions: {
      sass: {
        data: `@import 'sass/global.scss';`
      }
    }
  }
}