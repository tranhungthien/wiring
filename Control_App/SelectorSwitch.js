class SelectorSwitch extends Placeable {
  constructor(id, x, y) {
    super(x, y, 90, 90);
    // this.height = 220;
    // this.width = 40;
    this.id = id;
    this.flip = false; // 45 degrees
    this.contacts = null;
  }

  rotateSelectorSwitch(x, y, angle) {
    const halfWidth = 9;
    const halfHeight = 35;
    push();

    translate(x, y);
    rotate(radians(angle));

    // Selector Pole
    fill(0);
    beginShape();
    vertex(-halfWidth, halfHeight);
    vertex(halfWidth, halfHeight);
    vertex(halfWidth, -halfHeight);
    vertex(-halfWidth, -halfHeight);
    endShape(CLOSE);

    // Selector Pole indicator
    fill(255);
    beginShape();
    vertex(-4, -30);
    vertex(4, -30);
    vertex(4, -15);
    vertex(-4, -15);
    endShape(CLOSE);

    pop();
  }

  display() {
    if (this.placed) {
      if (this.selected) fill("#F95534");
      else fill(80);
    } else {
      fill(255, 255, 255, 150);
    }
    this.drawModule(this.x, this.y);
  }

  drawModule(x, y) {
    let buttonHeight = 90;
    let buttonWidth = 90;
    //Push button
    stroke(1);
    rectMode(CENTER);

    //Terminals
    //rect(x, y - 45, 45, 45);
    rect(x - 10, y - 50, 15, 15, 5);
    rect(x + 10, y - 50, 15, 15, 5);
    rect(x, y + 50, 15, 15, 5);

    // Lamp
    rect(x, y, buttonHeight, buttonWidth, 5);

    // Lamp terminals
    fill(255);
    circle(x - 10, y - 50, 8);
    circle(x + 10, y - 50, 8);
    circle(x, y + 50, 8);

    // Lamp center
    fill("#155DFC");
    circle(x, y, 70);

    if (this.flip) this.rotateSelectorSwitch(x, y, 315);
    else this.rotateSelectorSwitch(x, y, 45);
    stroke(0);
    noFill();
  }

  assignContacts() {
    this.contacts = [
      // Normally Open
      new SelectorSwitchContact(
        "SC" + this.id + 1,
        new Vertex(this.x - 1 * spacing, this.y - 5 * spacing),
        false,
        false,
        new Vertex(this.x, this.y + 5 * spacing)
      ),
      // Normally Closed
      new SelectorSwitchContact(
        "SC" + this.id + 2,
        new Vertex(this.x + 1 * spacing, this.y - 5 * spacing),
        false,
        true,
        new Vertex(this.x, this.y + 5 * spacing)
      ),
    ];
  }

  getEdge() {
    this.assignContacts();
    return this.contacts;
  }

  setContact(toggle) {
    if (toggle) {
      // 315 degrees
      this.contacts[0].setContact(true);
      this.contacts[1].setContact(false);
    } else {
      // 45 degrees
      this.contacts[0].setContact(false);
      this.contacts[1].setContact(true);
    }
  }

  updateContact() {
    this.flip = !this.flip;
    this.setContact(this.flip);
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
