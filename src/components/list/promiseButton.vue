<template>
  <el-button
    @click="onClick"
    :type="type"
    :title="title"
    :icon="icon"
    size="small"
  >{{name}}</el-button>
</template>

<script>
export default {
  data () {
    return {
      type: '',
      name: ''
    }
  },
  props: {
    defaultVisible: {
      type: Boolean,
      required: true,
      default: () => {
        return false
      }
    },
    successName: {
      type: String,
      required: true
    },
    failureName: {
      type: String,
      required: true
    },
    func: {
      type: Function,
      required: true
    },
    icon: {
      type: String,
      required: false
    },
    successType: {
      type: String,
      required: true
    },
    failureType: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    row: {
      type: Object,
      required: true
    },
    visibleCondition: {
      type: Object | Array,
      isRequired: true
    }
  },
  mounted () {
    this.type = this.successType
    this.name = this.successName
    this.fetchVisible()
  },
  methods: {
    onClick () {
      this.$emit('click', {
        type: this.type,
        callback: this.fetchVisible
      })
    },
    fetchVisible () {
      this.func().then(res => {
        // 条件是数组
        if (Object.prototype.toString.call(this.visibleCondition) === '[object Array]') {
          const conditions = this.visibleCondition.map(item => {
            if (res[item.rowKey] === null) {
              return false
            }
            return res[item.rowKey] === item.value
          })
          const condition = conditions.every(item => item === true)
          if (condition) {
            this.type = this.successType
            this.name = this.successName
          } else {
            this.type = this.failureType
            this.name = this.failureName
          }
        } else {
          if (res[this.visibleCondition.rowKey] === this.visibleCondition.value) {
            this.type = this.successType
            this.name = this.successName
          } else {
            this.type = this.failureType
            this.name = this.failureName
          }
        }
      }).catch(() => {
        this.type = this.failureType
        this.name = this.failureName
      })
    }
  },
  watch: {
    row (val) {
      this.fetchVisible()
    }
  }
}
</script>
