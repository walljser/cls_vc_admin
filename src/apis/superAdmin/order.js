import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'
// import { fetchAll } from 'utils/assist'

function sFetchOrderList ({
  $offset,
  $limit,
  type,
  goodsName,
  pinpaiId
} = {}) {
  return request({
    method: 'GET',
    res: THTX_SERVICE,
    api: '/orders/queryOrders',
    query: {
      $offset,
      $limit,
      type,
      goodsName,
      pinpaiId
    }
  })
}

function sOrderDeliver ({
  id,
  logistics,
  logisticsComp
} = {}) {
  return request({
    method: 'POST',
    res: THTX_SERVICE,
    api: 'orders/updateOrderLogistics',
    body: {
      ordersId: id,
      logistics,
      logisticsComp
    }
  })
}

// const sFetchAllOrders = fetchAll(sFetchOrderList)

export default {
  sFetchOrderList,
  sOrderDeliver
}
