<template>
<div class="app-container">
  <el-form ref="addForm" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="账号" prop="username">
      <el-input type="text" v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="text" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="是否冻结账号" prop="isLocked">
      <el-switch v-model="form.isLocked"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="handleSubmit"
      >确定</el-button>
      <el-button type="danger" @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</div>

</template>
<script>
import { sPostAdminAccount } from 'apis/adminAccount'

export default {
  data () {
    return {
      form: {
        isLocked: false
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { max: 20, message: '最长不能超过20个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { max: 10, message: '最长不能超过10个字符', trigger: 'blur' }
        ],
        isLocked: [
          { required: true, message: '请选择是否冻结账号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          sPostAdminAccount({
            ...this.form,
            isLocked: this.form.isLocked ? 1 : 0,
            isBusiness: false
          }).then(res => {
            this.$message({
              type: 'success',
              message: '创建成功'
            })
            this.$router.go(-1)
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    handleCancel () {
      this.$router.go(-1)
    }
  },
  components: {
  }
}
</script>
