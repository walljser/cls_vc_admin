import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'

function sFetchSystemConfigList ({
  $offset,
  $limit
} = {}) {
  return request({
    method: 'GET',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: '/constants/getConstants',
    query: {
      $offset,
      $limit
    }
  })
}

function sUpdateSystemConfig ({
  name,
  value
} = {}) {
  return request({
    method: 'POST',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: '/constants/updateConstants',
    body: {
      name,
      value
    }
  })
}

export default {
  sFetchSystemConfigList,
  sUpdateSystemConfig
}
