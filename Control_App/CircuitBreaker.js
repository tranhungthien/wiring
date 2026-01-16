class CircuitBreaker extends Placeable {
  constructor(id, x, y) {
    super(x, y, 220, 40);
    this.id = id;
    // this.height = 220;
    // this.width = 40;
    this.flip = false;
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
    stroke(1);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height, 3);
    rect(this.x, this.y, this.width, 130);
    // Shading detail
    stroke(200);
    rect(this.x, this.y, 40, 60);
    // Cover the shading
    stroke(0);
    line(this.x - 20, this.y - 30, this.x - 20, this.y + 30);
    line(this.x + 20, this.y - 30, this.x + 20, this.y + 30);

    fill(110);
    rect(this.x, this.y, 15, 30);
    // CB leaver Down
    if (!this.flip) rect(this.x, this.y + 15, 30, 5);
    // CB leaver Up
    if (this.flip) rect(this.x, this.y - 15, 30, 5);
    fill(255);
    // Terminals
    circle(this.x, this.y - 90, 15);
    circle(this.x, this.y + 90, 15);

    fill(200);
    noStroke();
    circle(this.x, this.y - 90, 6);
    circle(this.x, this.y + 90, 6);
    stroke(0);
    noFill();
    // vertex(x, y+90);
  }

  assignContacts() {
    this.contact = new Edge(
      "CB" + this.id,
      new Vertex(this.x, this.y - 9 * spacing),
      false,
      false,
      new Vertex(this.x, this.y + 9 * spacing)
    );
  }

  getEdge() {
    return this.contact;
  }

  setContact(contact) {
    this.contact.setContact(contact);
  }

  updateContact() {
    this.flip = !this.flip;
    if (this.flip) this.contact.setContact(true);
    else this.contact.setContact(false);
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
