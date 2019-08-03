<template>
<div>
<el-button v-if="button" :type="btnType" :size="btnSize" 
  @click="handdleOpen" :icon="btnIcon">{{btnName}}</el-button>
<modal :option="option" v-if="autoVisible ? myCVisible : visible" :autoVisible="autoVisible"
      :visible.sync="autoVisible ? myCVisible : visible" @close="closePop" @ok="ok">
  <slot></slot>
</modal>
</div>
</template>


<script>
/**
 * 两种模式：1有button 2无button
 */
import modal from './modal'
export default {
  name: 'btnModal',
  props: {
    button: {
      type: [String, Boolean, Object],
      required: false,
      default: false
    },
    autoVisible: {
      type: Boolean,
      required: false,
      default: true
    },
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    option: {
      type: Object,
      required: false,
      default: {}
    }
  },
  components: { modal },
  data () {
    return {
      myCVisible: false
    }
  },
  methods: {
    handdleOpen () {
      if (this.autoVisible) {
        this.myCVisible = true
      } else {
        this.$emit('open')
      }
    },
    ok () {
      this.$emit('ok', this.closePop)
    },
    closePop (done) {
      if (this.autoVisible) {
        this.myCVisible = false
      } else {
        this.$emit('close')
      }
    }
  },
  computed: {
    btnType () {
      return (this.button && this.button.type) || 'primary'
    },
    btnSize () {
      return (this.button && this.button.size) || 'normal'
    },
    btnIcon () {
      return (this.button && this.button.icon) || null
    },
    btnName () {
      return (this.button && this.button.name) || this.button || ''
    }
  }
}
</script>

<style>
</style>
