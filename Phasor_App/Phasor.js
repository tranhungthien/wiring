class Phasor extends Scalable(Rotatable(Draggable(Detectable(Vector)))) {
  draw() {
    noStroke();
    //fill(this.isSelected ? "turquoise" : "cadetblue");
    fill(this.isSelected ? this.secColour : this.priColour);
    this.drawArrow();
    this.drawAngleArc();
    this.drawLabel();
  }

  drawArrow() {
    beginShape();
    for (const p of this.vertices) vertex(p[0], p[1]);
    endShape();
  }

  drawAngleArc() {
    if (this.angle == 0) return;

    noFill();
    stroke(0);

    const a1 = 0.16 * (this.v.x - this.u.x); // new head x
    const a2 = 0.16 * (this.v.y - this.u.y); // new head y
    const r = math.sqrt(math.square(a1) + math.square(a2));

    const th = this.angle < 0 ? this.angle : -this.angle;
    //const th = -this.angle;
    const ux = this.u.x;
    const uy = this.u.y;
    const x = ux + r * cos(th);
    const y = uy + r * sin(th);
    const headLen = 12;
    const headWid = 9;

    arc(ux, uy, 2 * r, 2 * r, th, 0, PIE);
    // Tangent for increasing angle (p5 screen coords: +y down)
    let tx = -sin(th);
    let ty = cos(th);

    // We want the arrow to point "backwards" along the arc (toward the start end),
    // which is the opposite of the increasing-angle direction:
    tx *= -1;
    ty *= -1;

    // Base behind the tip
    const bx = x - headLen * tx;
    const by = y - headLen * ty;

    // Perpendicular for width
    const px = -ty,
      py = tx;

    const lx = bx + (headWid / 2) * px;
    const ly = by + (headWid / 2) * py;
    const rx = bx - (headWid / 2) * px;
    const ry = by - (headWid / 2) * py;

    //noStroke();
    fill(0);
    triangle(x, y, lx, ly, rx, ry);

    line(this.u.x, this.u.y, this.ref.x, this.ref.y);
  }

  drawLabel() {
    const lx = (this.v.x + this.u.x) / 2;
    const ly = (this.v.y + this.u.y) / 2;
    const r = this.phasorAngle.value;

    this.phasorMagnitude.co.x = lx;
    this.phasorMagnitude.co.y = ly;
    this.phasorAngle.co.x = lx;
    this.phasorAngle.co.y = ly;

    if (r >= 0 && r < 45) {
      this.phasorMagnitude.xOffset = 0;
      this.phasorMagnitude.yOffset = 40;
      this.phasorAngle.xOffset = 0;
      this.phasorAngle.yOffset = 20;
    }
    if (r >= 45 && r <= 90) {
      this.phasorMagnitude.xOffset = 30;
      this.phasorMagnitude.yOffset = 40;
      this.phasorAngle.xOffset = 30;
      this.phasorAngle.yOffset = 20;
    }

    if (r > 90 && r <= 120) {
      this.phasorMagnitude.xOffset = 50;
      this.phasorMagnitude.yOffset = 40;
      this.phasorAngle.xOffset = 50;
      this.phasorAngle.yOffset = 20;
    }

    if (r > 120 && r <= 180) {
      this.phasorMagnitude.xOffset = 70;
      this.phasorMagnitude.yOffset = 40;
      this.phasorAngle.xOffset = 70;
      this.phasorAngle.yOffset = 20;
    }

    this.phasorMagnitude.draw();
    this.phasorAngle.draw();
  }
}
