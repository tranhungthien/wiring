class Transformer extends IdealTransformer(Transmittable(Movable)) {
  draw() {
    let c = color(0, 0, 0);
    noStroke();
    rectMode(CENTER);
    strokeCap(SQUARE);
    this.updateRotation();
    if (!this.isPlaced) {
      this.c.x = relativeCoordinates().x; //snap(mouseX);
      this.c.y = relativeCoordinates().y; //snap(mouseY);
      c.setAlpha(50);
    }
    stroke(c);
    this.drawDetails();
    if (this.isPlaced) {
      if (this.selected == this.c) {
        stroke(255, 128, 128);
        this.drawDetails();
      }
      if (this.selected == this.p.u) {
        stroke(0, 161, 241);
        strokeWeight(2);
        square(this.p.u.x, this.p.u.y, 10);
      }
      if (this.selected == this.p.v) {
        stroke(130, 183, 75);
        strokeWeight(2);
        square(this.p.v.x, this.p.v.y, 10);
      }
      if (this.selected == this.s.u) {
        stroke(0, 161, 241);
        strokeWeight(2);
        square(this.s.u.x, this.s.u.y, 10);
      }
      if (this.selected == this.s.v) {
        stroke(130, 183, 75);
        strokeWeight(2);
        square(this.s.v.x, this.s.v.y, 10);
      }
    }
  }

  drawDetails() {
    const leadInWeight = 4;
    const labelTextSize = 22;
    const componentBoarder = 2;
    const as = 25; // arc size
    const pxo = -20; // primary x offset
    const pyo = 20; // primary y offset
    const sxo = 20; // secondary x offset
    const syo = -20; // secondary y offset
    const x = this.c.x;
    const y = this.c.y;

    if (this.rotate == 1) {
      //stroke(0);
      rectMode(CENTER);
      strokeCap(SQUARE);

      // primary
      strokeWeight(leadInWeight);
      line(x + pxo, y - 36.5, x + pxo, y - 55.5);
      //line(x + pxo - 15.5, y - 60.5, x + pxo + 2, y - 60.5);

      strokeWeight(componentBoarder);
      noFill();

      arc(x + pxo, y - as, as, as, -PI / 2, PI / 2);
      arc(x + pxo, y, as, as, -PI / 2, PI / 2);
      arc(x + pxo, y + as, as, as, -PI / 2, PI / 2);

      strokeWeight(leadInWeight);
      line(x + pxo, y + 36.5, x + pxo, y + 55.5);
      //line(x + pxo - 15.5, y + 60.5, x + pxo + 2, y + 60.5);

      strokeWeight(0.5);
      rect(x + pxo, y - 60, 10);
      rect(x + pxo, y + 60, 10);

      //secondary
      strokeWeight(leadInWeight);
      line(x + sxo, y - 36.5, x + sxo, y - 55.5);
      //line(x + sxo + 15.5, y - 60.5, x + sxo - 2, y - 60.5);

      strokeWeight(componentBoarder);
      noFill();

      arc(x + sxo, y - as, as, as, PI / 2, -PI / 2);
      arc(x + sxo, y, as, as, PI / 2, -PI / 2);
      arc(x + sxo, y + as, as, as, PI / 2, -PI / 2);

      // iron core lines x 2
      // line(x + 5, y - 55.5, x + 5, y + 55.5);
      // line(x - 5, y - 55.5, x - 5, y + 55.5);
      // line(x + 4, y - 30, x + 4, y + 30);
      // line(x - 4, y - 30, x - 4, y + 30);
      //iron core line x 1
      //line(x, y - 30, x, y + 30);

      strokeWeight(leadInWeight);
      line(x + sxo, y + 36.5, x + sxo, y + 55.5);
      //line(x + sxo + 15.5, y + 60.5, x + sxo - 2, y + 60.5);

      strokeWeight(0.5);
      rect(x + sxo, y - 60, 10);
      rect(x + sxo, y + 60, 10);
      noStroke();

      fill(0);
      textAlign(CENTER, CENTER);
      textSize(labelTextSize);
      text(this.idLabel, x + 52, y + 15);

      const labels = [
        [this.primaryVoltageLabel, 65, 30],
        [this.primaryCurrentLabel, 65, 10],
        [this.primaryTurnsLabel, 65, -10],
        [this.secondaryTurnsLabel, 65, -30],
        [this.secondaryVoltageLabel, -65, 30],
        [this.secondaryCurrentLabel, -65, 10],
      ];

      for (const [lbl, x, y] of labels) {
        if (!lbl) continue;
        lbl.xOffset = x;
        lbl.yOffset = y;
        lbl.draw();
      }

      noFill();
    }

    if (this.rotate == 2) {
      // seconary on top
      // rotation ccw
      stroke(0);

      rectMode(CENTER);
      strokeWeight(leadInWeight);

      strokeCap(SQUARE);
      line(x - 36.5, y + pyo, x - 55.5, y + pyo);
      strokeWeight(componentBoarder);
      noFill();

      // primary
      arc(x - as, y + pyo, as, as, -TWO_PI / 2, 0);
      arc(x, y + pyo, as, as, -TWO_PI / 2, 0);
      arc(x + as, y + pyo, as, as, -TWO_PI / 2, 0);

      strokeWeight(leadInWeight);
      line(x + 36.5, y + pyo, x + 55.5, y + pyo);

      strokeWeight(0.5);
      rect(x - 60, y + pyo, 10);
      rect(x + 60, y + pyo, 10);

      // secondary
      strokeWeight(leadInWeight);
      line(x - 36.5, y + syo, x - 55.5, y + syo);
      strokeWeight(componentBoarder);
      noFill();

      arc(x - as, y + syo, as, as, 0, -TWO_PI / 2);
      arc(x, y + syo, as, as, 0, -TWO_PI / 2);
      arc(x + as, y + syo, as, as, 0, -TWO_PI / 2);

      strokeWeight(leadInWeight);
      line(x + 36.5, y + syo, x + 55.5, y + syo);

      strokeWeight(0.5);
      rect(x - 60, y + syo, 10);
      rect(x + 60, y + syo, 10);
      noStroke();
      fill(0);
    }
  }
}
