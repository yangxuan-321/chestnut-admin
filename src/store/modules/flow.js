/* eslint-disable */
import {flowManagerSave, validateFlowName} from "@/api/flow";

const actions = {
  // save flow
  flowManagerSave({ commit }, flow) {
    // console.log("保存流程请求提交...", flow)
    return new Promise((resolve, reject) => {
      flowManagerSave(flow).then(response => {
        const { data } = response
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  validateFlowName({ commit }, flowName) {
    // console.log("保存流程请求提交...", flow)
    return new Promise((resolve, reject) => {
      validateFlowName(flowName).then(response => {
        const { data } = response
        resolve(response)
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
