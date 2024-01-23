class Viewport {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')

    this.zoom = 1
    this.offset = new Point(0, 0)

    this.drag = this.getInitialDragInfo()

    this.#addEventListeners()
  }

  getMouse($event) {
    return new Point(
      $event.offsetX * this.zoom,
      $event.offsetY * this.zoom
    )
  }

  getInitialDragInfo() {
    return {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false
    }
  }

  getOffset() {
    return add(this.offset, this.drag.offset)
  }

  #addEventListeners() {
    this.canvas.addEventListener('mousewheel', this.#handleMouseWheel.bind(this))
    this.canvas.addEventListener('mousemove', this.#handleMouseMove.bind(this))
    this.canvas.addEventListener('mouseup', this.#handleMouseUp.bind(this))
    this.canvas.addEventListener('mousedown', this.#handleMouseDown.bind(this))
  }


  #handleMouseMove($event) {
    if (this.drag.active) {
      this.drag.end = this.getMouse($event)
      this.drag.offset = subtract(this.drag.end, this.drag.start)
    }
  }

  #handleMouseUp() {
    if (this.drag.active) {
      this.drag.active = false
      this.offset = this.getOffset()
      this.drag = this.getInitialDragInfo()
    }
  }

  #handleMouseDown($event) {
    if ($event.button === 1) { // middle button
      this.drag.start = this.getMouse($event)
      this.drag.active = true
    }
  }

  #handleMouseWheel($event) {
    const direction = Math.sign($event.deltaY)
    const step = 0.1
    this.zoom += direction * step
    this.zoom = Math.max(1, Math.min(5, this.zoom))
  }
}
