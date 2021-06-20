import request from '@/utils/request'

export function flowManagerSave(data) {
  return request({
    url: '/v1/flow/manager',
    method: 'post',
    data
  })
}

export function validateFlowName(flowName) {
  return request({
    url: '/v1/flow/manager/validateFlowName/' + flowName,
    method: 'get'
  })
}
