<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <div class="right-menu">
      <span class="user-name">{{nickName}}</span>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatarUrl" @error="avatarLoadOnError">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <!-- <el-dropdown-item divided>
            <span @click="logout" style="display:block;">登出</span>
          </el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import Breadcrumb from 'components/Breadcrumb'
import Hamburger from 'components/Hamburger'
// import uc from 'apis/uc'
import { SessionStorage, ADMIN_ID } from 'utils/config'
import { TOKENS, DEFAULT_AVATAR } from 'utils/constants'

export default {
  data () {
    return {
      sidebar: {},
      avatarUrl: DEFAULT_AVATAR,
      nickName: ''
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    // avatarUrl () {
    //   // return this.avatar.indexOf('cdncs') === -1 ? (this.avatar + '?imageView2/1/w/80/h/80') : this.avatar
    //   return 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
    // }
  },
  mounted () {
    this.sidebar = this.$store.state.index.sidebar
    this.fetchUser()
  },
  methods: {
    fetchUser () {
      // const { user_id } = SessionStorage.get(TOKENS) || {}
      // if (user_id) {
      //   uc.sGetAvatarUrl({ userId: user_id }).then(({ avatarUrl }) => {
      //     this.avatarUrl = avatarUrl
      //   })
      // }
      // uc.sFetchUserCached(user_id).then(res => {
      //   this.$store.dispatch('user/setUserInfo', res)
      //   this.nickName = (res.org_exinfo && res.org_exinfo.real_name) || res.nick_name || '用户' + res.user_id
      // })
    },
    toggleSideBar () {
      this.$store.dispatch('index/ToggleSideBar')
    },
    logout () {
      // uc.sDelTokens().then(() => {
      //   location.reload() // 为了重新实例化vue-router对象 避免bug
      // })
      SessionStorage.remove(TOKENS)
      SessionStorage.remove(ADMIN_ID)
      this.$router.push({
        name: 'login'
      })
    },
    avatarLoadOnError () {
      this.avatarUrl = DEFAULT_AVATAR
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .user-name {
      position: absolute;
      top: 50%;
      right: 90px;
      transform: translateY(-50%);
      color: #909399;
      font-size: 14px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
      .international-icon{
        font-size: 20px;
        cursor: pointer;
        vertical-align: -5px;
      }
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

