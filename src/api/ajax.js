import axios from 'axios'
import {message} from 'antd'

axios.interceptors.request.use(config => {
  // console.log('request')
  return config
})


axios.interceptors.response.use(response => {
  // console.log('response', response)
  if(response.data.status !== 0) {
    message.error(response.data.msg)
    return response
  }
  return response.data
})

export default function ajax(url, data = {}, method = 'GET') {
  method = method.toLocaleLowerCase()
  return new Promise((resolve, reject) => {
    let promise 
    if(method === 'get') {
      promise = axios.get(url, {
        params: data
      })
    } else {
     promise = axios.post(url, data)
    }
    promise.then(res => {
      resolve(res)
    }).catch(err => {
      message.error('请求出错 ' + err.message)
    })
  })
}