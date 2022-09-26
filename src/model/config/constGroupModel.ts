import {http} from '../../helper/requestHelper'

const deleteConstGroup = async (idList: Array<any>) => {
  return new Promise((resolve,reject)=>{
    http.request('/config/constGroup/delete', 'post', {
      idList: JSON.stringify(idList)
    })
    .then((res: any) => {
      resolve(res);
    })
  })
}

const getConstGroupList = (pageIndex: Number, pageSize: Number) => {
  return new Promise((resolve,reject)=>{
    http.request('/config/constGroup/get', 'post', {
      pageIndex,
      pageSize
    })
    .then((res: any) => {
      resolve(res);
    })
  })
}

export {
  getConstGroupList,
  deleteConstGroup
}