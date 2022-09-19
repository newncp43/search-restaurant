const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'https://maps.googleapis.com/'
  },
  productionSourceMap: false,
    publicPath: '/search-restaurant/'
})
