<template>
  <div class="login-container">
  </div>
</template>

<script>
import { SessionStorage } from 'utils/config'
import { TOKENS, ADMIN_ID, ADMIN_ROLE_ID, PINPAI_ID } from 'utils/constants'
import * as adminAccountApi from 'apis/adminAccount'

export default {
  name: 'login',
  data () {
    return {}
  },
  mounted () {
    this.$router.push({
      path: '/index/app'
    })
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/application/styles/mixin.scss";
  $bg:#f0f2f5;
  $dark_gray:#889aa4;
  $dark:#000;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #f5f5f5 inset !important;
      -webkit-text-fill-color: #000 !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $dark;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $dark;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      // background: rgba(0, 0, 0, 0.1);
      background-color: #fff;
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }

  // input:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill {
  //   -webkit-text-fill-color: #ededed !important;
  //   box-shadow: 0 0 0px 1000px transparent  inset !important;
  //   background-color:transparent;
  //   background-image: none;
  //   transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
  // }
</style>
