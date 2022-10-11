import {http} from '../../helper/requestHelper'

const addConst=(constInfo:Object)=>{
  return http.request('/config/const/add', 'post', constInfo)
}

const deleteConst = async (idList: Array<any>) => {
  return http.request('/config/const/delete', 'post', {
      idList: JSON.stringify(idList)
    })
}

const editConst=(constInfo:Object)=>{
  return http.request('/config/const/edit', 'post', constInfo)
}

const getConstList = (pageIndex: Number, pageSize: Number,constGroupId:string) => {
  return http.request('/config/const/list', 'post', {
      pageIndex,
      pageSize,
      constGroupId
    })
}

const getConstDetail = (id:String) => {
  return http.request('/config/const/detail', 'post', {
      id
    })
}

export {
  addConst,
  deleteConst,
  editConst,
  getConstList,
  getConstDetail,
}