const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, './dist'),
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
            maxSize: 2 * 1024 // 小于2kb的才会进行base64转换 这里的 maxSize 和 limit是一个道理
          }
        },
      },
      {
        test: /\.(eot|ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name]_[hash:6][ext]'
        }
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin()
  ]
};
