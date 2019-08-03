export default () => {
  const list = []
  list.push({
    path: '/',
    // component: () => System.import('./views/login')
    name: 'root',
    redirect: {
      name: 'app'
    }
  })
  list.push({
    path: '/login',
    name: 'login',
    meta: {
      icon: 'lock',
      auth: false
    },
    component: () => System.import('./views/login')
  })
  list.push({
    path: '*',
    meta: {
      icon: 'lock',
      auth: false
    },
    redirect: { name: 'root' }
  })
  return list
}
