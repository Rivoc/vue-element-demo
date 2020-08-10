import axios from './http'
import QS from 'qs'

// 获取表格数据
export function getTableData (currentPage = 1, limit = 10, data) {
  return axios({
    url: '/shopinfo/1A',
    method: 'post',
    data: QS.stringify(data)
  })
}
