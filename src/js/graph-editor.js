const MOUSE_EVENT_LEFT_BUTTON_CODE = 0
const MOUSE_EVENT_RIGHT_BUTTON_CODE = 2
class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas
    this.graph = graph
    this.selectedPoint = null
    this.hoveredPoint = null
    this.isDragging = false

    this.ctx = this.canvas.getContext('2d')

    this.#addEventListeners()
  }

  #addEventListeners() {
    this.canvas.addEventListener('mouseup', () => {
      this.isDragging = false
    })

    this.canvas.addEventListener('mousedown', ($event) => {
      const { offsetX, offsetY, button } = $event
      const clickedPoint = new Point(offsetX, offsetY)

      if (button === MOUSE_EVENT_RIGHT_BUTTON_CODE) {
        if (this.hoveredPoint) {
          this.#removePoint(this.hoveredPoint)
          return
        }
      }

      if (button === MOUSE_EVENT_LEFT_BUTTON_CODE) {
        if (this.hoveredPoint) {
          this.selectedPoint = this.hoveredPoint
          this.isDragging = true
          return
        }

        this.graph.addPoint(clickedPoint)
        this.selectedPoint = clickedPoint
        this.hoveredPoint = clickedPoint
      }
    })


    this.canvas.addEventListener('mousemove', ($event) => {
      const { offsetX, offsetY } = $event
      const currentPoint = new Point(offsetX, offsetY)

      this.hoveredPoint = getNearestPoint(currentPoint, this.graph.points, 20)

      if (this.isDragging) {
        this.selectedPoint.x = offsetX
        this.selectedPoint.y = offsetY
      }
    })

    this.canvas.addEventListener('contextmenu', ($event) => {
      $event.preventDefault()
    })
  }

  #removePoint(point) {
    this.graph.removePoint(point)
    this.hoveredPoint = null

    /** remove selected point only when selected point is the same point as target point */
    if (this.selectedPoint == point) {
      this.selectedPoint = null
    }
  }

  display() {
    this.graph.draw(this.ctx)
    this.drawSelectedCircle()
  }

  drawSelectedCircle() {
    if (this.selectedPoint) {
      this.selectedPoint.draw(this.ctx, { outline: true })
    }

    if (this.hoveredPoint) {
      this.hoveredPoint.draw(this.ctx, { fill: true })
    }
  }
}
