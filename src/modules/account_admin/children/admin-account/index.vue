<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAdd">新建</el-button>
    <list
      :fetchData="fetchData"
      :schema="schema"
      :edit="handleEdit"
      :del="handleDelete"
      ref="adminAccountList"
    />
    <editDialog
      v-if="editDialogVisible"
      :visible="editDialogVisible"
      :value="currentEdit"
      @onSuccess="handleUpdateSuccess"
      @onClose="handleEditDialogVisibleChange"
    />
  </div>
</template>
<script>
import list from 'components/list'
import { COMMON_ADMIN_ROLE } from 'utils/constants'
import { sFetchAdminAccountList, sDeleteAdminAccount } from 'apis/adminAccount'
import editDialog from './edit-dialog'

export default {
  data () {
    return {
      editDialogVisible: false,
      currentEdit: undefined,
      schema: {
        id: {
          label: 'id',
          list: {
            width: 150
          }
        },
        username: {
          label: '账号',
          list: {
            width: 250
          }
        },
        password: {
          label: '密码',
          list: {
            width: 250
          }
        },
        isAccountLocked: {
          label: '是否冻结',
          list: {
            width: 250,
            render: (h, entity) => {
              const style = entity === 1 ? { color: 'red' } : ''
              return <div style={style}>{entity === 1 ? '是' : '否'}</div>
            }
          }
        }
      }
    }
  },
  mounted () {
  },
  methods: {
    fetchData (config) {
      config.roleId = COMMON_ADMIN_ROLE
      return sFetchAdminAccountList(config).then(res => {
        return res
      })
    },
    handleAdd () {
      this.$router.push({
        name: 'admin-account-list-add'
      })
    },
    handleRefresh () {
      this.$refs.adminAccountList.fetchDataList()
    },
    handleEditDialogVisibleChange () {
      this.editDialogVisible = !this.editDialogVisible
    },
    handleEdit (row) {
      this.currentEdit = row
      console.log(this.currentEdit)
      this.editDialogVisible = true
    },
    handleDelete (row) {
      sDeleteAdminAccount(row.id).then(res => {
        this.handleRefresh()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    },
    handleUpdateSuccess () {
      this.handleRefresh()
      this.handleEditDialogVisibleChange()
    }
  },
  components: {
    list,
    editDialog
  }
}
</script>
