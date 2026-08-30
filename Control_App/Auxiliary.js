class Auxiliary extends Placeable {
  constructor(id, x, y) {
    super(x, y, 110, 160);
    this.relayCoil = null;
    this.contactor = null;
    this.contacts = null;
    // this.height = 210;
    // this.width = 110;
    this.id = id;
  }

  display() {
    if (this.placed) {
      if (this.selected) fill("#F95534");
      else fill(245, 245, 245, 255);
    } else {
      fill(245, 245, 245, 80);
    }
    this.drawModule(this.x, this.y, this.width, this.height);
  }

  drawModule(x, y, width, height) {
    stroke(1);
    rectMode(CENTER);
    const innerHeightOffset = 16;
    //rect(x, y, width, height);
    rect(x, y, width, height - innerHeightOffset);

    //Top Terminals
    fill(255);
    const terminalOffsetTop = 30;
    circle(x - 60, y - terminalOffsetTop, 20);
    circle(x - 20, y - terminalOffsetTop, 20);
    circle(x + 20, y - terminalOffsetTop, 20);
    circle(x + 60, y - terminalOffsetTop, 20);
    circle(x - 60, y - terminalOffsetTop, 18);
    circle(x - 20, y - terminalOffsetTop, 18);
    circle(x + 20, y - terminalOffsetTop, 18);
    circle(x + 60, y - terminalOffsetTop, 18);
    //Inner Circles
    noStroke();
    fill(200);
    circle(x - 60, y - terminalOffsetTop, 8);
    circle(x - 20, y - terminalOffsetTop, 8);
    circle(x + 20, y - terminalOffsetTop, 8);
    circle(x + 60, y - terminalOffsetTop, 8);

    fill(0);
    textSize(6);
    text("NO", x - 50, y - terminalOffsetTop - 10);
    text("NC", x - 10, y - terminalOffsetTop - 10);
    text("NC", x + 30, y - terminalOffsetTop - 10);
    text("NO", x + 70, y - terminalOffsetTop - 10);
    stroke(0);
    //Bottom Terminals
    const terminalOffsetBottom = 30;
    fill(255);
    circle(x - 60, y + terminalOffsetBottom, 20);
    circle(x - 20, y + terminalOffsetBottom, 20);
    circle(x + 20, y + terminalOffsetBottom, 20);
    circle(x + 60, y + terminalOffsetBottom, 20);
    circle(x - 60, y + terminalOffsetBottom, 18);
    circle(x - 20, y + terminalOffsetBottom, 18);
    circle(x + 20, y + terminalOffsetBottom, 18);
    circle(x + 60, y + terminalOffsetBottom, 18);
    //Inner Circles
    noStroke();
    fill(200);
    circle(x - 60, y + terminalOffsetBottom, 8);
    circle(x - 20, y + terminalOffsetBottom, 8);
    circle(x + 20, y + terminalOffsetBottom, 8);
    circle(x + 60, y + terminalOffsetBottom, 8);

    fill(0);
    textSize(6);
    text("NO", x - 50, y + terminalOffsetBottom + 15);
    text("NC", x - 10, y + terminalOffsetBottom + 15);
    text("NC", x + 30, y + terminalOffsetBottom + 15);
    text("NO", x + 70, y + terminalOffsetBottom + 15);
    stroke(0);
    noFill();

    //============== Details ================
    // middle horizonal grills
    fill(0);
    rect(x, y - 10, width - 90, height - 105);
    rect(x, y + 10, width - 90, height - 105);
    // manual coil toggle
    fill(255);

    rect(x + 60, y, width - 155, height - 85);
    rect(x + 60, y, width - 145, height - 90);
    // rectangular details
    // top row
    rect(x, y - 51, width - 148, height - 102);
    rect(x - 40, y - 51, width - 148, height - 102);
    rect(x + 40, y - 51, width - 148, height - 102);

    // bottom row
    rect(x, y + 51, width - 148, height - 102);
    rect(x - 40, y + 51, width - 148, height - 102);
    rect(x + 40, y + 51, width - 148, height - 102);

    // top end rectangular details
    rect(x + 77, y - 51, 6, 8);
    rect(x - 77, y - 51, 6, 8);
    rect(x + 77, y + 51, 6, 8);
    rect(x - 77, y + 51, 6, 8);
  }

  assignContacts() {
    this.contacts = [
      // Normally Open
      new AuxiliaryContact(
        "AK" + this.id + 1,
        new Vertex(this.x - 60, this.y - 30),
        false,
        false,
        new Vertex(this.x - 60, this.y + 30)
      ),
      // Normally Closed
      new AuxiliaryContact(
        "AK" + this.id + 2,
        new Vertex(this.x - 20, this.y - 30),
        false,
        true,
        new Vertex(this.x - 20, this.y + 30)
      ),
      // Normally Closed
      new AuxiliaryContact(
        "AK" + this.id + 3,
        new Vertex(this.x + 20, this.y - 30),
        false,
        true,
        new Vertex(this.x + 20, this.y + 30)
      ),
      // Normally Open
      new AuxiliaryContact(
        "AK" + this.id + 4,
        new Vertex(this.x + 60, this.y - 30),
        false,
        false,
        new Vertex(this.x + 60, this.y + 30)
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

  snapToBase(device) {
    if (device instanceof Contactor) {
      this.x = device.x;
      this.y = device.y;
      this.placed = true;
      this.contactor = device;
      device.setInUse(true);
    }
  }

  releaseContactor() {
    this.contactor.setInUse(false);
    this.contactor = null;
  }

  updateContacts() {
    //console.log("in Auxiliary: " , this.contactor.contactorCoil.getState());
    const on = [true, false, false, true];
    const off = [false, true, true, false];
    const contacts = this.contactor.contactorCoil.getState() ? on : off;
    
    for (let i = 0; i < this.contacts.length; i++) {
      this.contacts[i].setContact(contacts[i]);
    }
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
