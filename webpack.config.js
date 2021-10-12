const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 每次打包之后删除之前的 dist
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

const { DefinePlugin } = require('webpack'); // 定义上下文变量，webpack内置的

const CopyWebpackPlugin = require('copy-webpack-plugin');

const { VueLoaderPlugin } = require('vue-loader/dist/index')

// 安装 webpack-dev-server
// 1、其实自启动也是通过webpack-cli进行启动的，是express的一个框架开启了本地服务，然后返回给浏览器
// 2、其实也是进行编译打包了代码，但是保存到了本地，使用了一个叫（memfs，memory file system）然后浏览器访问到内存中的代码。
// 3、为什么不直接保存到内存文件夹中，是为了提升访问效率

module.exports = {
  target: 'web', // 为 某个环境进行打包 和 devServer hot同时使用
  mode: 'development', // 设置 模式， development / production
  devtool: 'source-map',// 设置 source-map， 会打包生成映射模式，方便调试代码和查看错误 
  entry: './src/main.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  devServer: {
    hot: true, // Hot Module Replace,但是其实也是建立了一个 websocket的长连接
    client: {
      progress: true, // 显示静态资源打包进度
    },
    static: ['public'],
    compress: true, // 采用 gzip
    host: '0.0.0.0',
    port: 6666
    // contentBase: './public', // 表示没有从Webpack中读取的话，会从这个资源进行加载
  },
  module: {
    // loader 是在模块加载的时候需要用loader进行转化处理的
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"] // 注意， loader 的执行顺序是从后往前的，而逻辑上应该是先进行 css-loader 
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },


      // webpack 5
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        type: "asset",
        generator: {
          filename: 'img/[hash]_[ext][query]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于 10kb 的才会进行base64转换 这里的 maxSize 和 limit是一个道理
          }
        },
      },
      {
        test: /\.(eot|ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name]_[hash:6][ext]'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }



      // -------- webpack 4 

      // {
      //   test: /\.(jpe?g|png|gif|svg)$/,
      //   use: {
      //     loader: 'url-loader',
      //     options: {
      //       outputPath: 'images',
      //       name: "[name]_[hash:6].[ext]",
      //       limit: 3 * 1024, // 单位是字节，小于 3 kb，才做 base64编码
      //     }
      //   }
      // },
      // {
      //   test: /\.(eot|ttf|woff2?)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       outputPath: 'font',
      //       name: '[name]_[hash:6].[ext]'
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    // 注：插件的执行与内置的 Hook有关系，所有这个地方插件的顺序可以随便写
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Webpack Study'
    }),
    new DefinePlugin({
      BASE_URL: "'./'",
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: 'public',
    //       to: './',
    //       globOptions: {
    //         ignore: [
    //           "**/index.html", // 当前文件夹下所有的index.html
    //         ]
    //       }
    //     }
    //   ]
    // }),
    new VueLoaderPlugin()
  ],
};
