import moduleOptions from './options'

export default (context, options = moduleOptions) => {
  const routeList = [
    {
      path: '',
      name: 'account_admin',
      redirect: 'admin-account-list',
      meta: {
        auth: true,
        title: '账号管理',
        icon: 'example'
      },
      component: () => System.import('./views/index.vue'),
      children: [
        {
          path: 'admin-account-list',
          name: 'admin-account-list',
          meta: { title: '管理员账号列表' },
          component: () => System.import('./children/admin-account/index.vue')
        },
        {
          path: 'admin-account-list/add',
          name: 'admin-account-list-add',
          meta: { title: '新增' },
          parent: 'admin-account-list',
          component: () => System.import('./children/admin-account/add.vue')
        },
        {
          path: 'business-account-list',
          name: 'business-account-list',
          meta: { title: '商家账号列表' },
          component: () => System.import('./children/business-account/index.vue')
        },
        {
          path: 'business-account-list/add',
          name: 'business-account-list-add',
          meta: { title: '新增' },
          parent: 'business-account-list',
          component: () => System.import('./children/business-account/add.vue')
        }
      ]
    }
  ]
  return routeList
}
