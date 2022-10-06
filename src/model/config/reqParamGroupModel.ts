import {http} from '../../helper/requestHelper'

const addReqParamGroup=(groupInfo:Object)=>{
  return http.request('/config/reqParamGroup/add', 'post', groupInfo)
}

const deleteReqParamGroup = async (idList: Array<any>) => {
  return http.request('/config/reqParamGroup/delete', 'post', {
      idList: JSON.stringify(idList)
    })
}

const editReqParamGroup=(groupInfo:Object)=>{
  return http.request('/config/reqParamGroup/edit', 'post', groupInfo)
}

const getReqParamGroupList = (pageIndex: Number, pageSize: Number) => {
  return http.request('/config/reqParamGroup/list', 'post', {
      pageIndex,
      pageSize
    })
}

const getReqParamGroupDetail = (id:String) => {
  return http.request('/config/reqParamGroup/detail', 'post', {
      id
    })
}

export {
  addReqParamGroup,
  deleteReqParamGroup,
  editReqParamGroup,
  getReqParamGroupList,
  getReqParamGroupDetail
}