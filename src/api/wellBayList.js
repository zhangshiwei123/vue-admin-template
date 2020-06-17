import request from '@/utils/request'

const wellBayList = {
  // 船列表前20条数据
  getOperationsList: data => request('/wellbay/vesseloperations', data), // POST请求
  // 插入一条船信息
  addOperationsInfo: data => request('/wellbay/vesseloperations/add', data), // POST请求
  // 搜索船列表信息
  searchOperationsInfo: data => request('/wellbay/vesseloperations/search', data), // POST请求
  // 删除穿列表信息
  delOperationsInfo: data => request('/wellbay/vesseloperations/del', data) // POST请求
}

export default wellBayList
