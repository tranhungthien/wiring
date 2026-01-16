class Relay extends Placeable {
  constructor(id, x, y) {
    super(x, y, 210, 110);
    this.relayCoil = null;
    this.baseBlock = null;
    this.contacts = null;
    // this.height = 210;
    // this.width = 110;
    this.id = id;
  }

  display() {
    if (this.placed) {
      if (this.selected) fill(240);
      else fill(100, 100, 100, 150);
    } else {
      fill(100, 100, 100, 180);
    }
    this.drawModule();
  }

  drawModule() {
    stroke(0);
    strokeWeight(8);
    rect(this.x, this.y, this.width, this.width, 10);
    strokeWeight(1);
    rect(this.x, this.y, this.width, this.width, 10);
  }

  assignContacts() {
    // A1 = 2
    // A2 = 10
    // 1 • --- • 4
    // 	       • 3
    // 6 • --- • 5
    // 	       • 7
    // 11• --- • 8
    // 	       • 9
    this.relayCoil = new RelayCoil(
      "R" + this.id,
      new Vertex(this.x - 4 * spacing, this.y + 7 * spacing),
      new Vertex(this.x + 4 * spacing, this.y + 7 * spacing)
    );
    this.contacts = [
      this.relayCoil,
      new RelayContact(
        "CR" + this.id + 1, // NO
        new Vertex(this.x - 2 * spacing, this.y + 8 * spacing), // terminal 11
        false,
        false,
        new Vertex(this.x - 5 * spacing, this.y - 7 * spacing) // terminal 9
      ),
      new RelayContact(
        "CR" + this.id + 2, // NC
        new Vertex(this.x - 2 * spacing, this.y + 8 * spacing), // terminal 11
        false,
        true,
        new Vertex(this.x - 3 * spacing, this.y - 8 * spacing) // terminal 8
      ),
      new RelayContact(
        "CR" + this.id + 3, // NO
        new Vertex(this.x, this.y + 8 * spacing), // terminal 6
        false,
        false,
        new Vertex(this.x - 1 * spacing, this.y - 7 * spacing) // terminal 7
      ),
      new RelayContact(
        "CR" + this.id + 4, // NC
        new Vertex(this.x, this.y + 8 * spacing), // terminal 6
        false,
        true,
        new Vertex(this.x + 1 * spacing, this.y - 8 * spacing) // terminal 5
      ),
      new RelayContact(
        "CR" + this.id + 5, // NO
        new Vertex(this.x + 2 * spacing, this.y + 8 * spacing), // terminal 1
        false,
        false,
        new Vertex(this.x + 3 * spacing, this.y - 7 * spacing) // terminal 3
      ),
      new RelayContact(
        "CR" + this.id + 6, // NC
        new Vertex(this.x + 2 * spacing, this.y + 8 * spacing), // terminal 1
        false,
        true,
        new Vertex(this.x + 5 * spacing, this.y - 8 * spacing) // terminal 4
      ),
    ];
  }

  getEdges() {
    return this.contacts;
  }

  getCoil() {
    return this.relayCoil;
  }

  snapToBase(device) {
    if (device instanceof BaseBlock) {
      this.x = device.x;
      this.y = device.y;
      this.placed = true;
      this.baseBlock = device;
      device.setInUse(true);
    }
  }

  releaseBaseBlock() {
    this.baseBlock.setInUse(false);
    this.baseBlock = null;
  }

  updateContacts() {
    const on = [true, false, true, false, true, false];
    const off = [false, true, false, true, false, true];
    const contacts = this.relayCoil.getState() ? on : off;
    for (let i = 1; i < this.contacts.length; i++) {
      this.contacts[i].setContact(contacts[i - 1]);
    }
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
