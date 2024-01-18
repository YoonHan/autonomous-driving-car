class Graph {
  constructor(points = [], segments = []) {
    this.points = points
    this.segments = segments
  }

  draw(ctx) {
    /** Draw segments first */
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    /** then draw points later (for overlapping segments) */
    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}
