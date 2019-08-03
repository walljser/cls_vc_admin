<template>
  <transition name="fade" mode="out-in" appear>
    <router-view></router-view>
  </transition>
</template>

<script>
  export default {
    methods: {
    },
    mounted () {
    },
    components: {
    }
  }
</script>

<style lang="scss">
  @import 'normalize.css/normalize.css';// normalize.css 样式格式化
  @import '../styles/index.scss'; // 全局自定义的css样式
  @import '../styles/iconfont.css'; // iconfont
</style>