<template>
  <div>
    <div class="com-loading" v-show="state === 'loading'"><p class="loading__text">正在加载中...</p></div>
    <div class="com-fail" v-show="state === 'loadingFailed'">
      <p class="fail__text">加载失败，请<a href="javascript:;" class="fail__fresh" @click="refresh">刷新</a></p>
    </div>
    <div class="com-fail fail__empyt" v-show="state === 'dateEmpty'">
      <p class="fail__text">暂无数据</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      state: {
        type: String, // loading, loadingFailed, dateEmpty
        required: true
      }
    },
    methods: {
      refresh () {
        this.$emit('refresh')
      }
    }
  }
</script>
