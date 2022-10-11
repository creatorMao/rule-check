import {http} from '../../helper/requestHelper'

const addReqParam=(groupInfo:Object)=>{
  return http.request('/config/reqParam/add', 'post', groupInfo)
}

const deleteReqParam = async (idList: Array<any>) => {
  return http.request('/config/reqParam/delete', 'post', {
      idList: JSON.stringify(idList)
    })
}

const editReqParam=(groupInfo:Object)=>{
  return http.request('/config/reqParam/edit', 'post', groupInfo)
}

const getReqParamList = (pageIndex: Number, pageSize: Number,groupId:String) => {
  return http.request('/config/reqParam/list', 'post', {
      pageIndex,
      pageSize,
      groupId
    })
}

const getReqParamDetail = (id:String) => {
  return http.request('/config/reqParam/detail', 'post', {
      id
    })
}

export {
  addReqParam,
  deleteReqParam,
  editReqParam,
  getReqParamList,
  getReqParamDetail
}