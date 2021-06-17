/* eslint-disable */
import {flowManagerSave} from "@/api/flow";

const actions = {
  // save flow
  flowManagerSave({ commit }, flow) {
    console.log("保存流程请求提交...", flow)
    return new Promise((resolve, reject) => {
      flowManagerSave(flow).then(response => {
        const { data } = response
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
