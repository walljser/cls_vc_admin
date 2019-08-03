<template>
  <div id="app">
    <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
      <sidebar class="sidebar-container"></sidebar>
      <div class="main-container">
        <navbar></navbar>
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import AppMain from 'components/AppMain'

export default {
  name: 'landing',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },

  mounted () {
  },
  computed: {
    sidebar () {
      return this.$store.state.index.sidebar
    }
  }
}
</script>

<style rel="stylesheet/css" lang="scss" scoped>
@import "src/application/styles/mixin.scss";
.app-wrappper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
