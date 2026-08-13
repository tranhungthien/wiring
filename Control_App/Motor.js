//=========================================================
//               Motor winding mapping STAR
//=========================================================
// A, B, C
// u: AB1AC1
// v: AB2BC1
// w: AC2BC2

// A, C, B
// u: AB1AC1
// v: AC2BC2
// w: AB2BC1

// B, A, C
// u: AB2BC1
// v: AB1AC1
// w: AC2BC2

// B, C, A
// u: AB2BC1
// v: AC2BC2
// w: AB1AC1

// C, A, B
// u: AC2BC2
// v: AB1AC1
// w: AB2BC1

// C, B, A
// u: AC2BC2
// v: AB2BC1
// w: AB1AC1
//=========================================================
//               Motor winding mapping DELTA
//=========================================================
// A, B, C
// u: AB1AC1BC1
// v: AB2AC2BC1
// w: AB1AC1BC2

// A, C, B
// u: AB1AC1BC2
// v: AB2AC2BC1
// w: AB1AC1BC1

// B, A, C
// u: AB1AC1BC1
// v: AB1AC1BC2
// w: AB2AC2BC1

// B, C, A
// u: AB2AC2BC1
// v: AB1AC1BC2
// w: AB1AC1BC1

// C, A, B
// u: AB2AC2BC1
// v: AB1AC1BC1
// w: AB1AC1BC2

// C, B, A
// u: AB1AC1BC2
// v: AB1AC1BC1
// w: AB2AC2BC1
//=========================================================

