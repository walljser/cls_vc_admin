import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'

function sFetchTouhaoList ({
  $offset,
  $limit,
  officerId,
  title
} = {}) {
  return request({
    method: 'GET',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'thao/getAllThaoByOfficer',
    query: {
      $offset,
      $limit,
      officerId,
      title
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
function sPostTouhao ({
  title,
  descs,
  content,
  image,
  thumb,
  officerId,
  // pinpaiId,
  orders
} = {}) {
  return request({
    method: 'POST',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'thao/addThao',
    body: {
      title,
      descs,
      content,
      image,
      thumb,
      officerId,
      // pinpaiId,
      orders
    }
  })
}

function sUpdateTouhao ({
  id,
  title,
  descs,
  content,
  image,
  thumb,
  officerId,
  pinpaiId,
  orders
} = {}) {
  return request({
    method: 'POST',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'thao/updateThao',
    body: {
      id,
      title,
      descs,
      content,
      image,
      thumb,
      officerId,
      pinpaiId,
      orders
    }
  })
}

function sDeleteTouhao (id) {
  return request({
    method: 'DELETE',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'thao/deleteThao',
    query: {
      id
    }
  })
}

export default {
  sFetchTouhaoList,
  sPostTouhao,
  sUpdateTouhao,
  sDeleteTouhao
}
