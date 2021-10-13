const { merge } = require('webpack-merge') 

const commonConfig = require('./webpack.common.config')

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        hot: true, // Hot Module Replace,但是其实也是建立了一个 websocket的长连接
        client: {
            progress: true, // 显示静态资源打包进度
        },
        static: ['./public'],
        compress: true, // 采用 gzip
        host: '0.0.0.0',
        port: 10001,
        proxy: {
            "/api": {
              target: "http://www.baidu.com",
              pathRewrite: { '^/api': '/api' },
              secure: false, // 默认是 true，如果是请求一个有 https证书的地址，如果希望在没有证书的时候也可以进行请求，则改为false
              // changeOrigin: true, // 意思是在请求的时候，是否需要将请求信息 例如从 http://localhost:10001 -> http://www.baidu.com。
            }
          }
    },
})
