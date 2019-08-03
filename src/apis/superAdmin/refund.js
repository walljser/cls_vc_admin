import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'

function sFetchRefundList ({
  $offset,
  $limit,
  pinpaiId,
  status
} = {}) {
  return request({
    method: 'GET',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'refundVerify/getRefundVerifyList',
    query: {
      $offset,
      $limit,
      pinpaiId,
      status
    }
  })
}

function sRefundVerify ({
  id,
  reason,
  status
} = {}) {
  return request({
    method: 'POST',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'pay/refundVerify',
    body: {
      id,
      reason,
      status: status === true ? 1 : 2
    }
  })
}

export default {
  sFetchRefundList,
  sRefundVerify
}
