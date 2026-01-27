//===========================================================
//                         Base Class
//  Phasor(Scalable(Rotatable(Draggable(Detectable(Vector))))
//===========================================================
class Vector {
  constructor(magnitude = 150, pc = "teal", sc = "cadetblue") {
    const ux = ox;
    const uy = oy;
    const vx = ox + magnitude;
    const vy = oy;

    this.u = { x: ux, y: uy }; // tail
    this.v = { x: vx, y: vy }; // head
    //this.c = { x: lx, y: ly }; // center
    this.vertices = this.default();
    // Reference line
    this.ref = { x: this.u.x + 80, y: this.u.y };
    this.priColour = pc;
    this.secColour = sc;
    this.magnitude = magnitude;
    this.angle = 0; // radian

    const lx = (vx - ux) / 2;
    const ly = (vy - uy) / 2;
    this.phasorMagnitude = new Label({ x: lx, y: ly }, this.angle, "v̲");
    this.phasorAngle = new Label({ x: lx, y: ly }, this.angle, "°");
    this.phasorMagnitude.value = magnitude;
    this.phasorAngle.value = 0;
  }

  default() {
    const rs = 10;
    const yo = 0.2;
    return [
      [this.u.x, this.u.y],
      [this.u.x, this.u.y - yo * rs],
      [this.v.x - 1.6 * rs, this.v.y - yo * rs],
      [this.v.x - 1.6 * rs, this.v.y - 0.5 * rs],
      [this.v.x, this.v.y],
      [this.v.x - 1.6 * rs, this.v.y + 0.5 * rs],
      [this.v.x - 1.6 * rs, this.v.y + yo * rs],
      [this.u.x, this.u.y + yo * rs],
      [this.u.x, this.u.y],
    ];
  }

  update(dx = 0, dy = 0) {
    for (const v of this.vertices) {
      v[0] += dx;
      v[1] += dy;
    }

    const [ux, uy] = this.vertices[0];
    const [vx, vy] = this.vertices[4];

    this.u.x = ux;
    this.u.y = uy;
    this.v.x = vx;
    this.v.y = vy;

    this.ref.x = ux + 60;
    this.ref.y = uy;
  }
}