class Motor extends Placeable {
  constructor(id, x, y) {
    super(x, y, 170, 150);
    this.disc = new Disc(120, 7);
    this.configuration = "";
    // this.height = 170;
    // this.width = 150;
    this.u = null;
    this.v = null;
    this.w = null;
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
    
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height, 5);
    noFill();
    strokeWeight(1);
    this.drawInductor("U", this.x - 40, this.y);
    this.drawInductor("V", this.x, this.y);
    this.drawInductor("W", this.x + 40, this.y);
    this.drawMotorHousing();
    this.disc.display(this.x + 170, this.y);
  }

  drawInductor(t, x, y) {
    circle(x, y - 70, 14);
    line(x, y - 63, x, y - 30);
    arc(x, y - 20, 20, 20, PI / 2, (3 * PI) / 2, OPEN);
    arc(x, y, 20, 20, PI / 2, (3 * PI) / 2, OPEN);
    arc(x, y + 20, 20, 20, PI / 2, (3 * PI) / 2, OPEN);
    line(x, y + 30, x, y + 63);
    circle(x, y + 70, 14);

    noStroke();
    fill(200);
    circle(x, y - 70, 6);
    circle(x, y + 70, 6);

    fill(0);
    textSize(12);
    text(t + 1, x - 20, y - 70);
    text(t + 2, x - 20, y + 70);

    noFill();
    stroke(0);
  }

  drawMotorHousing() {
    const x = this.x;
    const y = this.y;
    fill(200);
    stroke(120);
    triangle(x + 100, y + 80, x + 170, y - 50, x + 240, y + 80);
    circle(this.x + 170, this.y, 145);
    stroke(0);

    fill(0);
    noStroke();
    textSize(15);
    text(this.configuration, x + 170, y - 75);
    textSize(12);
    stroke(0);
    noFill();
  }

  assignContacts() {
    this.u = new MotorWinding(
      "M" + this.id + "U",
      new Vertex(this.x - 4 * spacing, this.y - 7 * spacing),
      new Vertex(this.x - 4 * spacing, this.y + 7 * spacing)
    );

    this.v = new MotorWinding(
      "M" + this.id + "V",
      new Vertex(this.x - 0 * spacing, this.y - 7 * spacing),
      new Vertex(this.x + 0 * spacing, this.y + 7 * spacing)
    );

    this.w = new MotorWinding(
      "M" + this.id + "W",
      new Vertex(this.x + 4 * spacing, this.y - 7 * spacing),
      new Vertex(this.x + 4 * spacing, this.y + 7 * spacing)
    );
  }

  getWindings() {
    return [this.u, this.v, this.w];
  }
    
  updateMotor() {
    const u = this.u.getFeed();
    const v = this.v.getFeed();
    const w = this.w.getFeed();

    const w1 = this.u.getState();
    const w2 = this.v.getState();
    const w3 = this.w.getState();
    if (w1 && w2 && w3) {
      //===========================================
      //                    STAR
      //===========================================
      // A, B, C forward
      if (u == "AB1AC1" && v == "AB2BC1" && w == "AC2BC2") {
        //console.log("forward");
        this.disc.rotate(PI / 20); // rotate right
        this.configuration = "STAR";
      }
      // A, C, B reverse
      if (u == "AB1AC1" && v == "AC2BC2" && w == "AB2BC1") {
        //console.log("reverse");
        this.disc.rotate(-PI / 20); // rotate left
        this.configuration = "STAR";
      }
      // B, A, C reverse
      if (u == "AB2BC1" && v == "AB1AC1" && w == "AC2BC2") {
        //console.log("reverse");
        this.disc.rotate(-PI / 20); // rotate left
        this.configuration = "STAR";
      }
      // B, C, A forward
      if (u == "AB2BC1" && v == "AC2BC2" && w == "AB1AC1") {
        //console.log("forward");
        this.disc.rotate(PI / 20); // rotate right
        this.configuration = "STAR";
      }
      // C, A, B forward
      if (u == "AC2BC2" && v == "AB1AC1" && w == "AB2BC1") {
        //console.log("forward");
        this.disc.rotate(PI / 20); // rotate right
        this.configuration = "STAR";
      }
      // C, B, A reverse
      if (u == "AC2BC2" && v == "AB2BC1" && w == "AB1AC1") {
        //console.log("reverse");
        this.disc.rotate(-PI / 20); // rotate left
        this.configuration = "STAR";
      }
      //===========================================
      //                   DELTA
      //===========================================
      // A, B, C forward
      if (u == "AB1AC1BC1" && v == "AB2AC2BC1" && w == "AB1AC1BC2") {
        //console.log("forward");
        this.disc.rotate(PI / 15); // rotate right
        this.configuration = "DELTA";
      }
      // A, C, B reverse
      if (u == "AB1AC1BC2" && v == "AB2AC2BC1" && w == "AB1AC1BC1") {
        //console.log("reverse");
        this.disc.rotate(-PI / 15); // rotate left
        this.configuration = "DELTA";
      }
      // B, A, C reverse
      if (u == "AB1AC1BC1" && v == "AB1AC1BC2" && w == "AB2AC2BC1") {
        //console.log("reverse");
        this.disc.rotate(-PI / 15); // rotate left
        this.configuration = "DELTA";
      }
      // B, C, A forward
      if (u == "AB2AC2BC1" && v == "AB1AC1BC2" && w == "AB1AC1BC1") {
        //console.log("forward");
        this.disc.rotate(PI / 15); // rotate right
        this.configuration = "DELTA";
      }
      // C, A, B forward
      if (u == "AB1AC1BC2" && v == "AB1AC1BC1" && w == "AB2AC2BC1") {
        //console.log("forward");
        this.disc.rotate(PI / 15); // rotate right
        this.configuration = "DELTA";
      }
      // C, B, A reverse
      if (u == "AB2AC2BC1" && v == "AB1AC1BC1" && w == "AB1AC1BC2") {
        //console.log("reverse");
        this.disc.rotate(-PI / 15); // rotate left
        this.configuration = "DELTA";
      }
    }
    this.u.reset();
    this.v.reset();
    this.w.reset();
    
    // console.log(this.id + " u:", u);
    // console.log(this.id + " v:", v);
    // console.log(this.id + " w:", w);
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
