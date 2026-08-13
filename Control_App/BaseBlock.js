class BaseBlock extends Placeable {
  constructor(id, x, y) {
    super(x, y, 210, 120);
    this.id = id;
    // this.width = 120;
    // this.height = 210;
    this.inUse = false;
  }

  display() {
    if (this.placed) {
      if (this.selected) fill(54, 152, 250);
      else fill(153, 204, 255, 255);
    } else {
      fill(153, 204, 255, 150);
    }
    this.drawModule();
    this.drawTerminals();
  }

  drawModule() {
    stroke(0);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height, 3);
    this.drawCenterConnector();
  }

  drawCenterConnector() {
    let centerRadius = 15;
    let smallRadius = 5;
    let numSmallCircles = 11;
    let distanceFromCenter = 30;

    fill(0);
    strokeWeight(1);
    circle(this.x, this.y, 2 * centerRadius);
    circle(this.x, this.y + 15, 6);
    fill(200);
    noStroke();
    circle(this.x, this.y, 2 * centerRadius);
    circle(this.x, this.y + 15, 6);
    stroke(0);
    strokeWeight(2);

    fill(200);
    // Draw surrounding circles
    for (let i = 0; i < numSmallCircles; i++) {
      let angle = (TWO_PI / numSmallCircles) * i;
      let x = this.x + cos(angle) * distanceFromCenter;
      let y = this.y + sin(angle) * distanceFromCenter;
      fill(150);
      circle(x, y, 2 * smallRadius);
    }
  }

  drawTerminals() {
    fill(255);

    let j = 0;
    let k = 0;
    let l = 0;
    // Top terminals
    for (let i = -5; i < 6; i += 2) {
      if (j % 2 == 1) {
        k = 8;
        l = 6;
      } else {
        k = 7;
        l = 8;
      }
      let label = [9, 8, 7, 5, 3, 4];
      noStroke();
      text(label[j], this.x + i * spacing, this.y - l * spacing);
      stroke(0);
      strokeWeight(1);
      circle(this.x + i * spacing, this.y - k * spacing, 14);
      noStroke();
      fill(220);
      circle(this.x + i * spacing, this.y - k * spacing, 6);
      fill(255);
      //print("x: ", this.x + i * spacing, " y:", this.y - k * spacing);
      j++;
    }
    // Bottom terminals
    stroke(0);
    circle(this.x, this.y + 8 * spacing, 14); // terminal 6
    circle(this.x - 4 * spacing, this.y + 7 * spacing, 14); //terminal A1
    circle(this.x - 2 * spacing, this.y + 8 * spacing, 14); //terminal 11
    circle(this.x + 2 * spacing, this.y + 8 * spacing, 14); //terminal 1
    circle(this.x + 4 * spacing, this.y + 7 * spacing, 14); //terminal A2
    
    // Bottom terminals
    noStroke();
    fill(220);
    circle(this.x, this.y + 8 * spacing, 6); // terminal 6
    circle(this.x - 4 * spacing, this.y + 7 * spacing, 6); //terminal A1
    circle(this.x - 2 * spacing, this.y + 8 * spacing, 6); //terminal 11
    circle(this.x + 2 * spacing, this.y + 8 * spacing, 6); //terminal 1
    circle(this.x + 4 * spacing, this.y + 7 * spacing, 6); //terminal A2

    fill(255)
    textSize(12);
    textAlign(CENTER);
    text("A1", this.x - 4 * spacing, this.y + 9 * spacing);
    text("A2", this.x + 4 * spacing, this.y + 9 * spacing);
    text(11, this.x - 2 * spacing, this.y + 10 * spacing);
    text(6, this.x + 0 * spacing, this.y + 10 * spacing);
    text(1, this.x + 2 * spacing, this.y + 10 * spacing);
    stroke(0);
  }
  
  assignContacts(){
    return;
  }

  getInUse() {
    return this.inUse;
  }

  setInUse(inUse) {
    this.inUse = inUse;
  }

  isMouseOver(mx, my) {
    // may need to change this for collision detection
    if (this.inUse) return;
    return (
      mx > this.x - this.width / 2 &&
      mx < this.x + this.width / 2 &&
      my > this.y - this.height / 2 &&
      my < this.y + this.height / 2
    );
  }
}
