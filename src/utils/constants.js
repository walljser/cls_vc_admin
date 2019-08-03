// one minute
export const ONE_MINUTE = 60 * 1e3

// one week
export const ONE_WEEK = 7 * 24 * 60 * 60 * 1e3

// tokens
export const TOKENS = 'TOKENS'

export const ADMIN_ID = 'ADMIN_ID'

export const PINPAI_ID = 'PINPAI_ID'

export const AUTH = 'AUTH-AUTH'

// 默认头像
export const DEFAULT_AVATAR = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'

// INT最大值
export const INTEGER_MAX = 2147483647

// INT最大值
// export const UPLOAD_PATH = '/image'
export const UPLOAD_PATH = 'https://bbs.geomen.vip/thtx/dentry/upload'

export const DENTRY_PATH = 'https://bbs.geomen.vip/thtxImg'

// 上传的文件scope，1公开
export const CS_SCOPE = 1
// 时间选择组件，最多从2012年开始选
export const PICKEROPTIONS = {
  disabledDate (time) {
    return time.getTime() < 1325347200000
  }
}
export const ADMIN_ROLE_ID = 'A_R_I'
// 后台管理员权限号
export const COMMON_ADMIN_ROLE = 10
// 商家管理员权限号
export const MARKET_ADMIN_ROLE = 20
// 超级管理员权限号
export const SUPER_ADMIN_ROLE = 100

export const ORDER_STATUS = {
  // 0 待付款 1 待发货 2 待收货 3 已完成 4 全部
  0: '待付款',
  1: '待发货',
  2: '待收货',
  3: '已完成',
  4: '退款中',
  5: '退款成功',
  6: '退款失败',
  7: '订单关闭',
  '-1': '全部',
  all: -1,
  wait_pay: 0,
  wait_out: 1,
  wait_receive: 2,
  finish: 3,
  refunding: 4,
  refund_success: 5,
  refund_fail: 6,
  close: 7
}

export const ORDER_STATUS_GROUP = [
  {
    name: ORDER_STATUS[ORDER_STATUS.wait_pay],
    value: ORDER_STATUS.wait_pay
  },
  {
    name: ORDER_STATUS[ORDER_STATUS.wait_out],
    value: ORDER_STATUS.wait_out
  },
  {
    name: ORDER_STATUS[ORDER_STATUS.wait_receive],
    value: ORDER_STATUS.wait_receive
  },
  {
    name: ORDER_STATUS[ORDER_STATUS.finish],
    value: ORDER_STATUS.finish
  },
  {
    name: ORDER_STATUS[ORDER_STATUS.refunding],
    value: ORDER_STATUS.refunding
  },
  {
    name: ORDER_STATUS[ORDER_STATUS.refund_success],
    value: ORDER_STATUS.refund_success
  },
  {
    name: ORDER_STATUS[ORDER_STATUS.refund_fail],
    value: ORDER_STATUS.refund_fail
  },
  {
    name: ORDER_STATUS[ORDER_STATUS.all],
    value: ORDER_STATUS.all
  }
]

export const RED_PACKAGE_STATUS = {
  // 0-待审核 1-审核通过,提现成功 2-审核不通过,提现失败 -1-全部
  all: -1,
  wait: 0,
  success: 1,
  failure: 2,
  '-1': '全部',
  0: '待审核',
  1: '同意提现',
  2: '拒绝提现'
}

export const RED_PACKAGE_STATUS_GROUP = [
  {
    name: RED_PACKAGE_STATUS[RED_PACKAGE_STATUS.wait],
    value: RED_PACKAGE_STATUS.wait
  },
  {
    name: RED_PACKAGE_STATUS[RED_PACKAGE_STATUS.success],
    value: RED_PACKAGE_STATUS.success
  },
  {
    name: RED_PACKAGE_STATUS[RED_PACKAGE_STATUS.failure],
    value: RED_PACKAGE_STATUS.failure
  },
  {
    name: RED_PACKAGE_STATUS[RED_PACKAGE_STATUS.all],
    value: RED_PACKAGE_STATUS.all
  }
]

export const REFUND_STATUS = {
  // 0-待审核 1-审核通过,提现成功 2-审核不通过,提现失败 -1-全部
  all: -1,
  wait: 0,
  wait_notify: 1, // 等待微信退款
  failure: 2, // 审核不通过
  success: 3, // 退款成功
  '-1': '全部',
  0: '待审核',
  1: '等待微信退款',
  2: '拒绝退款',
  3: '退款成功'
}

export const REFUND_STATUS_GROUP = [
  {
    name: REFUND_STATUS[REFUND_STATUS.wait],
    value: REFUND_STATUS.wait
  },
  {
    name: REFUND_STATUS[REFUND_STATUS.wait_notify],
    value: REFUND_STATUS.wait_notify
  },
  {
    name: REFUND_STATUS[REFUND_STATUS.success],
    value: REFUND_STATUS.success
  },
  {
    name: REFUND_STATUS[REFUND_STATUS.failure],
    value: REFUND_STATUS.failure
  },
  {
    name: REFUND_STATUS[REFUND_STATUS.all],
    value: REFUND_STATUS.all
  }
]

export const logisticsCompanyList = [
  '申通快递',
  '中通快递',
  '天天快递',
  '韵达快递',
  '顺丰快递',
  '圆通快递',
  '全峰快递',
  '邮政包裹',
  '百世快递',
  'EMS',
  '京东物流',
  '德邦快递',
  '其他'
]
