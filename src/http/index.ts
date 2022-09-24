import axios from 'axios'

const http:any = axios.create({
  baseURL: 'http://192.168.1.201:3000/',
});

http.request = (url, method, param) => {
  return new Promise((resolve, reject) => {
    http({
      method,
      url: url,
      data: method === 'post' ? param : {},
      param: method === 'get' ? param : {}
    })
      .then((res) => {
        const { data } = res;
        resolve(data);
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default http