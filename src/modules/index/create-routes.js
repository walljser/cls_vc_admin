import mouduleOptions from './options'

export default (context, options = mouduleOptions) => {
  const routeList = [
    {
      path: '',
      redirect: 'app',
      meta: {
        auth: true,
        title: '首页',
        icon: 'example'
      },
      component: () => System.import('./views/index.vue'),
      children: [
        {
          path: 'app',
          name: 'app',
          meta: { title: '音频列表', icon: 'table' },
          component: () => System.import('./children/app/index.vue')
        }
      ]
    }
  ]
  return routeList
}
