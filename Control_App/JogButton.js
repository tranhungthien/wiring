class JogButton extends Placeable {
  constructor(id, x, y) {
    super(x, y, 90, 90);
    this.contacts = null;
    this.pushed = false;
    this.id = id;
    this.x = x;
    this.y = y;
  }

  setButtonContact(isPushed) {
    if (isPushed) {
      this.contacts[0].contact = true;
      this.contacts[1].contact = false;
    } else {
      this.contacts[0].contact = false;
      this.contacts[1].contact = true;
    }
  }

  setButtonPushed(pressure) {
    this.pushed = pressure;
  }

  getPushButton() {
    this.assignContacts();
    return this.contacts;
  }

  assignContacts() {
    this.contacts = [
      // Normally Open
      new JogButtonContact(
        "JG" + this.id + 1,
        new Vertex(this.x - 1 * spacing, this.y - 5 * spacing),
        false,
        false,
        new Vertex(this.x + 1 * spacing, this.y - 5 * spacing)
      ),
      // Normally Closed
      new JogButtonContact(
        "JG" + this.id + 2,
        new Vertex(this.x - 1 * spacing, this.y + 5 * spacing),
        false,
        true,
        new Vertex(this.x + 1 * spacing, this.y + 5 * spacing)
      ),
    ];
  }

  display() {
    if (this.placed) {
      if (this.selected) fill("#F95534");
      else fill(80);
    } else {
      fill(80, 80, 80, 150);
    }

    let buttonHeight = 90;
    let buttonWidth = 90;

    stroke(1);
    rectMode(CENTER);

    //Top Terminals
    //rect(x, y - 45, 45, 45);
    rect(this.x - 10, this.y - 50, 15, 15, 5);
    rect(this.x + 10, this.y - 50, 15, 15, 5);

    //Bottom terminals
    rect(this.x - 10, this.y + 50, 15, 15, 5);
    rect(this.x + 10, this.y + 50, 15, 15, 5);

    //Button
    //rect(this.x, this.y, buttonHeight, buttonWidth, 5);
    circle(this.x, this.y, 90);
    circle(this.x, this.y, 80);
    if (this.isPlaced) {
      fill(this.pushed ? color(204, 204, 0) : color(255, 255, 0));
    }
    circle(this.x, this.y, 70);

    fill(255);
    // top terminals
    circle(this.x - 10, this.y - 50, 8);
    circle(this.x + 10, this.y - 50, 8);

    // bottom terminals
    circle(this.x - 10, this.y + 50, 8);
    circle(this.x + 10, this.y + 50, 8);

    stroke(0);
    noFill();
  }
  
  isMouseOver(mx, my) {
    const r = 35;
    const distance = dist(mx, my, this.x, this.y);
    return distance <= r;
  }
}
