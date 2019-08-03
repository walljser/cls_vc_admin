import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'
import { fetchAll } from 'utils/assist'

function sFetchGoodList ({
  $offset,
  $limit,
  isOnsale,
  isPrivilege,
  maxPrice,
  minPrice,
  pinpaiId,
  title
} = {}) {
  return request({
    method: 'GET',
    res: THTX_SERVICE,
    api: 'goods/queryGoods',
    query: {
      $offset,
      $limit,
      isOnsale,
      isPrivilege,
      maxPrice,
      minPrice,
      title,
      pinpaiId
    }
  })
}

/**
 * 添加商品
 *
 * @param {any} [{
 *   categoryName,
 *   orders
 * }={}]
 * @returns
 */
function sPostGood ({
  descs,
  image,
  isOnsale,
  isPrivilege,
  price,
  stock,
  pinpaiId,
  title
} = {}) {
  return request({
    method: 'POST',
    res: THTX_SERVICE,
    api: 'goods/addGoods',
    body: {
      descs,
      image,
      isOnsale,
      isPrivilege,
      price,
      stock,
      title,
      pinpaiId
    }
  })
}

function sUpdateGood ({
  id,
  descs,
  image,
  isOnsale,
  isPrivilege,
  price,
  stock,
  pinpaiId,
  title
} = {}) {
  return request({
    method: 'POST',
    res: THTX_SERVICE,
    api: '/goods/updateGoods',
    body: {
      id,
      descs,
      image,
      isOnsale,
      isPrivilege,
      price,
      stock,
      title,
      pinpaiId
    }
  })
}

// function sDeleteGood (id) {
//   return request({
//     method: 'DE'
//     method: '',
//     query: {
//       id
//     }
//   })
// }

const sFetchAllGoods = fetchAll(sFetchGoodList)

export default {
  sFetchGoodList,
  sPostGood,
  sFetchAllGoods,
  sUpdateGood
}
