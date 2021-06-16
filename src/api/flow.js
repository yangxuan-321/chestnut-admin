import request from '@/utils/request'

export function flowManagerSave(data) {
  return request({
    url: '/v1/flow/manager',
    method: 'post',
    data
  })
}
