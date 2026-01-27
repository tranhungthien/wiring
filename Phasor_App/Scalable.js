//===========================================================
//                       Phasor Mixin
//  Phasor(Scalable(Rotatable(Draggable(Detectable(Vector))))
//===========================================================

const Scalable = (Base) =>
  class extends Base {
    constructor(...args) {
      super(...args);
    }
    scale(magnitude) {
      if (magnitude == this.magnitude) return;
      if (magnitude < 0) {
        this.phasorMagnitude.value = this.magnitude;
        messageBoard.set("Magitude must be > 0");
        return;
      }

      const ax = this.u.x;
      const ay = this.u.y;
      const a = this.phasorAngle.value;
      const diff = magnitude - this.magnitude;

      this.phasorAngle.value = 0;
      this.rotate({ x: ax, y: ay });

      this.v.x += diff;
      this.vertices = this.default();

      this.phasorAngle.value = a;
      this.rotate({ x: ax, y: ay });
      this.magnitude = magnitude;
      //console.log("inside scalable: ", this.v.x);
    }
  };
