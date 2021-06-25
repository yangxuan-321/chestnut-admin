export default function registerAuto(lf) {
  lf.register('auto', ({ RectNode, RectNodeModel, h }) => {
    class Node extends RectNode {
      getShape() {
        // 通过 getAttributes 获取 model 中的属性
        const { x, y, width, height, fill, stroke, strokeWidth } = this.getAttributes()
        const attrs = {
          // rect 标签的 x，y 对应的是图形的左上角
          // 所以我们要将矩形的中心移动到 x，y
          x: x - width / 2,
          y: y - height / 2,
          width,
          height,
          stroke,
          fill,
          strokeWidth
        }
        // getShape 的返回值是一个通过 h 方法创建的 svg 元素
        return h(
          'g',
          {},
          [
            h('rect', { ...attrs }),
            h(
              'svg',
              {
                x: x - width / 2 + 5,
                y: y - height / 2 + 5,
                width: 25,
                height: 25,
                viewBox: '0 0 1274 1024',
                radius: 6
              },
              h(
                'path',
                {
                  fill: stroke,
                  d: 'M462.933333 539.733333h98.133334L512 384l-49.066667 155.733333zM853.333333 370.773333V170.666667h-200.106666L512 29.44 370.773333 170.666667H170.666667v200.106666L29.44 512 170.666667 653.226667V853.333333h200.106666L512 994.56 653.226667 853.333333H853.333333v-200.106666L994.56 512 853.333333 370.773333zM610.133333 682.666667l-29.866666-85.333334h-136.533334l-29.866666 85.333334H332.8L469.333333 298.666667h85.333334l136.533333 384h-81.066667z'
                }
              )
            )
          ]
        )
      }
    }
    class Model extends RectNodeModel {
      constructor(data, graphModel) {
        super(data, graphModel)
        this.radius = 20
      }
    }
    return {
      view: Node,
      model: Model
    }
  })
}
