class Ground extends Earthing(Component(Rotatable(Draggable(Placeable)))) {
  draw() {
    let b = color(0, 0, 0);
    noStroke();
    rectMode(CENTER);
    strokeCap(SQUARE);
    this.updateRotation();
    if (!this.isPlaced) {
      this.c.x = relativeCoordinates().x; //snap(mouseX);
      this.c.y = relativeCoordinates().y; //snap(mouseY);
      b.setAlpha(50);
    }
    stroke(b);
    this.drawDetails();
    if (this.isPlaced) {
      if (this.selected == this.c) {
        stroke(255, 128, 128);
        this.drawDetails();
      }
      if (this.selected == this.u) {
        stroke(0, 161, 241);
        strokeWeight(2);
        square(this.u.x, this.u.y, 10);
      }
      if (this.selected == this.v) {
        stroke(130, 183, 75);
        //fill(130, 183, 75);
        strokeWeight(2);
        square(this.v.x, this.v.y, 10);
      }
    }
  }

  drawDetails() {
    const boarderWeight = 2;
    const wireWeight = 4;
    const x = this.c.x;
    const y = this.c.y;

    rectMode(CENTER);
    strokeWeight(wireWeight);

    strokeCap(SQUARE);
    line(x, y - 10, x, y - 35.5);
    strokeWeight(boarderWeight);

    line(x - 25, y - 10, x + 25, y - 10);
    line(x - 12.5, y, x + 12.5, y);
    line(x - 5, y + 10, x + 5, y + 10);
    noFill();

    strokeWeight(0.5);
    rect(x, y - 40, 10);

    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(18);

    noFill();
  }
}
