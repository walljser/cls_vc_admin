<template>
  <div class="app-container">
    <el-row>
      <el-col :span="3" v-for="(item, index) in rbac_app" :key="index" :offset="1" class="app-col-card">
        <router-link :to="{name: item.name}" :key="item.name">
          <el-card :body-style="{ padding: '0px' }" hoverable>
            <img :src="item.image" class="image">
            <div class="title">
              <span>{{item.title}}</span>
              <!-- <div class="bottom clearfix">
              </div> -->
            </div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { APP_LIST, SessionStorage } from 'utils/config'
import { ADMIN_ROLE_ID } from 'utils/constants'

export default {
  data () {
    return {
      app: APP_LIST,
      rabc_app: []
    }
  },
  created () {
    const _ADMIN_ROLE_ID = parseInt(SessionStorage.get(ADMIN_ROLE_ID))
    const rbac_app = this.app.filter(item => {
      const roleList = item.role
      const authority = roleList.some(role => role === _ADMIN_ROLE_ID)
      return authority
    })
    this.rbac_app = rbac_app
    // if (_ADMIN_ROLE_ID === SUPER_ADMIN_ROLE) {
    //   this.$router.push({
    //     name: 'administrator'
    //   })
    // } else {
    // }
  }
}
</script>
<style>
  .app-col-card {
    margin-bottom: 30px;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 200px;
    display: block;
  }

  .title {
    text-align: center;
    padding: 18px;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
