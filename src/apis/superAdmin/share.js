import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'

function sFetchShareList ({
  $offset,
  $limit
} = {}) {
  return request({
    method: 'GET',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'shareInfo/getAllShareInfo',
    query: {
      $offset,
      $limit
    }
  })
}

function sDeleteShare (id) {
  return request({
    method: 'DELETE',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'shareInfo/deleteShareInfo',
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
function sPostShare ({
  qrcodeHeight,
	qrcodePosLeft,
	qrcodePosTop,
	qrcodeWidth,
	shareImage
}) {
  return request({
    method: 'POST',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'shareInfo/addShareInfo',
    body: {
      qrcodeHeight,
      qrcodePosLeft,
      qrcodePosTop,
      qrcodeWidth,
      shareImage
    }
  })
}

function sUpdateShare (id, {
  qrcodeHeight,
	qrcodePosLeft,
	qrcodePosTop,
	qrcodeWidth,
	shareImage
}) {
  return request({
    method: 'POST',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'shareInfo/updateShareInfo',
    body: {
      id,
      qrcodeHeight,
      qrcodePosLeft,
      qrcodePosTop,
      qrcodeWidth,
      shareImage
    }
  })
}

export default {
  sFetchShareList,
  sDeleteShare,
  sPostShare,
  sUpdateShare
}
