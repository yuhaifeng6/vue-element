import axios from "axios"
import store from '../store/index'

// 创建一个axios实例
const service = axios.create({
    timeout: 3000, // 请求超时时间
});

// 添加请求拦截器
service.interceptors.request.use(config => {
        // 发请求前，将token携带到headers上
        store.commit('getToken')
        const token = store.state.user.token
        if (token) {
            config.headers = {
                'Authorization': token
            }
        }
        return config
    },
    err => {
        console.log(err)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        let res = {}
        res.status = response.status
        res.data = response.data
        return res
    },
    err => {
        console.log(err)
    }
)

export default service;