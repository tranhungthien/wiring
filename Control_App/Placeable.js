class Placeable extends Movable {
  constructor(x, y, height, width) {
    super(x, y, height, width);
    this.placed = false;
  }

  update(x, y) {
    if (!this.placed) {
      super.update(x, y);
    }
  }

  isPlaced() {
    return this.placed;
  }

  snapToGrid() {
    this.x = relativeCoordinates().x;
    this.y = relativeCoordinates().y;
    this.placed = true;
  }
}
