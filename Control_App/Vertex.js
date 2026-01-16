class Vertex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(vertex) {
    return this.x === vertex.x && this.y === vertex.y;
  }
}
