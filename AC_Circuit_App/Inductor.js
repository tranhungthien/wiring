class Inductor extends InductiveReactance(
  Component(Rotatable(Draggable(Placeable)))
) {
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
      if (this.selected == this.u) {
        stroke(0, 161, 241);
        strokeWeight(2);
        square(this.u.x, this.u.y, 10);
      }
      if (this.selected == this.v) {
        stroke(130, 183, 75);
        //fill(130, 183, 75);
        strokeWeight(2);
        square(this.v.x, this.v.y, 10);
      }
    }
  }

  drawDetails() {
    const labelTextSize = 22;
    const boarderWeight = 2;
    const wireWeight = 4;
    const x = this.c.x;
    const y = this.c.y;

    if (this.rotate == 1) {
      rectMode(CENTER);
      strokeWeight(wireWeight);

      //strokeCap(ROUND);
      strokeCap(SQUARE);
      line(x, y - 39, x, y - 55.5);
      strokeWeight(boarderWeight);
      noFill();

      arc(x, y - 30, 20, 20, -PI / 2, PI / 2);
      arc(x, y - 10, 20, 20, -PI / 2, PI / 2);
      arc(x, y + 10, 20, 20, -PI / 2, PI / 2);
      arc(x, y + 30, 20, 20, -PI / 2, PI / 2);

      strokeCap(SQUARE);
      strokeWeight(wireWeight);
      line(x, y + 39, x, y + 55.5);

      strokeWeight(0.5);
      rect(x, y - 60, 10);
      rect(x, y + 60, 10);
      noStroke();
      fill(0);

      textAlign(CENTER, CENTER);
      textSize(labelTextSize);
      text(this.idLabel, x + 30, y);

      const labels = [
        [this.voltageLabel, 45, 30],
        [this.currentLabel, 45, 10],
        [this.reactiveLabel, 45, -10], // should be without simulation
        [this.impedanceLabel, 45, -30],
      ];

      for (const [lbl, x, y] of labels) {
        if (!lbl) continue;
        //console.log(lbl);
        lbl.xOffset = x;
        lbl.yOffset = y;
        lbl.draw();
      }
      if (this.probe) {
        if (this.selected == this.u) {
          this.uVoltageToGroundLabel.xOffset = 45;
          this.uVoltageToGroundLabel.yOffset = -10;
          this.uVoltageToGroundLabel.draw();
        }
        if (this.selected == this.v) {
          this.vVoltageToGroundLabel.xOffset = 45;
          this.vVoltageToGroundLabel.yOffset = 10;
          this.vVoltageToGroundLabel.draw();
        }
      }
    }
    if (this.rotate == 2) {
      rectMode(CENTER);
      strokeWeight(wireWeight);

      strokeCap(SQUARE);
      line(x - 39, y, x - 55.5, y);
      strokeWeight(boarderWeight);
      noFill();

      arc(x - 30, y, 20, 20, -TWO_PI / 2, 0);
      arc(x - 10, y, 20, 20, -TWO_PI / 2, 0);
      arc(x + 10, y, 20, 20, -TWO_PI / 2, 0);
      arc(x + 30, y, 20, 20, -TWO_PI / 2, 0);

      strokeCap(SQUARE);
      strokeWeight(wireWeight);
      line(x + 39, y, x + 55.5, y);

      strokeWeight(0.5);
      rect(x - 60, y, 10);
      rect(x + 60, y, 10);
      noStroke();
      fill(0);

      textAlign(CENTER, CENTER);
      textSize(labelTextSize);
      text(this.idLabel, x, y + 20);

      const labels = [
        [this.voltageLabel, 0, 90],
        [this.currentLabel, 0, 70],
        [this.reactiveLabel, 0, 50], // should be without simulation
        [this.impedanceLabel, 0, 30],
      ];

      for (const [lbl, x, y] of labels) {
        if (!lbl) continue;
        lbl.xOffset = x;
        lbl.yOffset = y;
        lbl.draw();
      }
      if (this.probe) {
        if (this.selected == this.u) {
          this.uVoltageToGroundLabel.xOffset = -60;
          this.uVoltageToGroundLabel.yOffset = 110;
          this.uVoltageToGroundLabel.draw();
        }
        if (this.selected == this.v) {
          this.vVoltageToGroundLabel.xOffset = 60;
          this.vVoltageToGroundLabel.yOffset = -40;
          this.vVoltageToGroundLabel.draw();
        }
      }
    }
    if (this.rotate == 3) {
      rectMode(CENTER);
      strokeWeight(wireWeight);

      strokeCap(SQUARE);
      line(x, y - 39, x, y - 55.5);
      strokeWeight(boarderWeight);
      noFill();

      arc(x, y - 30, 20, 20, PI / 2, -PI / 2);
      arc(x, y - 10, 20, 20, PI / 2, -PI / 2);
      arc(x, y + 10, 20, 20, PI / 2, -PI / 2);
      arc(x, y + 30, 20, 20, PI / 2, -PI / 2);

      strokeCap(SQUARE);
      strokeWeight(wireWeight);
      line(x, y + 39, x, y + 55.5);

      strokeWeight(0.5);
      rect(x, y - 60, 10);
      rect(x, y + 60, 10);
      noStroke();
      fill(0);

      textAlign(CENTER, CENTER);
      textSize(labelTextSize);
      text(this.idLabel, x + 30, y);

      const labels = [
        [this.voltageLabel, 45, 30],
        [this.currentLabel, 45, 10],
        [this.reactiveLabel, 45, -10], // should be without simulation
        [this.impedanceLabel, 45, -30],
      ];

      for (const [lbl, x, y] of labels) {
        if (!lbl) continue;
        lbl.xOffset = x;
        lbl.yOffset = y;
        lbl.draw();
      }

      // need a better fix
      if (this.probe) {
        if (this.selected == this.u) {
          this.uVoltageToGroundLabel.xOffset = 45;
          this.uVoltageToGroundLabel.yOffset = 10;
          this.uVoltageToGroundLabel.draw();
        }
        if (this.selected == this.v) {
          this.vVoltageToGroundLabel.xOffset = 45;
          this.vVoltageToGroundLabel.yOffset = -10;
          this.vVoltageToGroundLabel.draw();
        }
      }
    }
    if (this.rotate == 4) {
      rectMode(CENTER);
      strokeWeight(wireWeight);

      strokeCap(SQUARE);
      line(x - 39, y, x - 55.5, y);
      strokeWeight(boarderWeight);
      noFill();

      arc(x - 30, y, 20, 20, 0, TWO_PI / 2);
      arc(x - 10, y, 20, 20, 0, TWO_PI / 2);
      arc(x + 10, y, 20, 20, 0, TWO_PI / 2);
      arc(x + 30, y, 20, 20, 0, TWO_PI / 2);

      strokeCap(SQUARE);
      strokeWeight(wireWeight);
      line(x + 39, y, x + 55.5, y);

      strokeWeight(0.5);
      rect(x - 60, y, 10);
      rect(x + 60, y, 10);
      noStroke();
      fill(0);

      textAlign(CENTER, CENTER);
      textSize(labelTextSize);
      text(this.idLabel, x, y + 30);

      const labels = [
        [this.voltageLabel, 0, 90],
        [this.currentLabel, 0, 70],
        [this.reactiveLabel, 0, 50], // should be without simulation
        [this.impedanceLabel, 0, 30],
      ];

      for (const [lbl, x, y] of labels) {
        if (!lbl) continue;
        lbl.xOffset = x;
        lbl.yOffset = y;
        lbl.draw();
      }

      if (this.probe) {
        if (this.selected == this.u) {
          this.uVoltageToGroundLabel.xOffset = 60;
          this.uVoltageToGroundLabel.yOffset = -50;
          this.uVoltageToGroundLabel.draw();
        }
        if (this.selected == this.v) {
          this.vVoltageToGroundLabel.xOffset = -60;
          this.vVoltageToGroundLabel.yOffset = 110;
          this.vVoltageToGroundLabel.draw();
        }
      }
    }
    noFill();
  }
}
