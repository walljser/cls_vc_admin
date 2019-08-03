import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'

function sFetchOfficerRecommendList ({
  $offset,
  $limit
} = {}) {
  return request({
    method: 'GET',
    res: THTX_SERVICE,
    api: 'officerRecommend/getOfficerRecommendList',
    query: {
      $offset,
      $limit
    }
  })
}

function sDeleteOfficerRecommend (id) {
  return request({
    method: 'DELETE',
    res: THTX_SERVICE,
    api: 'officerRecommend/deleteOfficerRecommend',
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
function sPostOfficerRecommend ({
  officerId,
  orders
}) {
  return request({
    method: 'POST',
    res: THTX_SERVICE,
    api: 'officerRecommend/addOfficerRecommend',
    body: {
      brandOfficerId: officerId,
      orders
    }
  })
}

export default {
  sFetchOfficerRecommendList,
  sDeleteOfficerRecommend,
  sPostOfficerRecommend
}
