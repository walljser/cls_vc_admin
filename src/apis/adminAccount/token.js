import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'

function sFetchAdminToken ({
  username,
  password
} = {}) {
  return request({
    method: 'POST',
    res: {
      ...THTX_SERVICE,
      noAuth: true
    },
    api: '/adminAccount/token',
    body: {
      username,
      password
    }
  })
}

export default {
  sFetchAdminToken
}
