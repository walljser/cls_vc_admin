<template>
<el-dialog
  title="编辑"
  :visible.sync="visible"
  width="60%"
  :before-close="handleCancel"
>
  <el-form ref="editForm" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="密码" prop="password">
      <el-input type="text" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="是否冻结账号" prop="isLocked">
      <el-switch v-model="form.isLocked"></el-switch>
    </el-form-item>
    <el-form-item label="所属品牌" prop="pinpaiId">
      <el-select v-model="form.pinpaiId" filterable placeholder="请选择">
        <el-option
          v-for="item in pinpaiList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="handleSubmit"
      >确定</el-button>
      <el-button type="danger" @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</el-dialog>

</template>
<script>
import { sUpdateAdminAccount } from 'apis/adminAccount'
import { sFetchPinpaiList } from 'apis/superAdmin'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      pinpaiList: [],
      form: {
      },
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { max: 10, message: '最长不能超过10个字符', trigger: 'blur' }
        ],
        isLocked: [
          { required: true, message: '请选择是否冻结账号', trigger: 'blur' }
        ],
        pinpaiId: [
          { required: true, message: '请选择所属品牌', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.fetchAllPinpai()
    this.form = {
      ...this.value,
      isLocked: this.value.isAccountLocked === 1,
      pinpaiId: this.value.txuanPinpaiId
    }
  },
  methods: {
    fetchAllPinpai () {
      sFetchPinpaiList().then(res => {
        this.pinpaiList = res
      })
    },
    handleSubmit () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          sUpdateAdminAccount({
            ...this.form,
            isLocked: this.form.isLocked ? 1 : 0
          }).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$emit('onSuccess')
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    handleCancel () {
      this.$emit('onClose')
    }
  },
  components: {
  }
}
</script>
