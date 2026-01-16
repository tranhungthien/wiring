//========================================================
//                   Component Mixin
//  ActiveAC(Component(Rotatable(Draggable(Placeable))))
//========================================================
const ActiveAC = (Base) =>
  class extends Base {
    constructor(store, ...args) {
      super(...args);
      this.store = store;
      this.frequencyLabel.value = store.frequencyHz;
      this._unsub = store.subscribe((f) => {
        this.frequencyLabel.value = f;
      });
      this.phaseLabel.value = 0;
    }

    get value() {
      const mag = this.voltageLabel.value;
      const deg = this.phaseLabel.value;
      const rad = math.unit(deg, "deg").toNumber("rad");
      return math.complex({ r: mag, phi: rad });
    }

    simulate() {
      return;
    }

    // reset() {
    //   this.u.id = "";
    //   this.v.id = "";
    //   this.u.voltage = math.complex(0, 0);
    //   this.v.voltage = math.complex(0, 0);
    //   this.currentLabel.value = math.complex(0, 0);
    // }

    mousePressed() {
      if (!this.isPlaced) {
        this.isPlaced = true;
      } else if (this.isPlaced) {
        this.updateMouseOver();
        this.updateDragState();
        ["frequencyLabel", "phaseLabel"].forEach((k) =>
          this[k]?.mousePressed()
        );
        if (this.unit == "v") this.voltageLabel.mousePressed();
      } else this.selected = null;
    }

    doubleClicked() {}

    keyPressed() {
      if ((key === "r" || key === "R") && keyIsDown(SHIFT)) this.updateRotate();
      if (this.isPlaced)
        ["frequencyLabel", "phaseLabel", "voltageLabel"].forEach((k) =>
          this[k]?.keyPressed()
        );
      if (this.frequencyLabel.isCommit) {
        store.setFrequencyHz(this.frequencyLabel.value);
        this.frequencyLabel.isCommit = false;
        simulate();
        return;
      }
      if (this.voltageLabel.isCommit || this.phaseLabel.isCommit) {
        this.voltageLabel.isCommit = false;
        this.phaseLabel.isCommit = false;
        simulate();
        return;
      }
      //if (key === "d") console.log(this, " has nothing to report");
    }
  };
