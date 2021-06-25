export default function registerStart(lf) {
  lf.register('start', ({ CircleNode, CircleNodeModel, h }) => {
    class StartNode extends CircleNode {
      getIconShape() {
        const attributes = this.getAttributes()
        const {
          x,
          y
          // ,width,
          // height
        } = attributes
        const stroke = '#404040'
        return h(
          'svg',
          {
            // x: x - width / 4,
            // y: y - height / 4,
            x: x - 9,
            y: y - 10,
            width: 22,
            height: 22,
            viewBox: '0 0 1024 1024'
          },
          h(
            'path',
            {
              fill: stroke,
              d: 'M838.4 448c44.8 32 44.8 76.8 0 102.4l-627.2 416c-44.8 32-76.8 6.4-76.8-44.8V83.2c0-51.2 32-76.8 76.8-44.8L838.4 448z'
            }
          )
        )
      }
      getShape() {
        const attributes = this.getAttributes()
        const {
          x,
          y,
          r,
          fill,
          stroke,
          strokeWidth
        } = attributes
        return h(
          'g',
          {
          },
          [
            h(
              'circle',
              {
                cx: x,
                cy: y,
                r,
                fill,
                stroke,
                strokeWidth
              }
            ),
            this.getIconShape()
          ]
        )
      }
    }
    class StartModel extends CircleNodeModel {
      constructor(data, graphModel) {
        data.text = {
          value: (data.text && data.text.value) || '',
          x: data.x,
          y: data.y + 45,
          dragable: false,
          editable: true
        }
        super(data, graphModel)
      }
      getConnectedTargetRules() {
        const rules = super.getConnectedTargetRules()
        const notAsTarget = {
          message: '起始节点不能作为连线的终点',
          validate: () => false
        }
        rules.push(notAsTarget)
        return rules
      }
    }
    return {
      view: StartNode,
      model: StartModel
    }
  })
}
