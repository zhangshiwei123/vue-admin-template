import request from '@/utils/request'

const wellPage = {
  // 船舶结构
  getWellPage: data => request('wellbay/vesselPage', data) // POST请求
}

export default wellPage
