class Graph {
  constructor(points = [], segments = []) {
    this.points = points
    this.segments = segments
  }

  addPoint(point) {
    // check if the same point exists
    if (this.containsPoint(point)) {
      return
    }

    this.points.push(point)
  }

  addSegment(seg) {
    this.segments.push(seg)
  }

  tryAddSegment(seg) {
    if (!this.containsSegment(seg)) {
      this.addSegment(seg)
      return true
    }

    return false
  }

  containsPoint(point) {
    return this.points.find(p => p.equals(point))
  }

  containsSegment(seg) {
    return this.segments.find((s) => s.equals(seg))
  }

  draw(ctx) {
    /** Draw segments first */
    for (const seg of this.segments) {
      seg.draw(ctx)
    }

    /** then draw points later (for overlapping segments) */
    for (const point of this.points) {
      point.draw(ctx)
    }
  }
}
