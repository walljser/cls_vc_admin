import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'

function sFetchBrandOfficerCategoryList ({
  $offset,
  $limit
} = {}) {
  return request({
    method: 'GET',
    res: THTX_SERVICE,
    api: 'brandOfficerCategory/getBrandOfficerCategory',
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
function sPostBrandOfficerCategoryList ({
  categoryName,
  orders
} = {}) {
  return request({
    method: 'POST',
    res: THTX_SERVICE,
    api: 'brandOfficerCategory/addBrandOfficerCategory',
    body: {
      categoryName,
      orders: orders || 0
    }
  })
}

function sUpdateBrandOfficerCategoryList ({
  id,
  categoryName,
  orders
} = {}) {
  return request({
    method: 'POST',
    res: THTX_SERVICE,
    api: 'brandOfficerCategory/updateBrandOfficerCategory',
    body: {
      id,
      categoryName,
      orders
    }
  })
}

function sDeleteBrandOfficerCategory (id) {
  return request({
    method: 'DELETE',
    res: THTX_SERVICE,
    api: 'brandOfficerCategory/deleteBrandOfficerCategory',
    query: {
      id
    }
  })
}

export default {
  sFetchBrandOfficerCategoryList,
  sPostBrandOfficerCategoryList,
  sDeleteBrandOfficerCategory,
  sUpdateBrandOfficerCategoryList
}
