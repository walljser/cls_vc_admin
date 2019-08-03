import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'
import { fetchAll } from 'utils/assist'

function sFetchPinpaiList ({
  $offset,
  $limit,
  categoryId,
  cityId
} = {}) {
  return request({
    method: 'GET',
    res: THTX_SERVICE,
    api: 'txuanPinpai/getAllTxuanPinpai',
    query: {
      $offset,
      $limit,
      categoryId,
      cityId
    }
  })
}

function sPostPinpai ({
  name,
  cityId,
  provinceId,
  categoryId,
  image,
  thumb
} = {}) {
  return request({
    method: 'POST',
    res: THTX_SERVICE,
    api: 'txuanPinpai/addTxuanPinpai',
    body: {
      name,
      cityId,
      categoryId,
      provinceId,
      image,
      thumb
    }
  })
}

function sUpdatePinpai ({
  id,
  name,
  cityId,
  provinceId,
  categoryId,
  image,
  thumb,
  officerId
} = {}) {
  return request({
    method: 'POST',
    res: THTX_SERVICE,
    api: 'txuanPinpai/updateTxuanPinpai',
    body: {
      id,
      name,
      cityId,
      categoryId,
      provinceId,
      image,
      thumb,
      officerId
    }
  })
}

function sDeletePinpai (id) {
  return request({
    method: 'DELETE',
    res: THTX_SERVICE,
    api: 'txuanPinpai/deleteTxuanPinpai',
    query: {
      id
    }
  })
}

const sFetchAllPinpai = fetchAll(sFetchPinpaiList)

export default {
  sFetchPinpaiList,
  sFetchAllPinpai,
  sPostPinpai,
  sUpdatePinpai,
  sDeletePinpai
}
