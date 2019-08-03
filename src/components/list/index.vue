<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-if="search" @keyup.enter.native="handleFilter" style="width: 400px;" class="input-with-select"
        :placeholder="search.placeholder || '请输入关键字进行搜索'" v-model="listQuery.key">
        <el-button slot="append" icon="el-icon-search" @click="handleFilter"></el-button>
      </el-input>
    </div>
    <el-table
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
      :data="tableData.items"
      v-loading.body="listLoading"
      ref="multipleTable"
      style="width: 100%">
      <template v-if="selectionChange">
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
      </template>
      <el-table-column v-for="key in Object.keys(schema)" :key="key" v-if="schema[key].list"
        :align="align"
        :width="schema[key].list.width || null"
        :prop="key"
        :sortable="schema[key].sortable || false"
        :label="schema[key].label || ''">
        <template slot-scope="scope">
          <expand v-if="schema[key].list.render" :schema="schema" :row="scope.row" :datakey="key" :render="schema[key].list.render" />
          <div v-if="!schema[key].list.render">{{scope.row[key], schema[key].type, schema[key] | fieldTypeRender}}</div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="isActionShow"
        :align="actionAlign || align"
        :header-align="actionHeaderAlign || align"
        label="操作">
        <template slot-scope="scope">
          <el-button class="op-btn" v-for="action in actions" :key="action.key" :type="action.type || 'info'"
            v-if="!action.shouldHookItem || action.shouldHookItem(scope.row)" size="small"
            @click="handleAction(action, scope.row)" :icon="action.icon" :class="action.class" :title="action.name">{{action.name}}</el-button>
          <promise-button class="op-btn" v-for="action in dataPromiseActions" :key="action.key"
            :successType="action.successType || info"
            :failureType="action.failureType || info" :defaultVisible="action.defaultVisible"
            :icon="action.icon" :title="action.name" :row="scope.row"
            :successName="action.successName" :failureName="action.failureName"
            :func="action.func(scope.row)" :visibleCondition="action.visibleCondition"
            @click="(params) => action.onClick(scope.row, params)"
          />
          <el-button class="op-btn" v-if="edit" type="info" size="small" @click="handleEdit(scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button class="op-btn" v-if="del" type="danger" size="small" @click="handleDelete(scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container" v-if="tableData && tableData.count">
      <el-pagination v-if="pageSizes && pageSizes.length" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="pageSizes" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="tableData.count">
      </el-pagination>
      <el-pagination v-if="!pageSizes || !pageSizes.length" background @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-size="listQuery.limit" layout="total, prev, pager, next, jumper" :total="tableData.count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import expand from './expand'
import _ from 'lodash'
import { formatDate } from 'utils/dateformat'
import { FIELD_TYPE } from './type'
import Vue from 'vue'
import promiseButton from './promiseButton'

export default {
  props: {
    align: {
      type: String,
      default () {
        return 'left'
      }
    },
    search: {
      type: Object,
      required: false,
      default: null
    },
    fetchData: {
      type: Function,
      required: true
    },
    schema: {
      type: Object,
      required: true
    },
    actions: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    edit: {
      type: [Function, Boolean],
      required: false,
      default: false
    },
    del: {
      type: [Function, Boolean],
      required: false,
      default: false
    },
    pageSizes: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    auto: {
      type: Boolean,
      required: false,
      default: () => {
        return true
      }
    },
    selectionChange: {
      type: [Function, Boolean],
      required: false,
      default: false
    },
    actionAlign: {
      type: String
    },
    actionHeaderAlign: {
      type: String
    },
    promiseActions: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        key: undefined,
        sort: {}
      },
      listLoading: false,
      extendQuery: {},
      tableData: {},
      dataPromiseActions: []
    }
  },
  mounted () {
    this.dataPromiseActions = this.promiseActions
    this.auto && this.fetchDataList()
  },
  methods: {
    setExtendQuery (extendQuery) {
      this.extendQuery = extendQuery
    },
    clearQuery () {
      this.listQuery.page = 1
      this.listQuery.key = undefined
      this.listQuery.sort = {}
    },
    fetchDataList () {
      this.listLoading = true
      const $offset = (this.listQuery.page - 1) * this.listQuery.limit
      const config = Object.assign({
        $count: true,
        $offset,
        $limit: this.listQuery.limit,
        key: _.trim(this.listQuery.key),
        sort: this.listQuery.sort
      }, this.extendQuery || {})
      const fetchDataRequest = this.fetchData(config)
      if (fetchDataRequest && fetchDataRequest.then) {
        fetchDataRequest.then(res => {
          this.tableData = res
          this.handlePFun()
        }).catch(err => {
          this.$message({
            type: 'error',
            message: `列表获取失败：${err.message}`
          })
        }).finally(() => {
          this.listLoading = false
        })
      } else {
        this.$message({
          type: 'error',
          message: 'fetchData 必须返回 Promise对象'
        })
      }
    },
    handleFilter () {
      this.fetchDataList()
    },
    sortChange (sort) {
      this.listQuery.sort = {
        order: sort.order,
        prop: sort.prop
      }
      this.fetchDataList()
    },
    handleEdit (row) {
      // this.$emit('edit', row)
      this.edit && this.edit(row)
    },
    handleDelete (row) {
      this.$confirm('请确定是否继续删除?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.$emit('delete', row)
        this.del && this.del(row)
      })
    },
    handleAction (actionObj, row) {
      actionObj.action && actionObj.action(row)
    },
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.fetchDataList()
    },
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.fetchDataList()
    },
    toggleRowSelection (row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    handlePFun () {
      const columnKeys = Object.keys(this.schema)
      columnKeys.forEach(columnKey => {
        // console.log('column:L:L:', column)
        const column = this.schema[columnKey]
        this.tableData.items && this.tableData.items.forEach((data, index) => {
          if (column.pFun && typeof column.pFun === 'function') {
            const result = column.pFun(data[columnKey], data)
            if (result && result.then) {
              result.then(res => {
                // this.tableData.items[index][colum.key] = res
                Vue.set(this.tableData.items[index], columnKey, res)
              })
            } else {
              this.tableData.items[index][columnKey] = result
            }
          }
        })
      })
    },
    handleSelectionChange (val) {
      this.selectionChange && this.selectionChange(val)
    }
  },
  computed: {
    isActionShow () {
      return this.actions.length || this.edit || this.del
    }
  },
  filters: {
    fieldTypeRender (value, type, schemaRow) {
      switch (type) {
        case FIELD_TYPE.DATETIME:
          return formatDate(value, 'YYYY-MM-DD HH:mm:ss')
        case FIELD_TYPE.SELECT:
          if (schemaRow.options && schemaRow.options.length) {
            const optionItem = _.find(schemaRow.options, item => item.value === value)
            return optionItem ? optionItem.label || value : value
          }
          return value
        default:
          return value
      }
    }
  },
  components: {
    expand,
    promiseButton
  }
}
</script>

<style scoped>
.input-with-select {
  float: right;
}
.op-btn {
  margin-top: 5px;
}
</style>

