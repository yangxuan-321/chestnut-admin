export const nodeList = [
  {
    text: '开始',
    type: 'start',
    class: 'node-start'
  },
  {
    text: '人工节点',
    type: 'user',
    class: 'node-user'
  },
  {
    text: '自动节点',
    type: 'auto',
    class: 'node-auto'
  },
  {
    text: '判断',
    type: 'switch',
    class: 'node-switch'
  },
  {
    text: '等待',
    type: 'wait',
    class: 'node-wait'
  },
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
