import request from '@/utils/request'

export function flowManagerSave(data) {
  return request({
    url: '/v1/back/flow/manager',
    method: 'post',
    data
  })
}

export function validateFlowNameAndVer(flowName, flowVersion) {
  return request({
    url: `/v1/back/flow/manager/validateFlowNameAndVer/${flowName}/${flowVersion}`,
    // url: `/v1/flow/manager/detail/123/123`,
    method: 'get'
  })
}

export function listFlow(data) {
  return request({
    url: '/v1/back/flow/manager/list',
    method: 'post',
    data
  })
}

export function detailFlow(templateId, flowVersion) {
  return request({
    url: `/v1/back/flow/manager/detail/${templateId}/${flowVersion}`,
    method: 'get'
  })
}
