module.exports = {
    devServer: {
        port: 3322,
        open: true,
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/variable.scss";`
            }
        }
    }
};