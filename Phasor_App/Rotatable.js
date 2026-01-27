//===========================================================
//                       Phasor Mixin
//  Phasor(Scalable(Rotatable(Draggable(Detectable(Vector))))
//===========================================================
const Rotatable = (Base) =>
  class extends Base {
    constructor(...args) {
      super(...args);
    }
    // this function adds to existing rotation
    rotate(pivot = { x: ox, y: oy }) {
      const rp = this.phasorAngle.value;
      const rr = degrees(this.angle);
      const dr = rp - rr;

      //console.log("inside rotate: ", rp, rr, dr);
      if (rp == rr) return;

      const r = dr > 0 ? dr : -dr;
      const a = dr > 0 ? radians(360 - r) : radians(360 + r);
      const c = Math.cos(a);
      const s = Math.sin(a);
      const R = math.matrix([
        [c, -s],
        [s, c],
      ]);

      const V = math.transpose(math.matrix(this.vertices));
      const P = math.matrix([[pivot.x], [pivot.y]]);
      const Vrot = math.add(math.multiply(R, math.subtract(V, P)), P);

      this.vertices = math.transpose(Vrot).toArray();
      this.update();

      const dx = this.v.x - this.u.x;
      const dy = this.v.y - this.u.y;
      const m = sqrt(sq(dx) + sq(dy));

      this.angle = radians(rp);
      this.phasorMagnitude.value = m;
    }
  };
