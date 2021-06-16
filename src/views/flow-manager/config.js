export const nodeList = [
  {
    text: '开始',
    type: 'start',
    class: 'node-start'
  },
  {
    text: '基础节点',
    type: 'rect',
    class: 'node-task'
  },
  // {
  //   text: '用户',
  //   type: 'user',
  //   class: 'node-user'
  // },
  {
    text: '判断',
    type: 'switch',
    class: 'node-switch'
  },
  // {
  //   text: '推送',
  //   type: 'push',
  //   class: 'node-push'
  // },
  // {
  //   text: '位置',
  //   type: 'download',
  //   class: 'node-download'
  // },
  {
    text: '结束',
    type: 'end',
    class: 'node-end'
  }
]

export const BpmnNode = [
  {
    type: 'bpmn:startEvent',
    text: '开始',
    class: 'bpmn-start'
  },
  {
    type: 'bpmn:endEvent',
    text: '结束',
    class: 'bpmn-end'
  },
  {
    type: 'bpmn:exclusiveGateway',
    text: '网关',
    class: 'bpmn-exclusiveGateway'
  },
  {
    type: 'bpmn:userTask',
    text: '用户',
    class: 'bpmn-user'
  }
]
