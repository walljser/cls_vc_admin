import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'
// import { fetchAll } from 'utils/assist'

function sFetchTixianList ({
  $offset,
  $limit,
  status
} = {}) {
  return request({
    method: 'GET',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'withdraw/getWithDrawList',
    query: {
      $offset,
      $limit,
      status
    }
  })
}

function sTixianVerify ({
  id,
  isPass,
  reason
} = {}) {
  return request({
    method: 'POST',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'withdraw/verifyWithDraw',
    body: {
      withdrawId: id,
      isPass,
      reason
    }
  })
}

// const sFetchAllTixians = fetchAll(sFetchTixianList)

export default {
  sFetchTixianList,
  sTixianVerify
}
