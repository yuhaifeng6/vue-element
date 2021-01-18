module.exports = {
    devServer: {
        port: 3322,
        open: true,
    },

    productionSourceMap: false, // 生产环境不生成map文件
    publicPath: './',

    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/variable.scss";`
            }
        }
    }
};