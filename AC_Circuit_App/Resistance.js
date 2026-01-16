//========================================================
//                   Component Mixin
//  Resistance(Component(Rotatable(Draggable(Placeable))))
//========================================================

const Resistance = (Base) =>
  class extends Base {
    constructor(...args) {
      super(...args);
    }
    get value() {
      return this.impedanceLabel.value;
    }

    simulate() {
      // const u = this.u.voltage;
      // const v = this.v.voltage;
      const u = this.u.id === "GND" ? math.complex(0, 0) : this.u.voltage;
      const v = this.v.id === "GND" ? math.complex(0, 0) : this.v.voltage;

      this.uVoltageToGroundLabel.value = u;
      this.vVoltageToGroundLabel.value = v;

      const r = this.impedanceLabel.value;
      const R = math.complex(r, 0);
      const V = math.subtract(u, v);
      this.voltageLabel.value = V;
      this.currentLabel.value = math.divide(V, R);
    }

    mousePressed() {
      if (!this.isPlaced) {
        this.isPlaced = true;
      } else if (this.isPlaced) {
        this.updateMouseOver();
        this.updateDragState();
        ["angleLabel", "impedanceLabel", "reactiveLabel"].forEach((k) =>
          this[k]?.mousePressed()
        );
      } else this.selected = null;
    }

    doubleClicked() {}

    keyPressed() {
      if ((key === "r" || key === "R") && keyIsDown(SHIFT)) this.updateRotate();
      if (this.isPlaced) this.impedanceLabel.keyPressed();
      if (this.impedanceLabel.isCommit){
        this.impedanceLabel.isCommit = false;
        simulate();
      }
      //if (key === "d") console.log(this, " has nothing to report");
    }
  };
