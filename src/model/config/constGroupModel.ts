import {http} from '../../helper/requestHelper'

const deleteConstGroup = async (idList: Array<any>) => {
  return http.request('/config/constGroup/delete', 'post', {
      idList: JSON.stringify(idList)
    })
}

const getConstGroupList = (pageIndex: Number, pageSize: Number) => {
  return http.request('/config/constGroup/list', 'post', {
      pageIndex,
      pageSize
    })
}

const getConstGroupDetail = (id:String) => {
  return http.request('/config/constGroup/detail', 'post', {
      id
    })
}

const editConstGroup=(groupInfo:Object)=>{
  return http.request('/config/constGroup/edit', 'post', groupInfo)
}


const addConstGroup=(groupInfo:Object)=>{
  return http.request('/config/constGroup/add', 'post', groupInfo)
}

export {
  addConstGroup,
  editConstGroup,
  getConstGroupDetail,
  getConstGroupList,
  deleteConstGroup
}