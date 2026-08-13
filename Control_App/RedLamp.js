class RedLamp extends Placeable {
  constructor(id, colour, x, y) {
    super(x, y, 90, 90);
    this.colour = colour;
    this.lamp = null;
    this.id = id;
  }

  display() {
    if (this.placed) {
      if (this.selected) fill(255);
      else fill(80);
    } else {
      fill(80, 80, 80, 150);
    }
    this.drawModule();
  }

  drawModule() {
    let buttonHeight = 90;
    let buttonWidth = 90;
    //Push button
    stroke(1);
    rectMode(CENTER);

    //Terminals
    //rect(x, y - 45, 45, 45);
    rect(this.x - 10, this.y - 50, 15, 15, 5);
    rect(this.x + 10, this.y - 50, 15, 15, 5);

    // Lamp
    rect(this.x, this.y, buttonHeight, buttonWidth, 5);

    // Lamp terminals
    fill(255);
    circle(this.x - 10, this.y - 50, 8);
    circle(this.x + 10, this.y - 50, 8);

    // Lamp center
    fill(this.colour == "Green" ? color(0, 153, 51) : color(153, 0, 0));
    stroke(this.colour == "Green" ? color(0, 102, 0) : color(102, 0, 0));
    circle(this.x, this.y, 80);
    if (this.placed) {
      if (this.colour == "Green")
        fill(this.lamp.getState() ? color(0, 255, 0) : color(0, 153, 51));
      else fill(this.lamp.getState() ? color(255, 0, 0) : color(153, 0, 0));
    }
    circle(this.x, this.y, 70);
    stroke(0);
    noFill();
  }

  assignContacts() {
    this.lamp = new Lamp(
      "L" + this.id,
      new Vertex(this.x - 1 * spacing, this.y - 5 * spacing),
      false,
      true, // always closed
      new Vertex(this.x + 1 * spacing, this.y - 5 * spacing)
    );
  }

  getLamp() {
    return this.lamp;
  }

  isMouseOver(mx, my) {
    return (
      mx > this.x - this.width / 2 &&
      mx < this.x + this.width / 2 &&
      my > this.y - this.height / 2 &&
      my < this.y + this.height / 2
    );
  }
}
