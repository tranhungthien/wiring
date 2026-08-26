class Movable {
  constructor(x, y, height, width) {
    this.selected = false;

    this.height = height;
    this.width = width;

    this.x = x;
    this.y = y;

    // Dragging
    this.dragging = false;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
  }

  update(x, y) {
    this.x = x;
    this.y = y;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  getPosition() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  setSelected() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }

  isSelected() {
    return this.selected;
  }

  toggleSelection() {
    this.selected = !this.selected;
  }

  startDragging(mouseX, mouseY) {
    this.dragging = true;

    // Preserve where on the object the user grabbed it.
    this.dragOffsetX = this.x - mouseX;
    this.dragOffsetY = this.y - mouseY;
  }

  drag(mouseX, mouseY) {
    if (!this.dragging) {
      return;
    }

    this.x = mouseX + this.dragOffsetX;
    this.y = mouseY + this.dragOffsetY;
  }

  stopDragging() {
    this.dragging = false;
  }

  isDragging() {
    return this.dragging;
  }

  isColliding(component) {
    return !(
      this.x + this.width / 2 <= component.x - component.width / 2 ||
      this.x - this.width / 2 >= component.x + component.width / 2 ||
      this.y + this.height / 2 <= component.y - component.height / 2 ||
      this.y - this.height / 2 >= component.y + component.height / 2
    );
  }
}
