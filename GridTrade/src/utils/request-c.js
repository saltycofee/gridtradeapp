import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
// import { stringify } from 'qs'

// create an axios instance
const serviceC = axios.create({
  // baseURL: 'http://127.0.0.1:8000', // url = base url + request url
  baseURL: 'http://192.168.77.132:8000',
  // withCredentials: true, // send cookies when cross-domain requests
  //timeout: 5000 // request timeout
})

// request interceptor
serviceC.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    // return Promise.reject(error)
  }
)

// response interceptor
serviceC.interceptors.response.use(
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
    return response
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    // return Promise.reject(error)
  }
)

export default serviceC
