import { SUPER_ADMIN_ROLE, COMMON_ADMIN_ROLE, MARKET_ADMIN_ROLE } from './constants'

const ADMIN_APP = {
  title: '头号头选管理中心',
  name: 'administrator',
  image: '/thtxAdmin/images/app/super_admin.png',
  role: [SUPER_ADMIN_ROLE, COMMON_ADMIN_ROLE]
}

const MARKET_ADMIN_APP = {
  title: '商家管理中心', // 商家的
  name: 'market_admin',
  image: '/thtxAdmin/images/app/bestbuy.jpg',
  role: [MARKET_ADMIN_ROLE]
}

const ACCOUNT_ADMIN_APP = {
  title: '账号管理中心',
  name: 'account_admin',
  image: '/thtxAdmin/images/app/account.jpg',
  role: [SUPER_ADMIN_ROLE]
}

const CUSTOMER_APP = {
  title: '平台管理中心',
  name: 'customer',
  image: '/thtxAdmin/images/app/customer.jpeg',
  role: [SUPER_ADMIN_ROLE]
}

const SYSTEM_CONFIG = {
  title: '运营管理中心',
  name: 'sys_cfg',
  image: '/thtxAdmin/images/app/team.jpg',
  role: [SUPER_ADMIN_ROLE]
}

export const AWS_APP_LIST = []
export const ALL_APP_LIST = [ADMIN_APP, MARKET_ADMIN_APP, SYSTEM_CONFIG, CUSTOMER_APP, ACCOUNT_ADMIN_APP]

