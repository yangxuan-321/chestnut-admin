export default function registerWait(lf) {
  lf.register('wait', ({ CircleNode, CircleNodeModel, h }) => {
    class EndNode extends CircleNode {
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
            x: x - 13,
            y: y - 13,
            width: 26,
            height: 26,
            viewBox: '0 0 1024 1024'
          },
          h(
            'path',
            {
              fill: stroke,
              d: 'M896 846.592v98.688A77.8624 77.8624 0 0 1 819.2 1024H204.8a77.8624 77.8624 0 0 1-76.8-78.72v-98.688a279.744 279.744 0 0 1 69.12-184.576l131.712-149.888L197.12 361.984A279.4112 279.4112 0 0 1 128 177.408V78.72A77.8624 77.8624 0 0 1 204.8 0h614.4a77.8624 77.8624 0 0 1 76.8 78.72v98.688a279.6672 279.6672 0 0 1-69.12 184.576L695.04 512.128l131.84 149.888A279.6672 279.6672 0 0 1 896 846.592z m-255.36-41.984h-257.28a36.544 36.544 0 0 0 0 73.088h257.28a36.544 36.544 0 0 0 0-73.088z'
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
    class EndModel extends CircleNodeModel {
      constructor(data, graphModel) {
        data.text = {
          value: (data.text && data.text.value) || '',
          x: data.x,
          y: data.y + 35
        }
        super(data, graphModel)
      }
      getConnectedSourceRules() {
        const rules = super.getConnectedSourceRules()
        const notAsTarget = {
          message: '终止节点不能作为连线的起点',
          validate: () => false
        }
        rules.push(notAsTarget)
        return rules
      }
    }
    return {
      view: EndNode,
      model: EndModel
    }
  })
}
