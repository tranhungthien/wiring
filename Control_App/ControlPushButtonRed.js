class ControlPushButtonRed extends Placeable {
  constructor(id, x, y) {
    super(x, y, 90, 90);
    this.stopPushButton = null;
    this.pushed = false;
    this.id = id;
    this.x = x;
    this.y = y;
  }

  setButtonContact(contact) {
    this.stopPushButton.setContact(contact);
  }

  setButtonPushed(pressure) {
    this.pushed = pressure;
  }

  getPushButton() {
    return this.stopPushButton;
  }

  assignContacts() {
    this.stopPushButton = new StopPushButton(
      "BR" + this.id,
      new Vertex(this.x - 10, this.y - 50),
      false,
      true,
      new Vertex(this.x + 10, this.y - 50)
    );
  }

  display() {
    if (this.placed) {
      if (this.selected) fill(255);
      else fill(80);
    } else {
      fill(80, 80, 80, 150);
    }

    let buttonHeight = 90;
    let buttonWidth = 90;

    stroke(1);
    rectMode(CENTER);

    //Terminals
    rect(this.x - 10, this.y - 50, 15, 15, 5);
    rect(this.x + 10, this.y - 50, 15, 15, 5);

    // Button
    //rect(this.x, this.y, buttonHeight, buttonWidth, 5);
    circle(this.x, this.y, 90);
    circle(this.x, this.y, 80);
    fill(this.pushed ? color(90, 0, 0) : color(153, 0, 0));
    circle(this.x, this.y, 70);

    fill(255);
    circle(this.x - 10, this.y - 50, 8);
    circle(this.x + 10, this.y - 50, 8);

    stroke(0);
    noFill();
  }

  isMouseOver(mx, my) {
    const r = 35;
    const distance = dist(mx, my, this.x, this.y);
    return distance <= r;
  }
}
