<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">

      <el-submenu v-if="!item.parent&&item.children&&item.children.length" 
        :index="`${item.path}-${item.name}`" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
        </template>

        <template v-if="!child.parent" v-for="child in item.children">
          <sidebar-item class="nest-menu" v-if="child.children&&child.children.length" :routes="[child]" :key="child.path">
          </sidebar-item>

          <router-link v-else :to="{name: child.name}" :key="child.name">
            <el-menu-item :index="child.path">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
      
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  data () {
    return {
    }
  },
  props: {
    routes: {
      type: Array
    }
  }
}
</script>
