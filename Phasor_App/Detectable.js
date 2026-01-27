//===========================================================
//                       Phasor Mixin
//  Phasor(Scalable(Rotatable(Draggable(Detectable(Vector))))
//===========================================================
const Detectable = (Base) =>
  class extends Base {
    constructor(...args) {
      super(...args);
    }

    detect() {
      const verts = this.vertices;
      const px = relativeCoordinates().x;
      const py = relativeCoordinates().y;

      let inside = false;
      for (let i = 0, j = verts.length - 1; i < verts.length; j = i++) {
        const xi = verts[i][0];
        const yi = verts[i][1];
        const xj = verts[j][0];
        const yj = verts[j][1];

        // does the edge cross the horizontal ray to the right of (px,py)?
        const intersect =
          yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;

        if (intersect) inside = !inside;
      }
      return inside;
    }

    keyPressed() {
      this.phasorMagnitude.keyPressed();
      this.phasorAngle.keyPressed();

      // let the label commit prior to change
      if (keyCode === ENTER || keyCode === RETURN) {
        if (this.phasorMagnitude.isCommit) {
          const m = this.phasorMagnitude.value;
          console.log("inside detectable: ", m);
          this.scale(m);
          this.phasorMagnitude.isCommit = false;
        }
        if (this.phasorAngle.isCommit) {
          const dx = this.u.x;
          const dy = this.u.y;
          this.rotate({ x: dx, y: dy });
          this.phasorAngle.isCommit = false;
        }
      }
    }
  };
