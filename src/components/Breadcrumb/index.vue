<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path" v-if="item.meta.title">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="getRouteLink(item)">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  created () {
    this.getBreadcrumb()
  },
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  methods: {
    getRouteLink (item) {
      if (item.name) {
        // 子路由的params必定包含父路由的params
        return {
          name: item.name,
          params: this.$route.params || {}
        }
      } else {
        return item.redirect || item.path
      }
    },
    getBreadcrumb () {
      const allRoutes = this.$router.options.routes
      const currentRouteName = this.$route.name
      let breadList = []

      const currentRouteItem = this.getRoute(currentRouteName, allRoutes)
      this.getBreadcrumbList(currentRouteItem, allRoutes, breadList)
      if (currentRouteItem.root) {
        breadList = [currentRouteItem.root].concat(breadList)
      }
      this.levelList = breadList
      // console.log('level', this.$route, breadList)
    },
    getRoute (name, routeList) {
      if (!name) {
        return null
      }
      let findItem = null
      routeList.forEach(routeItem => {
        if (!findItem) {
          if (routeItem.name === name) {
            findItem = routeItem
          }
          if (!findItem && routeItem.children && routeItem.children.length) {
            findItem = this.getRoute(name, routeItem.children)
            if (findItem) {
              findItem.root = routeItem
            }
          }
        }
      })
      return findItem
    },
    getBreadcrumbList (item, routeList, breadList) {
      if (item.parent) {
        const parent = this.getRoute(item.parent, routeList)
        this.getBreadcrumbList(parent, routeList, breadList)
      }
      breadList.push(item)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
