/* eslint-disable */
import {flowManagerSave, validateFlowNameAndVer} from "@/api/flow";

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
  validateFlowNameAndVer({ commit }, {flowName, flowVersion}) {
    // console.log("保存流程请求提交...", flow)
    return new Promise((resolve, reject) => {
      validateFlowNameAndVer(flowName, flowVersion).then(response => {
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
