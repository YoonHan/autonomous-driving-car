const MOUSE_EVENT_LEFT_BUTTON_CODE = 0
const MOUSE_EVENT_RIGHT_BUTTON_CODE = 2
class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas
    this.graph = graph
    this.selectedPoint = null
    this.hoveredPoint = null
    this.currentPoint = null
    this.isDragging = false

    this.ctx = this.canvas.getContext('2d')

    this.#addEventListeners()
  }

  #addEventListeners() {
    this.canvas.addEventListener('mouseup', this.#handleMouseUp.bind(this))
    this.canvas.addEventListener('mousedown', this.#handleMouseDown.bind(this))
    this.canvas.addEventListener('mousemove', this.#handleMouseMove.bind(this))
    this.canvas.addEventListener('contextmenu', ($event) => {
      $event.preventDefault()
    })

    window.addEventListener('keydown', this.#handleKeyDown.bind(this))
  }

  #handleMouseUp() {
    this.isDragging = false
  }

  #handleMouseDown($event) {
    if ($event.button === MOUSE_EVENT_RIGHT_BUTTON_CODE) {
      if (this.selectedPoint) {
        this.selectedPoint = null
      } else if (this.hoveredPoint) {
        this.#removePoint(this.hoveredPoint)
      }
    } else if ($event.button === MOUSE_EVENT_LEFT_BUTTON_CODE) {
      if (this.hoveredPoint) {
        this.#select(this.hoveredPoint)
        this.isDragging = true
        return
      }

      this.graph.addPoint(this.currentPoint)
      this.#select(this.currentPoint)
      this.hoveredPoint = this.currentPoint
    }
  }

  #handleMouseMove($event) {
    const { offsetX, offsetY } = $event
    this.currentPoint = new Point(offsetX, offsetY)
    this.hoveredPoint = getNearestPoint(this.currentPoint, this.graph.points, 20)

    if (this.isDragging) {
      this.selectedPoint.x = this.currentPoint.x
      this.selectedPoint.y = this.currentPoint.y
    }
  }

  #handleKeyDown($event) {
    if ($event.code === 'Escape') {
      this.selectedPoint = null
    }
  }

  #select(point) {
    if (this.selectedPoint) {
      this.graph.tryAddSegment(new Segment(this.selectedPoint, point))
    }
    this.selectedPoint = point
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
    this.drawCircleInPoint()
  }

  drawCircleInPoint() {
    if (this.selectedPoint) {
      const intent = this.hoveredPoint ? this.hoveredPoint : this.currentPoint
      this.selectedPoint.draw(this.ctx, { outline: true })
      new Segment(this.selectedPoint, intent).draw(this.ctx, { dash: [3, 3] })
    }

    if (this.hoveredPoint) {
      this.hoveredPoint.draw(this.ctx, { fill: true })
    }
  }
}
