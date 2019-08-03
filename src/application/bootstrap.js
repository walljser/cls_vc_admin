import Vue from 'vue'
import { configure, use, run } from 'system'

import { log } from 'utils/console'

import logger from 'modules/logger'
import user from 'modules/user'
import index from 'modules/index'

import Root from './views/root'

import mRouter from './router'

import { ClientTable } from 'vue-tables-2'
import loadState from 'components/loadstate'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../icons' // icon

Vue.use(ClientTable)

Vue.component('loadState', loadState)

// Vue.component('Button', Button)
// Vue.component('Select', Select)
// Vue.component('Option', Option)
// Vue.component('DatePicker', DatePicker)
// Vue.component('Message', Message)
Vue.use(ElementUI)

/**
 * 全局配置
 */
configure({
  // 项目名称
  name: 'PLATO',
  // 项目版本号
  version: '1.0',
  // 系统自动将 component 挂载到 element
  element: '#app',
  component: Root
})

/**
 * 调试相关
 */
__DEV__ && use(logger)

/**
 * user模块一定要放到最后面
 * 原因：user模块的路由包含*,会覆盖后面的所有路由
 */
use(index)

use(user)

/**
 * Run Modules
 */
run(({ router, store }, done) => {
  log('%c[PLATO] %cLet\'s go!', 'font-weight: bold', 'color: green; font-weight: bold')
  mRouter(router, store)
  done()
})

