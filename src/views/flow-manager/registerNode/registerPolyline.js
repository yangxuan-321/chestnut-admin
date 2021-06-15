export default function registerPolyline(lf) {
  lf.register('polyline', ({ PolylineEdge, PolylineEdgeModel }) => {
    class ConnnectionModel extends PolylineEdgeModel {
      // eslint-disable-next-line no-useless-constructor
      constructor(data, graphModel) {
        super(data, graphModel)
      }
    }
    return {
      view: PolylineEdge,
      model: ConnnectionModel
    }
  })
}
