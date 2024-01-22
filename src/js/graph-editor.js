class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas
    this.graph = graph
    this.selectedPoint = null
    this.hoveredPoint = null

    this.ctx = this.canvas.getContext('2d')

    this.#addEventListeners()
  }

  #addEventListeners() {
    this.canvas.addEventListener('mousedown', ($event) => {
      const { offsetX, offsetY } = $event
      const clickedPoint = new Point(offsetX, offsetY)

      this.nearestPoint = getNearestPoint(clickedPoint, this.graph.points, 20)
      if (this.nearestPoint) {
        this.selectedPoint = this.nearestPoint
        return
      }

      this.graph.addPoint(clickedPoint)
      this.selectedPoint = clickedPoint
    })

  }

  display() {
    this.graph.draw(this.ctx)
    this.drawSelectedCircle()
  }

  drawSelectedCircle() {
    if (!this.selectedPoint) {
      return
    }

    this.selectedPoint.draw(this.ctx, { outline: true })
  }

}
