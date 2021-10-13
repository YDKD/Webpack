const path = require('path');


const HtmlWebpackPlugin = require('html-webpack-plugin'); 

const { DefinePlugin } = require('webpack'); // 定义上下文变量，webpack内置的


const { VueLoaderPlugin } = require('vue-loader/dist/index')

// 安装 webpack-dev-server
// 1、其实自启动也是通过webpack-cli进行启动的，是express的一个框架开启了本地服务，然后返回给浏览器
// 2、其实也是进行编译打包了代码，但是保存到了本地，使用了一个叫（memfs，memory file system）然后浏览器访问到内存中的代码。
// 3、为什么不直接保存到内存文件夹中，是为了提升访问效率

module.exports = {
  target: 'web', // 为 某个环境进行打包 和 devServer hot同时使用
  entry: './src/main.js', // 此处不用写 ../ 是因为 webpack里面有一个默认的属性context 会自动从根路径开始查找
  resolve: {
    alias: {
      "@": path.resolve(__dirname, '../src'), // 别名
    },
    extensions: ['.vue', '...'], // 这个就是文件模块查找时的后缀，如果在其中有的话，则不需要写对应的后缀名，默认里面有 '.js', '.json', '.wasm'
  },
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, '../dist'),
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
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Webpack Study'
    }),
    new DefinePlugin({
      BASE_URL: "'./'",
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
    
    new VueLoaderPlugin()
  ],
};
