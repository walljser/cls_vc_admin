import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'

function sFetchPinpaiCategoryList ({
  $offset,
  $limit
} = {}) {
  return request({
    method: 'GET',
    res: THTX_SERVICE,
    api: 'txuanPinpaiCategory/getTxuanPinpaiCategory',
    query: {
      $offset,
      $limit
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
function sPostPinpaiCategory ({
  categoryName,
  orders
} = {}) {
  return request({
    method: 'POST',
    res: THTX_SERVICE,
    api: 'txuanPinpaiCategory/addTxuanPinpaiCategory',
    body: {
      categoryName,
      orders
    }
  })
}

function sUpdatePinpaiCategory ({
  id,
  categoryName,
  orders
} = {}) {
  return request({
    method: 'POST',
    res: THTX_SERVICE,
    api: 'txuanPinpaiCategory/updateTxuanPinpaiCategory',
    body: {
      id,
      categoryName,
      orders
    }
  })
}

function sDeletePinpaiCategory (id) {
  return request({
    method: 'DELETE',
    res: THTX_SERVICE,
    api: 'txuanPinpaiCategory/deleteTxuanPinpaiCategory',
    // body: {
    //   id
    // }
    query: {
      id
    }
  })
}

export default {
  sFetchPinpaiCategoryList,
  sPostPinpaiCategory,
  sDeletePinpaiCategory,
  sUpdatePinpaiCategory
}
