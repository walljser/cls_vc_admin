<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
  import niceScrollConfig from './config'

  export default {
    data () {
      return {
        count: 1
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.$nextTick(() => {
          this.niceScroll = $(this.$el).niceScroll({
            ...niceScrollConfig,
            scrollbarid: 'pascrail' + this.count++
          })
          this.niceScroll.resize()
        })
      },
      resize () {
        this.$nextTick(() => {
          this.niceScroll && this.niceScroll.resize()
        })
      }
    },
    activated () {
      this.resize()
    },
    deactivated () {
      this.resize()
    },
    components: {
    }
  }
</script>
