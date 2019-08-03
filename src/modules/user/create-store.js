
export default () => {
  const SET_USER_INFO = 'SET_USER_INFO'

  const state = {
    userInfo: null
  }

  const getters = {
    userInfo: state => state.userInfo
  }

  const actions = {
    setUserInfo ({ commit }, value) {
      commit(SET_USER_INFO, value)
    }
  }

  const mutations = {
    [SET_USER_INFO] (state, value) {
      state.userInfo = value
    }
  }
  return {
    state,
    getters,
    actions,
    mutations
  }
}
