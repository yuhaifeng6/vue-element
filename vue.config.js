// 导入compression-webpack-plugin 用作gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义gzip压缩文件类型
const productionGzipExtensions = ['js', 'css']

module.exports = {
    devServer: {
        port: 3322,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3004',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },

    productionSourceMap: false, // 生产环境不生成map文件
    publicPath: './',

    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/variable.scss";`
            }
        }
    },

    configureWebpack: {
        plugins: [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),//匹配文件名
                threshold: 1024,//对1K以上的数据进行压缩
                minRatio: 0.8,
                deleteOriginalAssets: false,//是否删除源文件
            })
        ]
    }
};