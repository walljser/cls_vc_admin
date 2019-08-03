import { THTX_SERVICE } from 'utils/config'
import request from 'request/index'

function sFetchBrandOfficerList ({
  $offset,
  $limit
} = {}) {
  return request({
    method: 'GET',
    res: THTX_SERVICE,
    api: 'brandOfficer/getAllBrandOfficer',
    query: {
      $offset,
      $limit
    }
  })
}

function sDeleteBrandOfficer (id) {
  return request({
    method: 'DELETE',
    res: THTX_SERVICE,
    api: 'brandOfficer/deleteBrandOfficer',
    query: {
      id
    }
  })
}

/**
 * 品牌官分类添加
 *
 * @param {any} [{
 *   categoryName,
 *   orders
 * }={}]
 * @returns
 */
function sPostBrandOfficer ({
  name,
  description,
  age,
	belief,
  categoryId,
  provinceId,
	cityId,
	constellation,
  education,
  titles,
  image,
  thumb,
  original
}) {
  return request({
    method: 'POST',
    res: THTX_SERVICE,
    api: 'brandOfficer/addBrandOfficer',
    body: {
      name,
      description,
      age,
      belief,
      categoryId,
      provinceId,
      cityId,
      constellation,
      education,
      titles,
      image,
      thumb,
      original
    }
  })
}

function sUpdateBrandOfficer (id, {
  name,
  description,
  age,
	belief,
  categoryId,
  provinceId,
	cityId,
	constellation,
  education,
  titles,
  image,
  thumb,
  original
}) {
  return request({
    method: 'POST',
    res: THTX_SERVICE,
    api: 'brandOfficer/updateBrandOfficer',
    body: {
      id,
      name,
      description,
      age,
      belief,
      categoryId,
      provinceId,
      cityId,
      constellation,
      education,
      titles,
      image,
      thumb,
      original
    }
  })
}

export default {
  sUpdateBrandOfficer,
  sFetchBrandOfficerList,
  sPostBrandOfficer,
  sDeleteBrandOfficer
}
