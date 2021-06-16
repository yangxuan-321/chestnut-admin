export default function registerSwitch(lf) {
  lf.register('switch', ({ PolygonNode, PolygonNodeModel, h }) => {
    class Node extends PolygonNode {
      getIconShape() {
        const attributes = this.getAttributes()
        const {
          stroke
        } = attributes
        return h(
          'svg',
          {
            x: 20,
            y: 18,
            width: 30,
            height: 30,
            viewBox: '0 0 1126 1024'
          },
          h(
            'path',
            {
              fill: stroke,
              d: 'M896.035413 128a128 128 0 1 0-164.010666 122.88V378.453333l-220.288 220.16-220.202667-220.16V251.008A128.042667 128.042667 0 0 0 256.035413 0a128 128 0 0 0-36.48 250.709333v156.885334l-0.298666 0.298666 256.768 256.810667v108.373333A128.085333 128.085333 0 0 0 512.035413 1024a128 128 0 0 0 36.010667-250.88v-108.928L804.30208 407.893333l-0.298667-0.298666V250.88A128.085333 128.085333 0 0 0 896.035413 128zM200.01408 128a56.021333 56.021333 0 1 1 112.085333 0.085333A56.021333 56.021333 0 0 1 200.01408 128z m368.042667 768a56.021333 56.021333 0 1 1-112.085334-0.085333 56.021333 56.021333 0 0 1 112.085334 0.085333zM768.035413 183.978667a56.021333 56.021333 0 1 1 0.085334-112.042667A56.021333 56.021333 0 0 1 768.035413 184.021333z'
            }
          )
        )
      }
      getShape() {
        const attributes = this.getAttributes()
        const {
          width,
          height,
          x,
          y,
          fill,
          fillOpacity,
          strokeWidth,
          stroke,
          strokeOpacity,
          points
        } = attributes
        const transform = `matrix(1 0 0 1 ${x - width / 2} ${y - height / 2})`
        const pointsPath = points.map(point => point.join(',')).join(' ')
        return h(
          'g',
          {
            transform
          },
          [
            h(
              'polygon',
              {
                points: pointsPath,
                fill,
                stroke,
                strokeWidth,
                strokeOpacity,
                fillOpacity
              }
            ),
            this.getIconShape()
          ]
        )
      }
    }
    class Model extends PolygonNodeModel {
      constructor(data, graphModel) {
        data.text = {
          value: (data.text && data.text.value) || '',
          x: data.x,
          y: data.y + 50
        }
        super(data, graphModel)
        const length = 35
        this.points = [
          [length, 0],
          [length * 2, length],
          [length, length * 2],
          [0, length]
        ]
        // 右键菜单自由配置，也可以通过边的properties或者其他属性条件更换不同菜单
        this.menu = [
          {
            className: 'lf-menu-delete',
            text: '删除',
            callback(node) {
              // const comfirm = window.confirm('你确定要删除吗？')
              lf.deleteNode(node.id)
            }
          },
          {
            text: '编辑',
            className: 'lf-menu-item',
            callback(node) {
              lf.editNodeText(node.id)
            }
          },
          {
            text: '复制',
            className: 'lf-menu-item',
            callback(node) {
              lf.cloneNode(node.id)
            }
          }
        ]
      }
    }
    return {
      view: Node,
      model: Model
    }
  })
}
