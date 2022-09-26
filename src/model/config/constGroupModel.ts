import {http} from '../../helper/requestHelper'

const deleteConstGroup = async (idList: Array<any>) => {
  return http.request('/config/constGroup/delete', 'post', {
      idList: JSON.stringify(idList)
    })
}

const getConstGroupList = (pageIndex: Number, pageSize: Number) => {
  return http.request('/config/constGroup/get', 'post', {
      pageIndex,
      pageSize
    })
}

export {
  getConstGroupList,
  deleteConstGroup
}