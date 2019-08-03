<template>
  <div class="app-container">
    <el-upload :class="{'hiddenIcon': fileList && fileList.length >= limit}"
      :disabled="disabled"
      :action="uploadUrl" :limit="limit" :accept="accept"
      :list-type="isFile ? 'text' : 'picture-card'"
      :on-preview="isFile ? handleFileClick : (preview ? handlePictureCardPreview : null)"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-change="handleChange"
      :on-progress="handleProgress"
      :before-upload="handleBeforeUpload"
      :http-request="uploadRequest"
      :file-list="fileList">
      <i class="el-icon-plus" v-if="!isFile"></i>
      <el-button size="small" type="primary" v-if="isFile" :disabled="fileList && fileList.length >= limit">点击上传</el-button>
      <div v-if="description" slot="tip" class="el-upload__tip">{{description}}</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" class="img-dialog" append-to-body>
      <img v-if="!isFile" width="100%" :src="previewUrl" alt="">
      <video v-if="dialogVisible && isFile" :src="previewUrl" controls="controls" class="preview-video" height="100%" width="100%">
        您的浏览器不支持 video 标签
      </video>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 一期功能【已经开发】：接入cs、上传、删除、模态框显示、限制大小、限制数量、分块上传
 * 二期功能【未开发】：非图片文件上传、多文件上传、文件名称优化（回填）
 *----------------------------------------------------------------------------
 * 2018/05/09
 * 二期功能【已经开发】：非图片文件上传、文件名称优化（回填)
 * 二期功能【未开发】：多文件上传
 */

import { UPLOAD_PATH, CS_SCOPE, DENTRY_PATH } from 'utils/constants'
// import { sGetDentry, getDownloadUrl } from 'apis/cs'
import uploadRequest from './request'
import _ from 'lodash'
const defaultMaxSize = 2000 * 1024
const IMAGE = 'image'
const FILE = 'file'

export default {
  props: {
    type: {
      type: String,
      required: false,
      default: () => {
        return IMAGE
      }
    },
    formData: {
      type: Object,
      required: false,
      default: () => {
        return {
          scope: CS_SCOPE,
          path: UPLOAD_PATH
        }
      }
    },
    limit: {
      type: Number,
      required: false,
      default: () => {
        return 1
      }
    },
    accept: {
      type: String,
      required: false,
      default: () => {
        return 'image/*'
      }
    },
    value: {
      type: String,
      required: true,
      default: () => {
        return ''
      }
    },
    onBeforeUpload: {
      type: Function,
      required: false,
      default: () => {
        return () => true
      }
    },
    onProgress: {
      type: Function,
      required: false,
      default: () => {
        return () => true
      }
    },
    onStart: {
      type: Function,
      required: false,
      default: () => {
        return () => true
      }
    },
    onSuccess: {
      type: Function,
      required: false,
      default: () => {
        return () => true
      }
    },
    onError: {
      type: Function,
      required: false,
      default: () => {
        return () => true
      }
    },
    description: {
      type: String,
      required: false,
      default: () => {
        return '上传图片请不要超过2MB'
      }
    },
    maxSize: {
      type: Number,
      required: false,
      default: () => {
        return defaultMaxSize
      }
    },
    preview: {
      type: Boolean,
      required: false,
      default: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      uploadFormData: {},
      previewUrl: '',
      dialogVisible: false,
      fileList: []
    }
  },
  methods: {
    uploadRequest (option) {
      option.data = this.uploadFormData
      this.onStart(option)
      return uploadRequest(option)
    },
    handleBeforeUpload (file) {
      if (file.type !== undefined) {
        const type = file.type
        if (type === '') {
          this.$message.error('请检查文件格式')
          return false
        }
        const acceptArray = this.accept.split(',')
        let find = false
        acceptArray && acceptArray.length && acceptArray.forEach(item => {
          const regxp = new RegExp(_.trim(item))
          if (!find && regxp.test(type)) {
            find = true
          }
        })
        if (!find) {
          this.$message.error('请检查文件格式')
          return false
        }
      }
      if (file.size && file.size > this.maxSize) {
        this.$message.error('请检查文件大小')
        return false
      }
      this.uploadFormData = Object.assign({ name: file.name }, {
        UPLOAD_PATH,
        CS_SCOPE
      })
      return this.onBeforeUpload(file)
    },
    handleChange (file, fileList) {
    },
    getDentryIdArray (fileList) {
      return fileList.map(item => {
        if (item.dentryId) { // 回填的
          return item.dentryId
        }
        if (item.response && item.response.content && item.response.content.dentry) { // 新上传的
          return item.response.content.dentry
        }
        // 基本不可能进入此逻辑
        return ''
      }).join(',')
    },
    handleSuccess (response, file, fileList) {
      const returnFileList = this.getDentryIdArray(fileList)
      this.$emit('input', returnFileList)
      this.onSuccess(response, file, fileList)
    },
    handleError (err, file, fileList) {
      this.onError(err, file, fileList)
    },
    handleRemove (file, fileList) {
      const returnFileList = this.getDentryIdArray(fileList)
      this.$emit('input', returnFileList)
    },
    handlePictureCardPreview (file) {
      if (!this.preview) {
        return
      }
      this.previewUrl = file.url
      this.dialogVisible = true
    },
    handleFileClick (file) {
      if (this.preview) { // 仅支持视频预览
        this.previewUrl = file.url
        this.dialogVisible = true
      } else {
        window.open(file.url)
      }
    },
    handleProgress (event, file, fileList) {
      this.onProgress(event, file, fileList)
    }
  },
  computed: {
    uploadUrl () {
      // return getUploadUrl(this.session)
      return UPLOAD_PATH
    },
    isFile () {
      return this.type === FILE
    }
  },
  mounted () {
    if (!this.value) {
      this.fileList = []
    } else {
      const dentryIdArray = this.value.split(',')
      this.fileList = dentryIdArray.map(item => {
        return {
          name: '',
          dentryId: item,
          url: `${DENTRY_PATH}/${item}`
          // url: getDownloadUrl(item, {
          //   attachment: this.isFile
          // })
        }
      })
      this.fileList.forEach(item => {
        // return item
        return DENTRY_PATH + '/' + item.dentryId
        // sGetDentry(item.dentryId).then(res => {
        //   item.name = res.name
        // })
      })
    }
  },
  watch: {
    value (val) {
      if (!val) {
        this.fileList = []
      } else {
        const dentryIdArray = val.split(',')
        this.fileList = dentryIdArray.map(item => {
          return {
            name: '',
            dentryId: item,
            // url: getDownloadUrl(item, {
            //   attachment: this.isFile
            // })
            url: `${DENTRY_PATH}/${item}`
          }
        })
        this.fileList.forEach(item => {
          // sGetDentry(item.dentryId).then(res => {
          //   item.name = res.name
          // })
          return DENTRY_PATH + '/' + item.dentryId
        })
      }
    }
  },
  filters: {
  },
  components: {
  }
}
</script>

<style>
.hiddenIcon .el-upload--picture-card {
  display: none!important;
}
.img-dialog {
  text-align: center;
}
.img-dialog img{
  max-height: 500px;
  width: auto;
  max-width: 100%;
}
.preview-video {
  max-width: 600px;
}
</style>
