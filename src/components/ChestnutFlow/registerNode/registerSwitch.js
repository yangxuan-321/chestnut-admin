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
            x: 21,
            y: 21,
            width: 25,
            height: 25,
            viewBox: '0 0 1126 1024'
          },
          h(
            'path',
            {
              fill: stroke,
              d: 'M536.576 251.904h234.496v99.328c14.336 13.824 33.28 13.824 47.104 0l179.712-116.736c14.336-9.216 14.336-28.16 0-41.984l-179.712-121.344c-14.336-13.824-33.28-13.824-47.104 0V158.72h-281.6l-189.44 326.656h-189.44v0.512h-48.128C38.912 485.888 15.36 509.44 15.36 532.48c0 23.552 23.552 46.592 47.104 46.592h283.648v-0.512h1.024l189.44-326.656z m281.6 420.864c-14.336-13.824-33.28-13.824-47.104 0v92.672h-139.776l-141.824-233.472-47.104 93.184s132.608 219.648 141.824 233.472h187.392v94.208c14.336 13.824 33.28 13.824 47.104 0l179.712-116.736c14.336-9.216 14.336-28.16 0-41.984l-180.224-121.344z m0 0'
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
