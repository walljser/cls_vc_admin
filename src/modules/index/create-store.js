import Cookies from 'js-cookie'

export default () => {
  const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

  const state = {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    }
  }

  const getters = {
    activityInfo: state => state.activityInfo
  }

  const actions = {
    ToggleSideBar ({ commit }, value) {
      commit(TOGGLE_SIDEBAR, value)
    }
  }

  const mutations = {
    [TOGGLE_SIDEBAR] (state, value) {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    }
  }
  return {
    state,
    getters,
    actions,
    mutations
  }
}
