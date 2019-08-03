import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'

function sFetchHotTopList ({
  $offset,
  $limit
} = {}) {
  return request({
    method: 'GET',
    res: THTX_SERVICE,
    api: 'hotRecommend/getAllHotRecommend',
    query: {
      $offset,
      $limit
    }
  })
}

function sDeleteHotTop (id) {
  return request({
    method: 'DELETE',
    res: THTX_SERVICE,
    api: '/hotRecommend/deleteHotRecommend',
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
function sPostHotTop ({
  orders,
  txuanId
}) {
  return request({
    method: 'POST',
    res: THTX_SERVICE,
    api: 'hotRecommend/addHotRecommend',
    body: {
      orders,
      txuanId
    }
  })
}

export default {
  sFetchHotTopList,
  sDeleteHotTop,
  sPostHotTop
}
