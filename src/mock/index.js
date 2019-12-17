import Mock from "mockjs"
import homeApi from "./home.js"

// 设置200-2000ms延时 来模拟现实中请求接口
Mock.setup({
    timeout: '200-2000',
})

// 首页相关
Mock.mock("/home/getData", 'get', homeApi.getHomeData)
Mock.mock("/home/getOtherData", "post", homeApi.getHomeOtherData)