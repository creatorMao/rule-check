import axios from 'axios'
import { createErrorMessage } from './messageHelper'

const http: any = axios.create({
  baseURL: 'http://192.168.1.201:3000/',
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
        const { code } = err;
        console.log(err);
        let message = '请求失败！';
        switch (code) {
          case 'ERR_NETWORK':
            message = '请求地址网络错误，请检查对应接口是否启动服务！'
            break;
          default:
            break;
        }
        createErrorMessage(message, 2000);
        reject(err)
      })
  })
}

export {
  http
}