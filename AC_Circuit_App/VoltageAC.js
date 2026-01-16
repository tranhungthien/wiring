class VoltageAC extends ActiveAC(Component(Rotatable(Draggable(Placeable)))) {
  draw() {
    let b = color(0, 0, 0);
    noStroke();
    rectMode(CENTER);
    strokeCap(SQUARE);
    this.updateRotation();
    if (!this.isPlaced) {
      this.c.x = relativeCoordinates().x; //snap(mouseX);
      this.c.y = relativeCoordinates().y; //snap(mouseY);
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

    noFill();
    strokeWeight(2);
    ellipse(this.c.x, this.c.y, 58, 58); //62
    strokeWeight(1);
    square(this.u.x, this.u.y, 10);
    square(this.v.x, this.v.y, 10);

    if (this.rotate == 1) {
      strokeWeight(wireWeight);
      line(x, y - 29, x, y - 55.5);
      line(x, y + 29, x, y + 55.5);
      noStroke();

      fill(0);
      textAlign(CENTER, CENTER);
      textSize(20);
      text("+", x, y - 16);
      text("-", x, y + 16);
      textSize(32);
      text("∿", x, y);

      textSize(labelTextSize);
      text(this.idLabel, x + 50, y);

      const labels = [
        [this.voltageLabel, 70, 30],
        [this.currentLabel, 70, 10],
        [this.frequencyLabel, 70, -10],
        [this.phaseLabel, 70, -30],
      ];

      for (const [lbl, x, y] of labels) {
        if (!lbl) continue;
        lbl.xOffset = x;
        lbl.yOffset = y;
        lbl.draw();
      }
    }
    if (this.rotate == 2) {
      strokeWeight(wireWeight);
      line(x - 29, y, x - 55.5, y);
      line(x + 29, y, x + 55.5, y);
      noStroke();

      fill(0);
      textAlign(CENTER, CENTER);
      textSize(20);
      text("+", x - 18, y);
      text("-", x + 18, y);
      textSize(32);
      text("∿", x, y);

      textSize(labelTextSize);
      text(this.idLabel, x, y + 50);

      const labels = [
        [this.voltageLabel, 0, 100],
        [this.currentLabel, 0, 80],
        [this.frequencyLabel, 0, 60],
        [this.phaseLabel, 0, 40],
      ];

      for (const [lbl, x, y] of labels) {
        if (!lbl) continue;
        lbl.xOffset = x;
        lbl.yOffset = y;
        lbl.draw();
      }
    }
    if (this.rotate == 3) {
      strokeWeight(wireWeight);
      line(x, y - 29, x, y - 55.5);
      line(x, y + 29, x, y + 55.5);
      noStroke();

      fill(0);
      textAlign(CENTER, CENTER);
      textSize(20);
      text("-", x, y - 16);
      text("+", x, y + 16);
      textSize(32);
      text("∿", x, y);

      textSize(labelTextSize);
      text(this.idLabel, x + 50, y);

      const labels = [
        [this.voltageLabel, 70, 30],
        [this.currentLabel, 70, 10],
        [this.frequencyLabel, 70, -10],
        [this.phaseLabel, 70, -30],
      ];

      for (const [lbl, x, y] of labels) {
        if (!lbl) continue;
        lbl.xOffset = x;
        lbl.yOffset = y;
        lbl.draw();
      }
    }
    if (this.rotate == 4) {
      strokeWeight(wireWeight);
      line(x - 29, y, x - 55.5, y);
      line(x + 29, y, x + 55.5, y);
      noStroke();

      fill(0);
      textAlign(CENTER, CENTER);
      textSize(20);
      text("-", x - 18, y);
      text("+", x + 18, y);
      textSize(32);
      text("∿", x, y);

      textSize(labelTextSize);
      text(this.idLabel, x, y + 50);

      const labels = [
        [this.voltageLabel, 0, 100],
        [this.currentLabel, 0, 80],
        [this.frequencyLabel, 0, 60],
        [this.phaseLabel, 0, 40],
      ];

      for (const [lbl, x, y] of labels) {
        if (!lbl) continue;
        lbl.xOffset = x;
        lbl.yOffset = y;
        lbl.draw();
      }
    }
    noFill();
  }
}
