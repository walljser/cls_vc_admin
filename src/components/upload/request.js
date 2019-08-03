/**
 * 在 rc-upload/request.js 的基础上，增加了分片上传的功能
 */

function noop () {}

function getError (option, xhr) {
  var msg = 'cannot post ' + option.action + ' ' + xhr.status + '\''
  var err = new Error(msg)
  err.status = xhr.status
  err.method = 'post'
  err.url = option.action
  return err
}

function getBody (xhr) {
  var text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

/**
 * Formalize file.slice
 */
function slice (file, start, end) {
  const slice = file.mozSlice
    ? file.mozSlice : file.webkitSlice
      ? file.webkitSlice : file.slice
        ? file.slice : noop
  return slice.bind(file)(start, end)
}

const CHUNK_SIZE = 5 * 1024 * 1024
const MAX_CONCURRENCE = 5 // 最多同时5个请求，留一个给其他请求

// 分片上传
function multipChunkUpload (option) {
  const { file } = option
  let start = 0
  const chunks = []
  while (start < file.size) {
    let end = start + CHUNK_SIZE
    if (end > file.size) {
      end = file.size
    }
    chunks.push(slice(file, start, end))
    start = end
  }

  const chunksCount = chunks.length
  const loadStatus = [] // 存储状态
  let totalLoaded = 0
  let chunkIndex = 0 // chunk 游标
  const event = {}

  function onProgress (e, i) {
    loadStatus[i] = e.loaded
    totalLoaded = loadStatus.reduce((acc, cur) => acc + cur, 0)
    event.loaded = totalLoaded
    event.percent = totalLoaded / file.size * 100
    // 外部只关心 percent, 原生的 event 这里被换成普通对象
    option.onProgress(event)
  }

  function onSuccess (body, xhr, i) {
    // 完成一个 chunk
    queue.splice(i, 1)
    const nextChunk = chunks.shift()
    if (nextChunk) { // 上传下一个 chunk
      queue.push(uploadChunk(nextChunk, chunkIndex))
      chunkIndex += 1
    }

    // 最后一个 chunk 返回值中有 dentry_id
    if (body.dentry_id) {
      option.onSuccess(body, xhr)
    }
  }

  function onError (e, i) {
    option.onError(e)
  }

  function uploadChunk (chunk, i) {
    return upload({
      ...option,
      file: chunk,
      data: {
        ...option.data,
        chunks: chunksCount,
        chunkSize: chunk.size,
        chunk: i,
        size: file.size
      },
      onProgress: option.onProgress
        ? e => onProgress(e, i)
        : undefined,
      onError: e => onError(e, i),
      onSuccess: (body, xhr) => onSuccess(body, xhr, i)
    })
  }

  const queue = [] // 请求队列
  while (chunkIndex < MAX_CONCURRENCE) {
    const chunk = chunks.shift()
    if (chunk) {
      queue.push(uploadChunk(chunk, chunkIndex))
      chunkIndex++
    } else {
      break
    }
  }

  return {
    abort: function abort () {
      queue.forEach(req => {
        req.abort()
      })
    }
  }
}

// option {
//  onProgress: (event: { percent: number }): void,
//  onError: (event: Error, body?: Object): void,
//  onSuccess: (body: Object): void,
//  data: Object,
//  filename: String,
//  file: File,
//  withCredentials: Boolean,
//  action: String,
//  headers: Object,
// }
export default function upload (option) {
  if (option.file.size > CHUNK_SIZE) {
    return multipChunkUpload(option)
  }

  var xhr = new XMLHttpRequest()

  if (option.onProgress && xhr.upload) {
    xhr.upload.onprogress = function progress (e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100
      }
      option.onProgress(e)
    }
  }

  var formData = new FormData()

  if (option.data) {
    Object.keys(option.data).map(function (key) {
      formData.append(key, option.data[key])
    })
  }

  formData.append(option.filename, option.file)

  xhr.onerror = function error (e) {
    option.onError(e)
  }

  xhr.onload = function onload () {
    // allow success when 2xx status
    // see https://github.com/react-component/upload/issues/34
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(option, xhr), getBody(xhr))
    }

    option.onSuccess(getBody(xhr), xhr)
  }

  xhr.open('post', option.action, true)

  // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true
  }

  var headers = option.headers || {}

  // when set headers['X-Requested-With'] = null , can close default XHR header
  // see https://github.com/react-component/upload/issues/33
  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  }

  for (var h in headers) {
    if (headers.hasOwnProperty(h) && headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h])
    }
  }
  xhr.send(formData)

  return {
    abort: function abort () {
      xhr.abort()
    }
  }
}
