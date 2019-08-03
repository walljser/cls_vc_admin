import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'

function sFetchAdminAccountList ({
  $offset,
  $limit,
  roleId
}) {
  return request({
    method: 'GET',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'adminAccount/getAdminAccountList',
    query: {
      $offset,
      $limit,
      roleId
    }
  })
}

function sPostAdminAccount ({
  username,
  password,
  isBusiness,
  isLocked,
  pinpaiId
}) {
  return request({
    method: 'POST',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'adminAccount/addAdminAccount',
    body: {
      username,
      password,
      isBusiness,
      isLocked,
      pinpaiId
    }
  })
}

function sUpdateAdminAccount ({
  id,
  password,
  isBusiness,
  isLocked,
  pinpaiId
}) {
  return request({
    method: 'POST',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'adminAccount/updateAdminAccount',
    body: {
      id,
      password,
      isBusiness,
      isLocked,
      pinpaiId
    }
  })
}

function sDeleteAdminAccount (id) {
  return request({
    method: 'DELETE',
    res: {
      ...THTX_SERVICE,
      noAuth: false
    },
    api: 'adminAccount/deleteAdminAccount',
    query: {
      id
    }
  })
}

export default {
  sFetchAdminAccountList,
  sPostAdminAccount,
  sUpdateAdminAccount,
  sDeleteAdminAccount
}
