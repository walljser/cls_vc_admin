import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'

function sFetchTouxuanList ({
  $offset,
  $limit,
  officerId,
  pinpaiId,
  title
} = {}) {
  return request({
    method: 'GET',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'txuan/getAllTxuan',
    query: {
      $offset,
      $limit,
      officerId,
      pinpaiId,
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
function sPostTouxuan ({
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
    api: 'txuan/addTxuan',
    body: {
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

function sUpdateTouxuan ({
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
    api: 'txuan/updateTxuan',
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

function sDeleteTouxuan (id) {
  return request({
    method: 'DELETE',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'txuan/deleteTxuan',
    query: {
      id
    }
  })
}

function sFetchTouxuanGoodList ({
  $offset,
  $limit,
  touxuanId
}) {
  return request({
    method: 'GET',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'txuan/getTxuanGoodsById',
    query: {
      id: touxuanId,
      $offset,
      $limit
    }
  })
}

function sPostTouxuanGood ({
  id,
  goodsIds
}) {
  return request({
    method: 'POST',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'txuan/txuanAddGoods',
    body: {
      id,
      goodsIds
    }
  })
}

function sDeleteTouxuanGood ({
  goods_id,
  txuan_id
}) {
  return request({
    method: 'DELETE',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'txuan/deleteTxuanGoods',
    query: {
      goods_id,
      txuan_id
    }
  })
}

export default {
  sFetchTouxuanList,
  sFetchTouxuanGoodList,
  sPostTouxuan,
  sPostTouxuanGood,
  sDeleteTouxuanGood,
  sUpdateTouxuan,
  sDeleteTouxuan
}
