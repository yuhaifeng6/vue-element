import axiosConfig from '@/api/axios_config'

const http = {
/**
 * methods: 请求
 * @param url 请求地址
 * @param params 请求参数
 */
  get (url, params) {
    const config = {
      method: 'get',
      url: url
    }
    if (params) config.params = params
    return axiosConfig(config)
  },
  post (url, params, timeout) {
    const config = {
      method: 'post',
      url: url
    }
    if (params) config.data = params
    if (timeout) config.timeout = timeout
    return axiosConfig(config)
  },
  put (url, params) {
    const config = {
      method: 'put',
      url: url
    }
    if (params) config.params = params
    return axiosConfig(config)
  },
  delete (url, params) {
    const config = {
      method: 'delete',
      url: url
    }
    if (params) config.params = params
    return axiosConfig(config)
  }
}

export default http