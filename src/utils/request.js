import axios from 'axios'
import {
  Message
} from 'element-ui'
import store from '@/store'
import qs from 'qs'
// import { getToken } from '@/utils/auth'

// create an axios instance
// 'http://192.168.105.218:8000' || 192.168.105.218
console.log(window.location.origin + '/api')
const service = axios.create({
  baseURL: 'http://10.66.66.18:8888', // url = base url + request url
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // config.headers['Access-Control-Allow-Origin'] = '*'
    if (config.method === 'post') {
      config.data = qs.stringify({
        ...config.data
      })
    }

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // return res // TODO:devcms临时联调
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 0) {
    //   // Message({
    //   //   message: res.msg || 'Error',
    //   //   type: 'error',
    //   //   duration: 5 * 1000
    //   // })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 2 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm(
    //       'You have been logged out, you can cancel to stay on this page, or log in again',
    //       'Confirm logout', {
    //         confirmButtonText: 'Re-Login',
    //         cancelButtonText: 'Cancel',
    //         type: 'warning'
    //       }
    //     ).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }

    //   // document.getElementsByClassName('el-loading-mask')[0].style.display = 'none'

    //   return Promise.reject(new Error(res.msg || 'Error'))
    // } else {
    //   return res
    // }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

const request = (url, data, type = 0) => {
  if (type === 0) {
    return service({
      url,
      method: 'post',
      data
    })
  } else {
    return service({
      url,
      method: 'get',
      params: {
        ...data
      }
    })
  }
}

export default request
