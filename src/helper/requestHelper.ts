import axios from 'axios'
import { createErrorMessage } from './messageHelper'

const http: any = axios.create({
  baseURL: 'http://192.168.1.201:3000/',
});

http.interceptors.request.use(function (config:any) {
  return config;
}, function (error:any) {
  return Promise.reject(error);
});

http.interceptors.response.use(function (response:any) {
  return response;
}, function (error:any) {
  const { code } = error;
  console.log(error);
  let message = '请求失败！';
  switch (code) {
    case 'ERR_NETWORK':
      message = '请求地址网络错误，请检查对应接口是否启动服务！'
      break;
    default:
      break;
  }
  createErrorMessage(message, 2000);

  return Promise.reject(error);
});

http.request = (url: String, method: String, param: any) => {
  return new Promise((resolve, reject) => {
    http({
      method,
      url: url,
      data: method === 'post' ? param : {},
      param: method === 'get' ? param : {}
    })
      .then((res: any) => {
        const { data } = res;
        resolve(data);
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

export {
  http
}