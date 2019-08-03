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
import { MARKET_ADMIN_ROLE } from 'utils/constants'
import { sFetchAdminAccountList, sDeleteAdminAccount } from 'apis/adminAccount'
import { sFetchPinpaiList } from 'apis/superAdmin'
import editDialog from './edit-dialog'

export default {
  data () {
    return {
      pinpaiList: [],
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
        txuanPinpaiId: {
          label: '所属品牌',
          list: {
            width: 250,
            render: (h, entity) => {
              let name = ''
              for (let i = 0; i < this.pinpaiList.length; i++) {
                if (this.pinpaiList[i].id === entity) {
                  name = this.pinpaiList[i].name
                  break
                }
              }
              return (<div>{name}</div>)
            }
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
    this.fetchAllPinpai()
  },
  methods: {
    fetchAllPinpai () {
      sFetchPinpaiList().then(res => {
        this.pinpaiList = res
      })
    },
    fetchData (config) {
      config.roleId = MARKET_ADMIN_ROLE
      return sFetchAdminAccountList(config).then(res => {
        return res
      })
    },
    handleAdd () {
      this.$router.push({
        name: 'business-account-list-add'
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
