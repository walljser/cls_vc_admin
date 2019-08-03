import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'

function sFetchTodayRecommendList ({
  $offset,
  $limit
} = {}) {
  return request({
    method: 'GET',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'todayRecommend/getAllTodayRecommend',
    query: {
      $offset,
      $limit
    }
  })
}

function sDeleteTodayRecommend (id) {
  return request({
    method: 'DELETE',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'todayRecommend/deleteTodayRecommend',
    query: {
      id
    }
  })
}

/**
 * 品牌官分类添加
 *
 * @param {any} [{
 *   categoryName,
 *   orders
 * }={}]
 * @returns
 */
function sPostTodayRecommend ({
  orders,
  txuanId
}) {
  return request({
    method: 'POST',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'todayRecommend/addTodayRecommend',
    body: {
      orders,
      txuanId
    }
  })
}

export default {
  sFetchTodayRecommendList,
  sDeleteTodayRecommend,
  sPostTodayRecommend
}
