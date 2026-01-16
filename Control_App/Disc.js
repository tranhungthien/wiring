class Disc {
  constructor(diameter, holes) {
    this.diameter = diameter;
    this.holes = holes;
    this.angle = 0;
  }

  display(x, y) {
    push();
    translate(x, y);
    rotate(this.angle);
    fill(220);
    ellipse(0, 0, this.diameter);

    let angleIncrement = TWO_PI / this.holes;
    let holeDiameter = this.diameter / 7;

    for (let i = 0; i < this.holes; i++) {
      let angle = i * angleIncrement;
      let holeX = (this.diameter / 2 - (2 * holeDiameter) / 2) * cos(angle);
      let holeY = (this.diameter / 2 - (2 * holeDiameter) / 2) * sin(angle);
      fill(255);
      ellipse(holeX, holeY, holeDiameter);
    }
    pop();
  }

  rotate(angle) {
    this.angle += angle;
  }
}
