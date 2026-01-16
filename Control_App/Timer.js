class Timer extends Placeable {
  constructor(id, x, y) {
    super(x, y, 240, 120);
    this.timerEnable = null;
    this.timerCoil = null;
    this.baseBlock = null;
    this.contacts = null;
    this.timer = false;
    // this.height = 240;
    // this.width = 120;
    this.tick = 0;
    this.id = id;
  }

  display() {
    if (this.placed) {
      if (this.selected) fill(120);
      else fill(255, 255, 255);
    } else {
      fill(240, 240, 240, 180);
    }
    this.drawModule();
  }

  drawModule() {
    const grey = 200;
    rectMode(CENTER);
    stroke(0);
    rect(this.x, this.y, this.width, this.height, 3);
    rect(this.x, this.y, this.width, this.height - 6 * spacing);
    line(this.x - 60, this.y - 90, this.x - 60, this.y + 90);
    line(this.x + 60, this.y - 90, this.x + 60, this.y + 90);
    stroke(grey);
    rect(this.x, this.y, this.width, this.height - 12 * spacing);
    stroke(0);
    line(this.x - 60, this.y - 60, this.x - 60, this.y + 60);
    line(this.x + 60, this.y - 60, this.x + 60, this.y + 60);
    stroke(grey);
    rect(
      this.x,
      this.y - 1.5 * spacing,
      this.width - spacing,
      this.height - 16 * spacing,
      5
    );
    rect(
      this.x - 2 * spacing,
      this.y + 6 * spacing,
      this.width - 5 * spacing,
      this.height - 18 * spacing
    );
    rect(
      this.x - 2 * spacing,
      this.y + 4.5 * spacing,
      this.width - 5 * spacing,
      this.height - 21 * spacing
    );
    rect(
      this.x - 2 * spacing,
      this.y + 4.5 * spacing,
      this.width - 6 * spacing,
      this.height - 22 * spacing
    );

    stroke(0);
    line(
      this.x + 6 * spacing,
      this.y + 9 * spacing,
      this.x - 6 * spacing,
      this.y + 9 * spacing
    );
    stroke(grey);
    rect(this.x - 3 * spacing, this.y + 1.5 * spacing, 6, 6);
    rect(this.x - 3 * spacing, this.y - 0.5 * spacing, 6, 6);
    //rect(this.x - 4 * spacing, this.y - 2.5 * spacing, 6, 6);
    //rect(this.x - 4 * spacing, this.y - 4.5 * spacing, 6, 6);

    fill(255);
    circle(this.x - 0.5 * spacing, this.y + 1 * spacing, 20);
    fill(0);
    rect(this.x - 0.5 * spacing, this.y + 1 * spacing, 15, 2, 5);
    rect(this.x - 0.5 * spacing, this.y + 1 * spacing, 2, 15, 5);
    fill(255);

    circle(this.x - 0.5 * spacing, this.y - 1.5 * spacing, 20);
    fill(0);
    rect(this.x - 0.5 * spacing, this.y - 1.5 * spacing, 15, 2, 5);
    rect(this.x - 0.5 * spacing, this.y - 1.5 * spacing, 2, 15, 5);
    fill(255);

    circle(this.x - 0.5 * spacing, this.y - 4 * spacing, 20);
    fill(0);
    rect(this.x - 0.5 * spacing, this.y - 4 * spacing, 15, 2, 5);
    rect(this.x - 0.5 * spacing, this.y - 4 * spacing, 2, 15, 5);
    fill(255);
    stroke(0);
  }

  drawTimingDisplay() {
    textSize(16);
    noStroke();
    fill(0);
    text(this.tick, this.x - 40, this.y - 100);
    noFill();
    stroke(1);
    textSize(12);
  }

  assignContacts() {
    // timer terminal 6 and 7 disabled
    // A1 = 2
    // A2 = 10
    // 1  • --- • 4
    // 	        • 3
    // A2 • --- • 5
    //
    // 11 • --- • 8
    // 	        • 9
    this.timerCoil = new TimerCoil(
      "T" + this.id,
      new Vertex(this.x - 4 * spacing, this.y + 7 * spacing), // A1 terminal 2
      new Vertex(this.x + 4 * spacing, this.y + 7 * spacing) // A2 terminal 10
    );
    this.timerEnable = new TimerEnable(
      "TE" + this.id,
      new Vertex(this.x + 1 * spacing, this.y - 8 * spacing), // terminal 5
      new Vertex(this.x + 4 * spacing, this.y + 7 * spacing) // A2 terminal 10
    );
    this.contacts = [
      this.timerCoil,
      this.timerEnable,
      new TimerContact(
        "CT" + this.id + 1, // NO
        new Vertex(this.x - 2 * spacing, this.y + 8 * spacing), // terminal 11
        false,
        false,
        new Vertex(this.x - 5 * spacing, this.y - 7 * spacing) // terminal 9
      ),
      new TimerContact(
        "CT" + this.id + 2, // NC
        new Vertex(this.x - 2 * spacing, this.y + 8 * spacing), // terminal 11
        false,
        true,
        new Vertex(this.x - 3 * spacing, this.y - 8 * spacing) // terminal 8
      ),
      new TimerContact(
        "CT" + this.id + 3, // NO
        new Vertex(this.x + 2 * spacing, this.y + 8 * spacing), // terminal 1
        false,
        false,
        new Vertex(this.x + 3 * spacing, this.y - 7 * spacing) // terminal 3
      ),
      new TimerContact(
        "CT" + this.id + 4, // NC
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
    return [this.timerCoil, this.timerEnable];
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
    //TODO: check logic with latching
    const on = [true, false, false, true, false, true];
    const off = [false, true, true, false, true, false];
    if (!this.timerCoil.getState() && !this.timerEnable.getState())
      this.tick = 0;
    if (
      this.timerCoil.getState() &&
      this.timerEnable.getState() &&
      this.tick < 200
    )
      this.tick++;
    if (this.tick == 200) {
      const contacts = on;
      for (let i = 2; i < this.contacts.length; i++) {
        this.contacts[i].setContact(contacts[i - 2]);
      }
    } else {
      const contacts = off;
      for (let i = 2; i < this.contacts.length; i++) {
        this.contacts[i].setContact(contacts[i - 2]);
      }
    }
    this.drawTimingDisplay();
  }

  isMouseOver(mx, my) {
    return (
      mx > this.x - this.width / 2 &&
      mx < this.x + this.width / 2 &&
      my > this.y - this.height / 2 &&
      my < this.y + this.height / 2
    );
  }

  reset() {
    this.tick = 0;
  }
}
