class Wire extends Edge {
  constructor(id, wire) {
    // Wire contact is assumed to be true.
    // Change to simulate open circuit
    super(id, wire[0], false, true, wire[wire.length - 1]);
    this.selected = false;
    this.wire = wire;
  }

  display() {
    if (this.wire.length < 2) return;
    // Red if selected, otherwise black
    stroke(this.selected ? color(255, 0, 0) : color(0));
    fill(this.selected ? color(255, 0, 0) : color(0));
    for (let i = 1; i < this.wire.length; i++) {
      const p1 = this.wire[i - 1];
      const p2 = this.wire[i];
      line(p1.x, p1.y, p2.x, p2.y);
    }
    const l = this.wire.length - 1;
    circle(this.wire[0].x, this.wire[0].y, 5);
    circle(this.wire[l].x, this.wire[l].y, 5);
    noFill();
  }

  select() {
    if (this.wire.length < 2) return;
    for (let i = 1; i < this.wire.length; i++) {
      const x = relativeCoordinates().x;
      const y = relativeCoordinates().y;
      const p1 = this.wire[i - 1];
      const p2 = this.wire[i];
      
      const d = distToSegment(
        createVector(x, y),
        createVector(p1.x, p1.y),
        createVector(p2.x, p2.y)
      );
      // Threshold for selection
      if (d < 5) {
        this.selected = true;
        return;
      }
    }
    this.selected = false;
  }

  deselectSegment() {
    this.selected = false;
  }

  isSelected() {
    return this.selected;
  }

  remove() {
    this.selected = false;
    this.wire = [];
  }
}

// Distance from a point to a line segment
function distToSegment(p, v, w) {
  const l2 = p5.Vector.dist(v, w) ** 2;
  if (l2 === 0) return p5.Vector.dist(p, v);
  const t = max(0, min(1, p5.Vector.sub(p, v).dot(p5.Vector.sub(w, v)) / l2));
  const projection = p5.Vector.add(v, p5.Vector.mult(p5.Vector.sub(w, v), t));
  return p5.Vector.dist(p, projection);
}
