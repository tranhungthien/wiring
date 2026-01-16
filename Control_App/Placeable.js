class Placeable {
  constructor(x, y, height, width) {
    this.selected = false;
    this.height = height;
    this.placed = false;
    this.width = width;
    this.x = x;
    this.y = y;
  }

  update(x, y) {
    if (!this.placed) {
      this.x = x;
      this.y = y;
    }
  }

  setSelected() {
    this.selected = true;
  }

  isSelected() {
    return this.selected;
  }

  isPlaced() {
    return this.placed;
  }

  isColliding(component) {
    return !(
      this.x + this.width / 2 <= component.x - component.width / 2 ||
      this.x - this.width / 2 >= component.x + component.width / 2 ||
      this.y + this.height / 2 <= component.y - component.height / 2 ||
      this.y - this.height / 2 >= component.y + component.height / 2
    );
  }

  toggleSelection() {
    this.selected = !this.selected;
  }

  snapToGrid() {
    this.x = relativeCoordinates().x;
    this.y = relativeCoordinates().y;
    this.placed = true;
  }
}
