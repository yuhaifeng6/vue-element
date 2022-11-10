import http from './http'

// get请求
export function getAPI (request, params) {
    return http.get(request, params)
}

// post请求
export function postAPI (request, params) {
    return http.post(request, params)
}

// put 请求
export function putAPI (resquest, params) {
    return http.post(request, params)
}

// delete 请求
export function deleteAPI (resquest, params) {
    return http.post(request, params)
}