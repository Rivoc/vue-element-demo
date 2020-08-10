import axios from 'axios'
import { Loading, Message } from 'element-ui'
import base from './base'

let loading

function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '加载中....',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading () {
  loading.close()
}
const instance = axios.create({ timeout: 1000, baseURL: base.url })

// 请求拦截
instance.interceptors.request.use(
  (confing) => {
    startLoading()

    // 设置请求头
    if (localStorage.eToken) {
      confing.headers.Authorization = localStorage.eToken
    }

    return confing
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截

instance.interceptors.response.use(
  (response) => {
    endLoading()
    return response
  },
  (error) => {
    Message.error(error.response.data)
    endLoading()

    // 获取状态码
    const { status } = error.response

    if (status === 404) {
      Message.error('网络错误')
    }
    return Promise.reject(error)
  }
)
export default instance
// import axios from 'axios'
// import service from './contactApi'
// // service 循环遍历输出不同的请求方法
// const instance = axios.create({
//   baseURL: 'https://www.fastmock.site/mock/95451b1d98815e84657275d22150501f/api',
//   timeout: 1000
// })
// const Http = {} // 包裹请求方法的容器

// // 请求格式/参数的统一
// for (const key in service) {
//   const api = service[key] // url method
//   // async 作用：避免进入回调地狱
//   Http[key] = async function (
//     params, // 请求参数 get：url，put，post，patch（data），delete：url
//     isFormData = false, // 标识是否是form-data请求
//     config = {} // 配置参数  详细配置查看https://blog.csdn.net/qq_41866776/article/details/98478632
//   ) {
//     let newParams = {}

//     //  content-type是否是form-data的判断
//     if (params && isFormData) {
//       newParams = new FormData()
//       for (const i in params) {
//         newParams.append(i, params[i])
//       }
//     } else {
//       newParams = params
//     }
//     // 不同请求的判断  // 这里依据项目要求自行更改传参格式
//     let response = {} // 请求的返回值
//     if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
//       try {
//         response = await instance[api.method](api.url, newParams, config)
//       } catch (err) {
//         response = err
//       }
//     } else if (api.method === 'delete' || api.method === 'get') {
//       config.params = newParams // 即将与请求一起发送的 URL 参数// 必须是一个无格式对象(plain object)或 URLSearchParams 对象
//       try {
//         response = await instance[api.method](api.url, config)
//       } catch (err) {
//         response = err
//       }
//     }
//     return response // 返回响应值
//   }
// }

// export default Http
