import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'

function sFetchPinpaiRecommendList ({
  $offset,
  $limit
} = {}) {
  return request({
    method: 'GET',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'pinpaiRecommend/getPinpaiRecommendList',
    query: {
      $offset,
      $limit
    }
  })
}

function sDeletePinpaiRecommend (id) {
  return request({
    method: 'DELETE',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'pinpaiRecommend/deletePinpaiRecommend',
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
function sPostPinpaiRecommend ({
  pinpaiId,
  orders
}) {
  return request({
    method: 'POST',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'pinpaiRecommend/addPinpaiRecommend',
    body: {
      pinpaiId,
      orders
    }
  })
}

export default {
  sFetchPinpaiRecommendList,
  sDeletePinpaiRecommend,
  sPostPinpaiRecommend
}
