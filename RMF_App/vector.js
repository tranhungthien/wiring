class vector {
  constructor(xi, yi, xf, yf) {
    this.xi = xi;
    this.yi = yi;
    this.xf = xf;
    this.yf = yf;
  }

  add(v) {
    return new vector(
      this.xi + v.xi,
      this.yi + v.yi,
      this.xf + v.xf,
      this.yf + v.yf
    );
  }
  
  scale(s){
    const xf = this.xf - this.xi;
    const yf = this.yf - this.yi;
    this.xf = s * xf + this.xi;
    this.yf = s * yf + this.yi;
  }

  magnitude() {
    const dx = this.xf - this.xi;
    const dy = this.yf - this.yi;
    return sqrt(dx * dx + dy * dy);
  }

  direction() {
    const dx = this.xf - this.xi;
    const dy = this.yf - this.yi;
    return atan2(dy, dx); // now +90 is up, -90 is down
  }

  draw(colour) {
    push();
    stroke(colour);
    strokeWeight(3);
    fill(colour);

    const dx = this.xf - this.xi;
    const dy = this.yf - this.yi;
    const arrowSize = 10;

    // move to tail
    translate(this.xi, this.yi);

    // draw shaft in local coordinates
    line(0, 0, dx, dy);

    // rotate local x-axis to vector direction
    rotate(this.direction());

    // move near the tip
    translate(this.magnitude() - arrowSize, 0);

    // draw arrowhead pointing along +x in local frame
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);

    pop();
  }
}

function resultant(u, v) {
  return new vector(u.xi + v.xi, u.yi + v.yi, u.xf + v.xf, u.yf + v.yf);
}

function headTail(u, v) {
  return new vector(u.xf, u.yf, u.xf + v.xf, u.yf + v.yf);
}
