const { merge } = require('webpack-merge') 

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const commonConfig = require('./webpack.common.config')

module.exports = merge(commonConfig, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './public',
                    globOptions: {
                        ignore: [
                            "**/index.html", // 当前文件夹下所有的index.html
                        ]
                    }
                }
            ]
        }),
    ]
})
