class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas
    this.graph = graph

    this.ctx = this.canvas.getContext('2d')

    this.#addEventListeners()
  }

  #addEventListeners() {
    this.canvas.addEventListener('mousedown', ($event) => {
      const { offsetX, offsetY } = $event
      const clickedPoint = new Point(offsetX, offsetY)
      this.graph.addPoint(clickedPoint)
    })
  }

  display() {
    this.graph.draw(this.ctx)
  }
}
