import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'

function sFetchAdvList ({
  $offset,
  $limit
} = {}) {
  return request({
    method: 'GET',
    res: THTX_SERVICE,
    api: 'ad/getAds',
    query: {
      $offset,
      $limit
    }
  })
}

function sUpdateAdv ({
  id,
  image,
  param,
  status
} = {}) {
  return request({
    method: 'POST',
    res: THTX_SERVICE,
    api: 'ad/updateAd',
    body: {
      id,
      image,
      param,
      status: status === true ? 1 : 0
    }
  })
}

export default {
  sFetchAdvList,
  sUpdateAdv
}
