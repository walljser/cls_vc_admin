// import ucApi from 'apis/uc'
// import parser from 'utils/parser'
// import message from 'components/message'

export default function (router) {
  // router hooks
  router.beforeEach((to, from, next) => {
    // store.dispatch('setProgress', 80)
    next()
  })

  router.afterEach(() => {
    if (document.activeElement && document.activeElement.nodeName !== 'BODY') {
      document.activeElement.blur()
    }
    // store.dispatch('setProgress', 100)
  })
}
