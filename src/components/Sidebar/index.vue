<template>
  <scroll-bar>
    <el-menu mode="vertical" :default-active="defaultActive" :collapse="isCollapse" background-color="#002140" text-color="rgba(255, 255, 255, 0.65)" active-text-color="#fff">
      <sidebar-item :routes="permissionRouters"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
// import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from 'components/ScrollBar'

export default {
  data () {
    return {
      sidebar: {}
    }
  },
  props: {
    filterRoute: {
      type: Function,
      default: routeList => { return routeList }
    }
  },
  components: { SidebarItem, ScrollBar },
  computed: {
    permissionRouters () {
      const allRoutes = this.$router.options.routes
      const currentRoutePath = this.$route.path
      const routeList = []
      allRoutes.forEach(item => {
        if (currentRoutePath.indexOf(`${item.path}/`) === 0) {
          routeList.push(item)
        }
      })
      return this.filterRoute(routeList)
    },
    routes () {
      return this.$router.options.routes
    },
    isCollapse () {
      return !this.sidebar.opened
    },
    defaultActive () {
      const path = this.$route.path
      return getActivePath(this.permissionRouters, path)
    }
  },
  mounted () {
    this.sidebar = this.$store.state.index.sidebar
  }
}

const getActivePath = (permissionRouters, path) => {
  let activePath = path
  let getActivePath = false
  let lastActivePathLength = 0
  // 先看能不能找到一模一样的path，否则当前path包括找到的path(位置必须在最前面，且优先匹配更长的)
  filterHaveParent(permissionRouters).forEach(pathItem => {
    if (pathItem && !getActivePath) {
      const guessPath = pathItem
      if (path === guessPath) {
        activePath = path
        getActivePath = true
      }
      if (!getActivePath && lastActivePathLength < guessPath.length && path.indexOf(guessPath) === 0) {
        activePath = guessPath
        lastActivePathLength = guessPath.length
      }
    }
  })
  return activePath
}
const filterHaveParent = routeList => {
  let routePathList = []
  routeList.forEach(routeItem => {
    if (routeItem.children && routeItem.children.length) {
      routePathList = [...routePathList, ...filterHaveParent(routeItem.children)]
    }
    routePathList.push(!routeItem.parent && routeItem.path)
  })
  return routePathList
}
</script>
