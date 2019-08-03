import platoRequest from './plato-request'
// import auth from './auth'
import CONFIG from 'utils/config'
import { TOKENS } from 'utils/constants'
import helpers from 'utils/helpers'
import { Message as message } from 'element-ui'
import qs from 'querystring'

const isLessThenIE10 = helpers.isLessThenIE10()

const LOC_RES = CONFIG.LOC_RES

// 替换url
function replaceUrlWithParams (url, params) {
  // from: https://github.com/Matt-Esch/string-template
  return url.replace(/\{(\w+)\}/g, function (match, key, index) {
    let result

    // {{x}} -> {x}
    if (url.charAt(index - 1) === '{' &&
      url.charAt(index + match.length) === '}') {
      return key
    } else {
      // {x} -> *
      result = params.hasOwnProperty(key) ? params[key] : null
      if (result === null || result === undefined) {
        return ''
      }

      return result
    }
  })
}

// 获取完整的URL
function getFullUrl (options) {
  const { api, params } = options
  const _api = params ? replaceUrlWithParams(api, params) : api

  let queryParam = ''
  queryParam += ((_api.indexOf('?') !== -1) ? '&' : '?') + qs.stringify(options.query).replace(/'/g, '%27')
  console.log('------------')
  console.log(queryParam)
  return _api + queryParam
}

// IE10以下就下转发
function dispatcherRequest (options) {
  const { headers, res } = options
  const newHeaders = {}
  if (headers !== 'undefined') {
    for (const key in headers) {
      if (headers.hasOwnProperty(key)) {
        newHeaders[key] = [headers[key]]
      }
    }
  }
  const fullUrl = getFullUrl(options)
  const body = {
    request_url: res.protocol + res.host + '/' + res.ver + fullUrl,
    request_method: options.method,
    request_headers: newHeaders,
    request_data: {
      data: options.body
    }
  }
  const newOptions = {
    url: `${LOC_RES.protocol}${LOC_RES.host}/${LOC_RES.ver}/dispatcher`, // 上线后地址
    method: 'POST',
    body
  }
  return platoRequest(newOptions)
}

export default function request (options, token) {
  const { res, api, errorMessage } = options
  const headers = Object.assign({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }, res.headers)
  if (!token) {
    token = CONFIG.SessionStorage.get(TOKENS)
  }
  // if (!options.query && method !== 'POST') {
  //   options.query = {}
  // }
  if (options.query) {
    for (const key of Object.keys(options.query)) {
      if (typeof (options.query[key]) === 'undefined') {
        delete options.query[key]
      }
    }
  }
  // options.query.time = new Date().getTime()

  if (!res.noAuth) {
    headers['authorization'] = token.times + '_' + token.token
  }
  // if (auth.hasAuthorization(token)) {
  //   const fullUrl = getFullUrl(options)
  //   if (!res.noAuth) {
  //     headers['Authorization'] = auth.getAuthorization(method, '/' + res.ver + fullUrl, res.host)
  //     if (options.BizServiceName) {
  //       headers['Biz-Service-Name'] = options.BizServiceName
  //     }
  //   }
  // }
  const url = res.protocol + res.host + '/' + res.ver + api
  const newOptions = { ...options, headers, url }
  const req = isLessThenIE10 ? dispatcherRequest(newOptions) : platoRequest(newOptions)
  return req.then(res => {
    if (options.tag && res) {
      res.__tag__ = options.tag
    }
    return res.content
  }).catch(error => {
    console.log(error)
    if (error && error.code === -100 && error.message === '权限不足!') {
      console.log('herere')
      CONFIG.SessionStorage.remove(TOKENS)
      message({
        type: 'error',
        message: '权限不足或登录已失效，请重新登录！'
      })
    } else if (error && error.message) {
      const errorMsg = errorMessage && typeof errorMessage === 'function' ? errorMessage(error) : error.message
      errorMsg && message({
        type: 'error',
        message: errorMsg
      })
    }
    return Promise.reject(error)
  })
}
