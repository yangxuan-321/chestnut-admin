import request from '@/utils/request'

export function flowManagerSave(data) {
  return request({
    url: '/v1/flow/manager',
    method: 'post',
    data
  })
}

export function validateFlowNameAndVer(flowName, flowVersion) {
  return request({
    url: `/v1/flow/manager/validateFlowName/${flowName}/${flowVersion}`,
    method: 'get'
  })
}

export function listFlow(data) {
  return request({
    url: '/v1/flow/manager/list',
    method: 'post',
    data
  })
}

export function detailFlow(templateId) {
  return request({
    url: `/v1/flow/manager/${templateId}`,
    method: 'get'
  })
}
