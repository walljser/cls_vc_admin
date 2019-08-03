import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'

function sDentryUpload (file) {
  return request({
    method: 'POST',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'dentry/upload',
    data: {
      file
    }
  })
}

export default {
  sDentryUpload
}
