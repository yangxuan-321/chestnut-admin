import { setToken } from '@/utils/auth'
import { flowManagerSave } from '@/api/flow'

const actions = {
  // user login
  flowManagerSave({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      flowManagerSave({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        console.log(data)
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}
