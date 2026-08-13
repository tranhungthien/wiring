class Contactor extends Placeable {
  constructor(id, x, y) {
    super(x, y, 220, 160);
    this.contactorCoil = null;
    this.auxiliary = false;
    this.contacts = null;
    // this.height = 220;
    // this.width = 160;
    this.id = id;
  }

  display() {
    if (this.placed) {
      if (this.selected) fill(255);
      else fill(245, 245, 245, 255);
    } else {
      fill(245, 245, 245, 80);
    }
    this.drawModule();
  }

  drawModule() {
    //fill(245);
    stroke(1);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);

    //Coils
    rect(this.x, this.y - 130, 100, 40, 3, 3, 0, 0);
    rect(this.x, this.y - 120, 30, 20);
    fill(0);
    rect(this.x, this.y - 114, 30, 8);
    noFill();

    //Top terminals
    circle(this.x - 30, this.y - 130, 20);
    circle(this.x + 30, this.y - 130, 20);
    fill(255);
    circle(this.x - 30, this.y - 130, 18);
    circle(this.x + 30, this.y - 130, 18);

    noStroke();
    fill(200);
    circle(this.x - 30, this.y - 130, 8);
    circle(this.x + 30, this.y - 130, 8);
    stroke(0);
    noFill();

    //Coil labels
    noStroke();
    fill(0);
    textSize(10);
    textAlign(LEFT);
    text("A1", this.x - 48, this.y - 140);
    text("A2", this.x + 36, this.y - 140);

    //noStroke();
    //Top labels
    text(1, this.x - 75, this.y - 80);
    text(3, this.x - 35, this.y - 80);
    text(5, this.x + 5, this.y - 80);
    text("NO", this.x + 62, this.y - 80);

    //Bottom labels
    text(2, this.x - 75, this.y + 88);
    text(4, this.x - 35, this.y + 88);
    text(6, this.x + 5, this.y + 88);
    text("NO", this.x + 62, this.y + 88);
    noFill();
    stroke(1);
    textAlign(CENTER);

    //Top and bottom details
    rect(this.x, this.y - 100, this.width, 20);
    rect(this.x, this.y + 100, this.width, 20);

    rectMode(CORNER);
    //Top
    rect(this.x - 80, this.y - 110, 5, 20);
    rect(this.x + 75, this.y - 110, 5, 20);
    //Bottom
    rect(this.x - 80, this.y + 90, 5, 20);
    rect(this.x + 75, this.y + 90, 5, 20);

    rectMode(CENTER);
    //Top
    rect(this.x - 40, this.y - 98, 4, 15);
    rect(this.x, this.y - 98, 4, 15);
    rect(this.x + 40, this.y - 98, 4, 15);
    //Bottom
    rect(this.x - 40, this.y + 98, 4, 15);
    rect(this.x, this.y + 98, 4, 15);
    rect(this.x + 40, this.y + 98, 4, 15);

    //Top Terminals
    fill(255);
    circle(this.x - 60, this.y - 70, 20);
    circle(this.x - 20, this.y - 70, 20);
    circle(this.x + 20, this.y - 70, 20);
    circle(this.x + 60, this.y - 70, 20);
    circle(this.x - 60, this.y - 70, 18);
    circle(this.x - 20, this.y - 70, 18);
    circle(this.x + 20, this.y - 70, 18);
    circle(this.x + 60, this.y - 70, 18);
    //Inner Circles
    noStroke();
    fill(200);
    circle(this.x - 60, this.y - 70, 8);
    circle(this.x - 20, this.y - 70, 8);
    circle(this.x + 20, this.y - 70, 8);
    circle(this.x + 60, this.y - 70, 8);
    stroke(0);
    noFill();

    //Bottom Terminals
    fill(255);
    circle(this.x - 60, this.y + 70, 20);
    circle(this.x - 20, this.y + 70, 20);
    circle(this.x + 20, this.y + 70, 20);
    circle(this.x + 60, this.y + 70, 20);
    circle(this.x - 60, this.y + 70, 18);
    circle(this.x - 20, this.y + 70, 18);
    circle(this.x + 20, this.y + 70, 18);
    circle(this.x + 60, this.y + 70, 18);
    //Inner Circles
    noStroke();
    fill(200);
    circle(this.x - 60, this.y + 70, 8);
    circle(this.x - 20, this.y + 70, 8);
    circle(this.x + 20, this.y + 70, 8);
    circle(this.x + 60, this.y + 70, 8);
    stroke(0);
    noFill();

    //Center details
    rect(this.x, this.y, this.width - 80, this.height - 120);
    fill(150);
    rect(this.x, this.y, this.width - 90, this.height - 190);
    fill(255);
    rect(this.x - 17, this.y, 30, 28, 2);
    rect(this.x + 17, this.y, 30, 28, 2);
    rect(this.x - 10, this.y, 10, 28);
    rect(this.x + 10, this.y, 10, 28);

    rect(this.x - 20, this.y - 33, 12, 28, 2);
    rect(this.x + 20, this.y - 33, 12, 28, 2);
    rect(this.x - 20, this.y + 33, 12, 28, 2);
    rect(this.x + 20, this.y + 33, 12, 28, 2);
  }

  assignContacts() {
    this.contactorCoil = new ContactorCoil(
      "K" + this.id,
      new Vertex(this.x - 3 * spacing, this.y - 13 * spacing),
      new Vertex(this.x + 3 * spacing, this.y - 13 * spacing)
    );
    this.contacts = [
      this.contactorCoil,
      // TODO: update vertices
      new ContactorContact(
        "CK" + this.id + 1,
        new Vertex(this.x - 60, this.y + 70),
        false,
        false,
        new Vertex(this.x - 60, this.y - 70)
      ),
      new ContactorContact(
        "CK" + this.id + 2,
        new Vertex(this.x - 20, this.y + 70),
        false,
        false,
        new Vertex(this.x - 20, this.y - 70)
      ),
      new ContactorContact(
        "CK" + this.id + 3,
        new Vertex(this.x + 20, this.y + 70),
        false,
        false,
        new Vertex(this.x + 20, this.y - 70)
      ),
      new ContactorContact(
        "CK" + this.id + 4,
        new Vertex(this.x + 60, this.y + 70), //NO
        false,
        false,
        new Vertex(this.x + 60, this.y - 70) //NO
      ),
    ];
  }

  getID(){
    return this.id;
  }
  
  getEdges() {
    return this.contacts;
  }

  getCoil() {
    return this.contactorCoil;
  }

  getAuxiliary() {
    return this.auxiliary;
  }

  setAuxiliary(aux) {
    this.auxiliary = aux;
  }

  updateContacts() {
    const on = [true, true, true, true];
    const off = [false, false, false, false];
    const contacts = this.contactorCoil.getState() ? on : off;
    for (let i = 1; i < this.contacts.length; i++) {
      this.contacts[i].setContact(contacts[i - 1]);
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
