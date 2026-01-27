//===========================================================
//                       Phasor Mixin
//  Phasor(Scalable(Rotatable(Draggable(Detectable(Vector))))
//===========================================================
const Draggable = (Base) =>
  class extends Base {
    constructor(...args) {
      super(...args);
      this.isDragging = false;
      this.isSelected = false;
      this.lockAxis = null; // "x", "y", or null
      this._lastX = 0;
      this._lastY = 0;
      this.start = null;
      this.end = null;
    }

    mousePressed() {
      this.phasorMagnitude.mousePressed();
      this.phasorAngle.mousePressed();

      this.isSelected = this.detect();
      if (!this.isSelected) return;

      // Dragg phasor
      const rc = relativeCoordinates();
      this._lastX = rc.x;
      this._lastY = rc.y;

      // for graphical addition
      if (state == "IDLE") activePhasor = this;

      // for abstract addition
      if (state != "IDLE") {
        if (augend && addend) return;
        if (!augend && !addend) {
          augend = this;
          return;
        }
        if (addend && !augend) {
          augend = this;
          return;
        }
        if (augend && !addend) {
          addend = this;
          return;
        }
      }
    }

    mouseDragged() {
      if (!this.isSelected) return;
      const rc = relativeCoordinates();
      const dx = rc.x - this._lastX;
      const dy = rc.y - this._lastY;
      this.update(dx, dy);
      this._lastX = rc.x;
      this._lastY = rc.y;
    }
  };
