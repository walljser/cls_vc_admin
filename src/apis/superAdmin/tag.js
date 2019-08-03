import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'

function sPostTag ({
  name,
  officerId,
  pinpaiId,
  thaoId,
  txuanId
}) {
  return request({
    method: 'POST',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'tags/addTags',
    body: {
      name,
      officerId,
      pinpaiId,
      thaoId,
      txuanId
    }
  })
}

function sFetchTagList ({
  $offset,
  $limit,
  name,
  officerId,
  pinpaiId,
  thaoId,
  txuanId
}) {
  return request({
    method: 'GET',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'tags/getAllTags',
    query: {
      $offset,
      $limit,
      name,
      officerId,
      pinpaiId,
      thaoId,
      txuanId
    }
  })
}

function sDeleteTag (id) {
  return request({
    method: 'DELETE',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'tags/deleteTags',
    query: {
      id
    }
  })
}

export default {
  sPostTag,
  sFetchTagList,
  sDeleteTag
}
