<template>
  <div class="upload-container">
    <el-dialog append-to-body title="插入视频" :visible.sync="dialogVisible" :before-close="closeDialog" v-if="dialogVisible">
      <el-input placeholder="请输入视频地址" v-model="videoUrl"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// todo: 校验视频地址格式
export default {
  name: 'editorVideo',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      videoUrl: ''
    }
  },
  methods: {
    closeDialog () {
      console.log('closeDialog', this.session, this.formData)
      this.$emit('close')
    },
    handleSubmit () {
      if (this.checkVideo(this.videoUrl)) {
        this.$emit('insert', this.videoUrl)
        this.$emit('close')
        this.videoUrl = ''
      } else {
        this.$message.error('请填写正确的视频地址, 支持mp4与flv格式')
      }
    },
    checkVideo (val) {
      return val && /.(mp4|flv)$/.test(val)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
