const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 关闭map文件
  productionSourceMap:false,
  transpileDependencies: true,
  // 关闭eslink
  lintOnSave:false,
  //代理跨域
  devServer:{
    proxy:{
      'api':{
        target:'http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{'^/api':''}
      }
    }
  }
})
