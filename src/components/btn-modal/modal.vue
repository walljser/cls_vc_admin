<template>

<el-dialog :before-close="closePop"
  :close-on-click-modal="false"
  :width="option.width || ''"
  :title="option.title || ''"
  :visible.sync="visible"
  :fullscreen="option.fullscreen || false"
  append-to-body>
  <slot></slot>
  <div slot="footer" class="dialog-footer" v-if="autoVisible">
    <el-button type="primary" @click="ok()">确认</el-button>
    <el-button type="danger" @click="closePop()">取消</el-button>
  </div>
</el-dialog>
</template>

<script>
export default {
  name: 'btnModal',
  props: {
    button: {
      type: [String, Boolean, Object],
      required: false,
      default: false
    },
    option: {
      type: Object,
      required: false,
      default: {}
    },
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    autoVisible: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    ok () {
      this.$emit('ok')
    },
    closePop (done) {
      this.$emit('close')
    }
  }
}
</script>

<style>
</style>
