class Resistor extends Resistance(Component(Rotatable(Draggable(Placeable)))) {
  draw() {
    let b = color(0, 0, 0);
    noStroke();
    rectMode(CENTER);
    strokeCap(SQUARE);
    this.updateRotation();
    if (!this.isPlaced) {
      this.c.x = relativeCoordinates().x;
      this.c.y = relativeCoordinates().y;
      b.setAlpha(50);
    }
    stroke(b);
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

    strokeWeight(2);
    if (this.rotate == 1) {
      strokeCap(SQUARE);
      rectMode(CENTER);
      strokeWeight(wireWeight);

      line(x, y - 30, x, y - 55.5);
      strokeWeight(boarderWeight);
      noFill();
      rect(x, y, 30, 60);
      strokeWeight(wireWeight);
      line(x, y + 30, x, y + 55.5);

      strokeWeight(0.5);
      rect(x, y - 60, 10);
      rect(x, y + 60, 10);
      noStroke();
      fill(0);

      textAlign(CENTER, CENTER);
      textSize(labelTextSize);
      text(this.idLabel, x + 40, y);

      const labels = [
        [this.voltageLabel, 40, 20],
        [this.currentLabel, 40, 0],
        [this.impedanceLabel, 40, -20],
      ];

      for (const [lbl, x, y] of labels) {
        if (!lbl) continue;
        lbl.xOffset = x;
        lbl.yOffset = y;
        lbl.draw();
      }

      if (this.probe) {
        if (this.selected == this.u) {
          this.uVoltageToGroundLabel.xOffset = 40;
          this.uVoltageToGroundLabel.yOffset = -20;
          this.uVoltageToGroundLabel.draw();
        }
        if (this.selected == this.v) {
          this.vVoltageToGroundLabel.xOffset = 40;
          this.vVoltageToGroundLabel.yOffset = 20;
          this.vVoltageToGroundLabel.draw();
        }
      }
    }
    if (this.rotate == 2) {
      strokeCap(SQUARE);
      rectMode(CENTER);
      strokeWeight(wireWeight);

      line(x - 30, y, x - 55.5, y);
      strokeWeight(boarderWeight);
      noFill();
      rect(x, y, 60, 30);
      strokeWeight(wireWeight);
      line(x + 30, y, x + 55.5, y);

      strokeWeight(0.5);
      rect(x - 60, y, 10);
      rect(x + 60, y, 10);
      noStroke();
      fill(0);

      textAlign(CENTER, CENTER);
      textSize(labelTextSize);
      text(this.idLabel, x, y);

      const labels = [
        [this.voltageLabel, 0, 90],
        [this.currentLabel, 0, 70],
        [this.impedanceLabel, 0, 50],
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
          this.vVoltageToGroundLabel.yOffset = 30;
          this.vVoltageToGroundLabel.draw();
        }
      }
    }
    if (this.rotate == 3) {
      strokeCap(SQUARE);
      rectMode(CENTER);
      strokeWeight(wireWeight);

      line(x, y - 30, x, y - 55.5);
      strokeWeight(boarderWeight);
      noFill();
      rect(x, y, 30, 60);
      strokeWeight(wireWeight);
      line(x, y + 30, x, y + 55.5);

      strokeWeight(0.5);
      rect(x, y - 60, 10);
      rect(x, y + 60, 10);
      noStroke();
      fill(0);

      textAlign(CENTER, CENTER);
      textSize(labelTextSize);
      text(this.idLabel, x + 40, y);

      const labels = [
        [this.voltageLabel, 40, 20],
        [this.currentLabel, 40, 0],
        [this.impedanceLabel, 40, -20],
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
          this.uVoltageToGroundLabel.xOffset = 40;
          this.uVoltageToGroundLabel.yOffset = 20;
          this.uVoltageToGroundLabel.draw();
        }
        if (this.selected == this.v) {
          this.vVoltageToGroundLabel.xOffset = 40;
          this.vVoltageToGroundLabel.yOffset = -20;
          this.vVoltageToGroundLabel.draw();
        }
      }
    }
    if (this.rotate == 4) {
      strokeCap(SQUARE);
      rectMode(CENTER);
      strokeWeight(wireWeight);

      line(x - 30, y, x - 55.5, y);
      strokeWeight(boarderWeight);
      noFill();
      rect(x, y, 60, 30);
      strokeWeight(wireWeight);
      line(x + 30, y, x + 55.5, y);

      strokeWeight(0.5);
      rect(x - 60, y, 10);
      rect(x + 60, y, 10);
      noStroke();
      fill(0);

      textAlign(CENTER, CENTER);
      textSize(labelTextSize);
      text(this.idLabel, x, y);

      const labels = [
        [this.voltageLabel, 0, 90],
        [this.currentLabel, 0, 70],
        [this.impedanceLabel, 0, 50],
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
          this.uVoltageToGroundLabel.yOffset = 30;
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
