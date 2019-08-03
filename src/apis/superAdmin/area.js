import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'

function sFetchAllProvince () {
  return request({
    method: 'GET',
    res: THTX_SERVICE,
    api: 'area/getProvince'
  })
}

function sFetchCityByProvinceId (id) {
  let query
  if (id) {
    query = {
      provinceId: id
    }
  } else {
    query = {
      provinceId: -1
    }
  }
  return request({
    method: 'GET',
    res: THTX_SERVICE,
    api: 'area/getCitys',
    query
  })
}

export default {
  sFetchAllProvince,
  sFetchCityByProvinceId
}
