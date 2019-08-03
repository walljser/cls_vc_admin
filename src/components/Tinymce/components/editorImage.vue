<template>
  <div class="upload-container">
    <el-dialog append-to-body title="图片上传" :visible.sync="dialogVisible" :before-close="closeDialog" v-if="dialogVisible">
      <upload v-model="dentry" :limit="3" :preview="false" :session="session" :formData="formData" 
        :onStart="handleStart" :onError="handleError" :onSuccess="handleSuccess" description="上传图片请不要超过500kb" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import upload from 'components/upload'
import { CS_RES } from 'utils/config'

export default {
  name: 'editorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    },
    session: {
      type: String,
      default: ''
    },
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dentry: '',
      uploading: false
    }
  },
  methods: {
    closeDialog () {
      console.log('closeDialog', this.session, this.formData)
      this.$emit('close')
    },
    checkAllSuccess () {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit () {
      const dentry = this.dentry
      if (dentry && !this.uploading) {
        const arr = dentry.split(',').map(item => this.getImageUrl(item))
        // console.log('上传图片', arr)
        this.$emit('successCBK', arr)
        this.$emit('close')
        this.dentry = ''
      }
    },
    getImageUrl (dentry) {
      return `${CS_RES.protocol}${CS_RES.host}/${CS_RES.ver}/download?dentryId=${dentry}`
    },
    handleStart () {
      this.uploading = true
    },
    handleError () {
      this.uploading = false
    },
    handleSuccess () {
      this.uploading = false
    }
  },
  components: {
    upload
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container {
  .editor-slide-upload {
    margin-bottom: 20px;
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>
