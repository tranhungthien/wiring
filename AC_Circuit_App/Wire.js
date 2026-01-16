//==================================================
//        Alignable(Updateable(Connectable))
//                      NOTES
//    • works just as well if vertices were swapped
//      for {x:a, y:b}
//==================================================

class Wire extends Alignable(Updateable(Connectable)) {
  draw() {
    this.updateEnds();
    // draw wire
    if (this.vertices.length > 0) {
      noFill();
      strokeWeight(2);
      stroke(this.selected? color(255, 128, 128) : color(0));
      beginShape();
      const pts = this.vertices.map((w) => [w.x, w.y]);
      for (const pt of pts) vertex(pt[0], pt[1]);
      endShape();
      this.drawEndPointSquares();
    }
    // draw selected section
    if (this.selectedSection) {
      const ux = this.selectedSection.u.x;
      const vx = this.selectedSection.v.x;
      const uy = this.selectedSection.u.y;
      const vy = this.selectedSection.v.y;
      strokeWeight(2);
      stroke(255, 128, 128);
      line(ux, uy, vx, vy);
    }
    // draw wire guide
    if (!this.isPlaced && this.vertices.length != 0) {
      const idx = this.vertices.length - 1;
      const ax = this.vertices[idx].x;
      const ay = this.vertices[idx].y;
      const bx = relativeCoordinates().x; //snap(mouseX);
      const by = relativeCoordinates().y; //snap(mouseY);
      strokeWeight(2);
      if (abs(mouseX - ax) > abs(mouseY - ay)) line(ax, ay, bx, ay);
      if (abs(mouseX - ax) < abs(mouseY - ay)) line(ax, ay, ax, by);
      this.drawCrosshair();
    }
  }

  drawEndPointSquares() {
    // endpoint squares only
    stroke(0);
    strokeWeight(1);
    //fill(this.selected ? 255 : 245);
    fill(255, 128);
    const last = this.vertices[this.vertices.length - 1];
    const first = this.vertices[0];
    square(first.x, first.y, 6);
    if (last !== first) square(last.x, last.y, 6);
  }

  drawCrosshair() {
    let gx = relativeCoordinates().x; //snap(mouseX);
    let gy = relativeCoordinates().y; //snap(mouseY);
    let c = color(255);
    c.setAlpha(85);

    // define boundary
    gx = constrain(gx, 0, width);
    gy = constrain(gy, 0, height);

    // cross hair
    stroke(c);
    strokeWeight(4);
    line(0, gy, width, gy);
    line(gx, 0, gx, height);

    // centre mark
    stroke(0);
    strokeWeight(1);
    rectMode(CENTER);
    rect(gx, gy, 10);
    //circle(gx, gy, 12);
  }
}
