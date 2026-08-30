class ThermalOverLoad extends Placeable {
  constructor(id, x, y) {
    super(x, y, 50, 160);
    this.id = id;
    // this.height = 50;
    // this.width = 160;
    // this.flip = false;
    this.contacts = null;
  }

  display() {
    if (this.placed) {
      if (this.selected) fill("#F95534");
      else fill(255);
    } else {
      fill(255, 255, 255, 150);
    }
    this.drawModule(this.x, this.y, this.width, this.height);
  }

  drawModule(x, y, width, height) {
    //==============================================
    //                 EDGES
    // Main 3 phase terminal A:
    // (x - 60, y - 130) to (x - 20, y + 30)
    // Main 3 phase terminal B:
    //
    //==============================================
    stroke(1);
    rectMode(CENTER);
    const innerHeightOffset = 16;
    rect(x, y, width, height - innerHeightOffset);
    rect(x, y - 30, width, 30);
    rect(x - 15, y - 45, 130, 60);
    rect(x + 20, y + 30, 120, 26);

    //Middle Terminals
    fill(255);
    const terminalOffsetMiddle = 0;
    circle(x - 60, y - terminalOffsetMiddle, 20);
    circle(x - 20, y - terminalOffsetMiddle, 20);
    circle(x + 20, y - terminalOffsetMiddle, 20);
    circle(x + 60, y - terminalOffsetMiddle, 20);
    circle(x - 60, y - terminalOffsetMiddle, 18);
    circle(x - 20, y - terminalOffsetMiddle, 18);
    circle(x + 20, y - terminalOffsetMiddle, 18);
    circle(x + 60, y - terminalOffsetMiddle, 18);

    //Inner Circles
    noStroke();
    fill(200);
    circle(x - 60, y - terminalOffsetMiddle, 8);
    circle(x - 20, y - terminalOffsetMiddle, 8);
    circle(x + 20, y - terminalOffsetMiddle, 8);
    circle(x + 60, y - terminalOffsetMiddle, 8);

    fill(0);
    textSize(6);
    text("NO", x - 50, y + 15);
    text("NO", x - 10, y + 15);
    text("NC", x + 30, y + 15);
    text("NC", x + 70, y + 15);
    stroke(0);

    //Bottom Terminals
    const terminalOffsetBottom = 30;
    fill(255);
    circle(x - 20, y + terminalOffsetBottom, 20);
    circle(x + 20, y + terminalOffsetBottom, 20);
    circle(x + 60, y + terminalOffsetBottom, 20);
    circle(x - 20, y + terminalOffsetBottom, 18);
    circle(x + 20, y + terminalOffsetBottom, 18);
    circle(x + 60, y + terminalOffsetBottom, 18);

    //Bottom Inner Circles
    noStroke();
    fill(200);
    circle(x - 20, y + terminalOffsetBottom, 8);
    circle(x + 20, y + terminalOffsetBottom, 8);
    circle(x + 60, y + terminalOffsetBottom, 8);
    stroke(0);
    noFill();

    //Bottom terminal sperators
    fill(0);
    rect(x, y + terminalOffsetBottom + 8, 8, 40);
    rect(x - 38, y + terminalOffsetBottom + 8, 5, 40);
    rect(x + 40, y + terminalOffsetBottom + 8, 8, 40);
    rect(x + 78, y + terminalOffsetBottom + 8, 5, 40);

    //Top terminals
    const terminalOffsetTop = 130;
    circle(x - 60, y - terminalOffsetTop, 8);
    circle(x - 20, y - terminalOffsetTop, 8);
    circle(x + 20, y - terminalOffsetTop, 8);

    rect(x - 60, y - 103, 5, 55);
    rect(x - 20, y - 103, 5, 55);
    rect(x + 20, y - 103, 5, 55);

    fill(255);

    circle(x - 60, y - terminalOffsetTop, 5);
    circle(x - 20, y - terminalOffsetTop, 5);
    circle(x + 20, y - terminalOffsetTop, 5);

    //TOL setting
    rect(x - 30, y - 40, 100, 50);
    circle(x, y - 40, 20);
    rect(x, y - 40, 4, 10);
    rect(x, y - 40, 10, 4);
    noStroke();
    rect(x, y - 40, 5, 5);
    stroke(0);

    //TOL Test and reset
    fill("red");
    rect(x + 35, y - 30, 20, 20);
    fill("black");
    rect(x + 65, y - 30, 20, 20);
    fill(255);
  }

  assignContacts() {
    this.contacts = [
      new ThermalOverLoadContact(
        // Control Normally Open
        "OC" + this.id + 1,
        new Vertex(this.x - 60, this.y),
        true,
        false,
        new Vertex(this.x - 20, this.y)
      ),
      new ThermalOverLoadContact(
        // Control Normally Closed
        "OC" + this.id + 2,
        new Vertex(this.x + 20, this.y),
        true,
        true,
        new Vertex(this.x + 60, this.y)
      ),
      new ThermalOverLoadContact(
        // Power L1
        "OC" + this.id + 3,
        new Vertex(this.x - 60, this.y - 13 * spacing),
        true,
        true,
        new Vertex(this.x - 20, this.y + 3 * spacing)
      ),
      new ThermalOverLoadContact(
        // Power L2
        "OC" + this.id + 4,
        new Vertex(this.x - 20, this.y - 13 * spacing),
        true,
        true,
        new Vertex(this.x + 20, this.y + 3 * spacing)
      ),
      new ThermalOverLoadContact(
        // Power L3
        "OC" + this.id + 5,
        new Vertex(this.x + 20, this.y - 13 * spacing),
        true,
        true,
        new Vertex(this.x + 60, this.y + 3 * spacing)
      ),
    ];
  }

  getID() {
    return this.id;
  }

  getEdges() {
    this.assignContacts();
    return this.contacts;
  }

  updateContacts() {
    // TODO: simulate an overload
    return;
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
