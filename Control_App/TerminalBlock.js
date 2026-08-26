class TerminalBlock extends Placeable {
  constructor(id, x, y) {
    super(x, y, 190, 20);
    this.id = id;
    // this.height = 190;
    // this.width = 20;
    this.contact = null;
  }

  display() {
    if (this.placed) {
      if (this.selected) fill(155);
      else fill(255);
    } else {
      fill(255, 255, 255, 150);
    }
    this.drawModule();
  }

  drawModule() {
    rectMode(CENTER);
    //Width and Height
    rect(this.x, this.y, 20, 190);
    rect(this.x, this.y, 20, 50);
    rect(this.x, this.y, 20, 2);
    // terminal
    rect(this.x, this.y - 80, 20, 20, 5);
    rect(this.x, this.y + 80, 20, 20, 5);
    // Push in
    fill(255, 204, 0);
    rect(this.x, this.y - 60, 20, 15);
    rect(this.x, this.y - 60, 20, 5);
    rect(this.x, this.y + 60, 20, 15);
    rect(this.x, this.y + 60, 20, 5);
    noFill();
    // Detail
    stroke(200);
    circle(this.x, this.y - 40, 18);
    circle(this.x, this.y - 40, 9);
    rect(this.x, this.y - 12, 15, 15, 4);
    rect(this.x, this.y + 12, 15, 15, 4);
    rect(this.x, this.y + 40, 15, 16);
    stroke(0);
    // top     vertex(x, y-80);
    // bottom  vertex(x, y+80);
    fill(200);
    noStroke();
    circle(this.x, this.y-80, 8);
    circle(this.x, this.y+80, 8);
    stroke(0);
    noFill();
  }

  assignContacts() {
    this.contact = new Edge(
      "TB" + this.id,
      new Vertex(this.x, this.y - 8 * spacing),
      false,
      true,
      new Vertex(this.x, this.y + 8 * spacing)
    );
  }

  getEdge() {
    return this.contact;
  }

  setContact(contact) {
    return;
  }

  updateContact() {
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
