<template>
  <div class="editor-container">
    <textarea class="ckeditor" :id="ckeditorId"></textarea>
    <editorImage color="#1890ff"
        :dialogVisible="dialogVisible" :session="session" :formData="formData"
        @close="closeDialog" @successCBK="imageSuccessCBK"></editorImage>
    <editorVideo color="#1890ff"
        :dialogVisible="videoDialogVisible" @close="closeVideoDialog" @insert="videoInsert"></editorVideo>
  </div>
</template>

<script>
import editorImage from './components/editorImage'
import editorVideo from './components/editorVideo'
import plugins from './plugins'

const defaultEditorConfig = _this => {
  const myConfig = {
    allowedContent: true,
    handleSelectImage: () => {
      _this.dialogVisible = true
    },
    handleSelectVideo: () => {
      _this.videoDialogVisible = true
    },
    toolbar: [
      // { name: 'source', items: ['Source'] },
      { name: 'clipboard', items: ['Undo', 'Redo', 'Cut', 'Copy'] },
      { name: 'styles', items: ['Font', 'Format', 'FontSize', 'lineheight'] },
      { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
      { name: 'colors', items: ['TextColor', 'BGColor'] },
      { name: 'align', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
      { name: 'links', items: ['Link', 'Unlink'] },
      { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Blockquote'] },
      // { name: 'insert', items: ['Image'] },
      { name: 'insert', items: ['nd-image', 'nd-video'] },
      { name: 'tools', items: ['Maximize'] }
    ],
    extraPlugins: 'nd-image,nd-video,lineheight',
    removePlugins: 'save,about,div,newpage,bidi,flash,maximize,smiley',
    line_height: '25px;30px;35px;40px;45px;50px;80px;100px'
    // removeButtons: 'Image'
  }
  if (_this.toolbar && _this.toolbar.length) {
    _this.toolbar.forEach(tool => {
      myConfig.toolbar.forEach(dtool => {
        if (dtool.name === tool.name && tool.items) {
          dtool.items = tool.items
        }
      })
    })
  }
  return myConfig
}
var plugin_initialized = false
export default {
  name: 'ckeditor',
  components: { editorImage, editorVideo },
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default () {
        return []
      }
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
    }
  },
  data () {
    return {
      plugin_initialized: false,
      editorInstance: null,

      dialogVisible: false,
      videoDialogVisible: false,
      hasChange: false,
      hasInit: false,
      ckeditorId: this.id || 'vue-ckeditor-' + +new Date()
    }
  },
  watch: {
    value (val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => {
          this.editorInstance.setData(val)
        })
      }
    }
  },
  mounted () {
    this.initCkeditor()
  },
  activated () {
    this.initCkeditor()
  },
  deactivated () {
    this.destroyCkeditor()
  },
  methods: {
    closeDialog () {
      this.dialogVisible = false
    },
    closeVideoDialog () {
      this.videoDialogVisible = false
    },
    initCkeditor () {
      if (this.hasInit) {
        return
      }
      this.initPlugins()

      this.editorInstance = window.CKEDITOR.replace(this.ckeditorId, defaultEditorConfig(this))
      this.editorInstance.on('instanceReady', () => {
        if (this.value) {
          this.editorInstance.setData(this.value)
        }
        this.hasInit = true
      })
      // 不能使用 change 事件，因为会导致光标跳动
      this.editorInstance.on('change', () => {
        // call callback if present
        const content = this.editorInstance.getData()
        this.hasChange = true
        this.$emit('input', content)
      })
    },

    initPlugins () {
      if (!plugin_initialized) {
        plugins.forEach(({ name, plugin }) => {
          window.CKEDITOR.plugins.add(name, plugin)
        })
        plugin_initialized = true
      }
    },

    destroyCkeditor () {
      if (this.editorInstance) {
        // console.log('注销...')
        this.editorInstance.destroy()
      }
    },
    imageSuccessCBK (arr) {
      // const _this = this
      const editor = this.editorInstance
      arr.forEach(url => {
        editor.insertHtml(`<img src="${url}"/>`)
      })
    },
    videoInsert (url) {
      // const _this = this
      const editor = this.editorInstance
      editor.insertHtml(`<video src="${url}" controls="controls"></video>`)
    }
  },
  destroyed () {
    this.destroyCkeditor()
  }
}
</script>

<style scoped>
</style>
