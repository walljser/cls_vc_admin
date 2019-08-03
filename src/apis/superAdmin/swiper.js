import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'

function sFetchTouxuanSwiperList ({
  $offset,
  $limit
} = {}) {
  return request({
    method: 'GET',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'txuanSwipper/getTxuanSwipper',
    query: {
      $offset,
      $limit
    }
  })
}

function sPostTouxuanSwiper ({
  txuanId,
  orders,
  image
}) {
  return request({
    method: 'POST',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'txuanSwipper/addTxuanSwipper',
    body: {
      txuanId,
      orders,
      image
    }
  })
}

function sDeleteTouxuanSwiper (id) {
  return request({
    method: 'DELETE',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'txuanSwipper/deleteTxuanSwipper',
    query: {
      id
    }
  })
}

function sFetchTouhaoSwiperList ({
  $offset,
  $limit
} = {}) {
  return request({
    method: 'GET',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'thaoSwipper/getThaoSwipper',
    query: {
      $offset,
      $limit
    }
  })
}

function sPostTouhaoSwiper ({
  thaoId,
  orders,
  image
}) {
  return request({
    method: 'POST',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'thaoSwipper/addThaoSwipper',
    body: {
      thaoId,
      orders,
      image
    }
  })
}

function sDeleteTouhaoSwiper (id) {
  return request({
    method: 'DELETE',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'thaoSwipper/deleteThaoSwipper',
    query: {
      id
    }
  })
}

function sFetchTouhaoRenwuSwiperList ({
  $offset,
  $limit
} = {}) {
  return request({
    method: 'GET',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'officerSwipper/getOfficerSwipper',
    query: {
      $offset,
      $limit
    }
  })
}

function sPostTouhaoRenwuSwiper ({
  officerId,
  orders,
  image
}) {
  return request({
    method: 'POST',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'officerSwipper/addOfficerSwipper',
    body: {
      officerId,
      orders,
      image
    }
  })
}

function sDeleteTouhaoRenwuSwiper (id) {
  return request({
    method: 'DELETE',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'officerSwipper/deleteOfficerSwipper',
    query: {
      id
    }
  })
}

function sFetchTouxuanPinpaiSwiperList ({
  $offset,
  $limit
} = {}) {
  return request({
    method: 'GET',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'pinpaiSwipper/getPinpaiSwipper',
    query: {
      $offset,
      $limit
    }
  })
}

function sPostTouxuanPinpaiSwiper ({
  pinpaiId,
  orders,
  image
}) {
  return request({
    method: 'POST',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'pinpaiSwipper/addPinpaiSwipper',
    body: {
      pinpaiId,
      orders,
      image
    }
  })
}

function sDeleteTouxuanPinpaiSwiper (id) {
  return request({
    method: 'DELETE',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'pinpaiSwipper/deletePinpaiSwipper',
    query: {
      id
    }
  })
}

export default {
  sFetchTouxuanSwiperList,
  sPostTouxuanSwiper,
  sDeleteTouxuanSwiper,
  sFetchTouhaoSwiperList,
  sPostTouhaoSwiper,
  sDeleteTouhaoSwiper,
  sFetchTouhaoRenwuSwiperList,
  sPostTouhaoRenwuSwiper,
  sDeleteTouhaoRenwuSwiper,
  sFetchTouxuanPinpaiSwiperList,
  sPostTouxuanPinpaiSwiper,
  sDeleteTouxuanPinpaiSwiper
}
