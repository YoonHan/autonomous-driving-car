class Graph {
  constructor(points = [], segments = []) {
    this.points = points
    this.segments = segments
  }

  static load(info) {
    const points = []
    const segments = []
    for (const pointInfo of info.points) {
      points.push(new Point(pointInfo.x, pointInfo.y))
    }
    for (const segmentInfo of info.segments) {
      segments.push(new Segment(segmentInfo.p1, segmentInfo.p2))
    }
    return new Graph(points, segments)
  }

  addPoint(point) {
    // check if the same point exists
    if (this.containsPoint(point)) {
      return
    }

    this.points.push(point)
  }

  removePoint(point) {
    const segs = this.getSegmentsWithPoint(point)
    for (const seg of segs) {
      this.removeSegment(seg)
    }
    this.points = this.points.filter(p => !p.equals(point))
  }

  addSegment(seg) {
    this.segments.push(seg)
  }

  tryAddSegment(seg) {
    if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)) {
      this.addSegment(seg)
      return true
    }

    return false
  }

  removeSegment(seg) {
    this.segments = this.segments.filter((s) => !s.equals(seg))
  }

  dispose() {
    this.points = []
    this.segments = []
  }

  getSegmentsWithPoint(point) {
    return this.segments.filter(s => s.includes(point))
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
