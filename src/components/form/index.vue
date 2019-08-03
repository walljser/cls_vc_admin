<template>
 <div class="from-container pull-auto">
    <el-form  ref="form" :model="form" :label-width="labelWidth" :rules="formRules">
      <el-row :gutter="20" :span="24">
        <template v-for="(column,index) in formOption.column">
          <el-col :span="column.span||24">
            <el-form-item :label="column.label" :prop="column.prop" v-if="!column.visdiplay">
              <template v-if="column.type == 'select'">
                  <el-select v-model="form[column.prop]" :placeholder="'请选择'+column.label" :disabled="column.disabled">
                  <el-option
                    v-for="(item,index) in formDics[column.prop]"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
              <template v-if="column.type == 'radio'">
                    <el-radio  v-for="(item,index) in formDics[column.prop]" v-model="form[column.prop]" :disabled="column.disabled" :label="item.value" :key="index">{{item.label}}</el-radio>
              </template>
              <template v-if="column.type == 'date'">
                    <el-date-picker v-model="form[column.prop]" type="date" :placeholder="'请输入'+column.label" :disabled="column.disabled"> </el-date-picker>
              </template>
              <template v-if="column.type == 'checkbox'">
                <el-checkbox-group  v-model="form[column.prop]">
                    <el-checkbox  v-for="(item,index) in formDics[column.prop]" :label="item.value" :key="index" :disabled="column.disabled">{{item.label}}</el-checkbox>
                </el-checkbox-group>
              </template>
              <template v-if="column.type == 'image' || column.type == 'file'">
                <upload v-model="form[column.prop]" :session="session" :formData="uploadFormData" :accept="column.accept" :preview="column.preview"
                  :type="column.type" :disabled="column.disabled" :description="column.description" :maxSize="column.maxSize" :limit="column.limit" />
              </template>
              <template v-if="column.type == 'datetimerange'">
                <el-date-picker
                  :picker-options="PICKEROPTIONS"
                  value-format="timestamp"
                  v-model="form[column.prop]"
                  :disabled="column.disabled"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </template>
              <template v-if="column.type == 'number'">
                <el-input-number v-model="form[column.prop]" :min="column.min" :max="column.max" :disabled="column.disabled"></el-input-number>
              </template>
              <template v-if="column.type == 'textarea'">
                <el-input v-model="form[column.prop]" type="textarea" :rows="5" :placeholder="'请输入'+column.label" :disabled="column.disabled"></el-input>
              </template>
              <template v-if="column.type == 'richtext'">
                <ckeditor v-model="form[column.prop]" :session="session" :formData="uploadFormData" :toolbar="column.toolbar" :disabled="column.disabled"/>
              </template>
              <template v-if="!column.type">
                <el-input v-model="form[column.prop]" :placeholder="'请输入'+column.label" :disabled="column.disabled"></el-input>
              </template>
              <p v-if="column.desc" class="desc">{{column.desc}}</p>
            </el-form-item>
          </el-col>
         </template>
          <el-col :span="24">
          <el-form-item>
              <el-button type="danger" @click="handleCancel">{{formCancelText}}</el-button>
              <el-button type="primary" @click="handleSubmit">{{formSubmitText}}</el-button>
          </el-form-item>
          </el-col>
      </el-row>
      </el-form>
 </div>
</template>

<script>
// import { mapActions } from 'vuex'
import Vue from 'vue'
import { UPLOAD_PATH, CS_SCOPE, PICKEROPTIONS } from 'utils/constants'
import upload from 'components/upload'
import ckeditor from 'components/CKEditor'

export default {
  data () {
    return {
      PICKEROPTIONS,
      form: {},
      formRules: {},
      formDics: {}
    }
  },
  created () {
    // 规则初始化
    this.rulesInit()
    // 初始化dic字典
    this.dicInit()
    // 初始化form表单
    this.formInit()
  },
  props: {
    labelWidth: {
      type: String,
      default: '100px'
    },
    formOption: {
      type: Object,
      required: true,
      default: {}
    },
    formSubmitText: {
      type: String,
      default: '提交'
    },
    formCancelText: {
      type: String,
      default: '取消'
    },
    formData: {
      type: Object,
      default () {
        return {}
      }
    },
    session: {
      type: String,
      required: false,
      default: ''
    },
    uploadFormData: {
      type: Object,
      required: false,
      default: () => {
        return {
          scope: CS_SCOPE,
          path: UPLOAD_PATH
        }
      }
    }
  },
  mounted () {
    // 简单拷贝
    this.form = Object.assign({}, this.formData)
  },
  computed: {},
  watch: {
    formData (val) {
      this.form = Object.assign({}, this.formData)
    },
    formOption (n, o) {
      this.rulesInit()
      this.dicInit()
    }
  },
  methods: {
    // ...mapActions(['GetDic']),
    rulesInit () {
      this.formRules = {}
      this.formOption.column.forEach(ele => {
        if (ele.rules) this.formRules[ele.prop] = ele.rules
      })
    },
    dicInit () {
      // this.GetDic(this.formOption.dic).then(data => {
      //   this.DIC = data
      // })
      this.formDics = {}
      this.formOption.column.map(ele => {
        if (ele.options) {
          if (ele.options.then) {
            ele.options.then(res => {
              Vue.set(this.formDics, ele.prop, res)
            })
          } else {
            Vue.set(this.formDics, ele.prop, ele.options)
          }
        }
      })
    },
    formInit () {
      if (this.formData && Object.getOwnPropertyNames(this.formData).length) {
        this.form = Object.assign({}, this.formData)
      } else {
        const list = this.formOption.column
        const form = {}
        list.forEach(ele => {
          if (ele.type === 'checkbox' || ele.type === 'radio') {
            form[ele.prop] = []
          } else {
            form[ele.prop] = ''
          }
        })
        this.form = Object.assign({}, form)
      }
    },
    columnOptions (options) {
      return options
    },
    handleSubmit () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('handleSubmit', this.form)
        } else {
          this.$emit('handleSubmit')
        }
      })
    },
    handleCancel () {
      this.$emit('handleCancel')
    },
    forceUpdate (props) {
      if (!props) {
        return
      }
      this.form[props] = this.formData[props]
    }
  },
  components: {
    upload,
    ckeditor
  }
}
</script>

<style lang="scss" scoped>
.from-container {
  padding: 8px 10px;
}
.desc{
  height: 15px;
  line-height: 15px;
  color: #606266;
}
</style>
