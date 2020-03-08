import Mock from "mockjs"
import homeApi from "./home.js"
import userApi from "./user.js"
import permissionApi from "./permission.js"

// 设置200-2000ms延时 来模拟现实中请求接口
// Mock.setup({
//     timeout: '200-2000',
// })

// 首页相关
Mock.mock("/home/getData", 'get', homeApi.getStatisticalData)

// 用户相关
Mock.mock(/\/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/\/user\/del/, 'get', userApi.deleteUser)
Mock.mock(/\/user\/batchremove/, 'get', userApi.batchremove)
Mock.mock(/\/user\/add/, 'post', userApi.createUser)
Mock.mock(/\/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)

// 权限
Mock.mock(/\/permission\/getMenu/, 'post', permissionApi.getMenu)

