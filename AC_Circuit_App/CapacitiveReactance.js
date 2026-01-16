//==================================================================
//                   Component Mixin
//  CapacitiveReactance(Component(Rotatable(Draggable(Placeable))))
//==================================================================

const CapacitiveReactance = (Base) =>
  class extends Base {
    constructor(store, ...args) {
      super(...args);
      this.store = store;
      this.f = store.frequencyHz;
      this._unsub = store.subscribe((f) => {
        this.f = f;
        this.calculateOnChageInC();
      });
      this.calculateOnChageInC();
      this.isSyncing = false;
    }

    get value() {
      if (this.impedanceLabel) return this.impedanceLabel.value;
    }

    destroy() {
      this._unsub?.();
    }

    calculateOnChageInC() {
      // change the impedance on change in capacitance.
      this.impedanceLabel.value = math.round(
        1 / (TWO_PI * this.f * this.reactiveLabel.value),
        3
      );
    }

    calculateOnChageInXC() {
      // change the capacitance on change in reactance.
      this.reactiveLabel.value = math.round(
        1 / (TWO_PI * this.f * this.impedanceLabel.value),
        3
      );
    }

    onChangedC() {
      if (this.isSyncing) return;
      this.isSyncing = true;
      this.calculateOnChageInC();
      this.isSyncing = false;
    }

    onChangedXC() {
      if (this.isSyncing) return;
      this.isSyncing = true;
      this.calculateOnChageInXC();
      this.isSyncing = false;
    }

    simulate() {
      const u = this.u.id === "GND" ? math.complex(0, 0) : this.u.voltage;
      const v = this.v.id === "GND" ? math.complex(0, 0) : this.v.voltage;
      const x = this.impedanceLabel.value;
      const X = math.complex(0, -x);
      const V = math.subtract(u, v);

      this.uVoltageToGroundLabel.value = u;
      this.vVoltageToGroundLabel.value = v;
      this.voltageLabel.value = V;
      this.currentLabel.value = math.divide(V, X);
      //console.log("here: ", this, this.voltageLabel.value, this.currentLabel.value);
    }

    // reset() {
    //   this.u.id = "";
    //   this.v.id = "";
    //   this.u.voltage = math.complex(0, 0);
    //   this.v.voltage = math.complex(0, 0);
    // }

    mousePressed() {
      if (!this.isPlaced) {
        this.isPlaced = true;
      } else if (this.isPlaced) {
        this.updateMouseOver();
        this.updateDragState();
        ["impedanceLabel", "reactiveLabel"].forEach((k) =>
          this[k]?.mousePressed()
        );
      } else this.selected = null;
    }

    doubleClicked() {}

    keyPressed() {
      if ((key === "r" || key === "R") && keyIsDown(SHIFT)) {
        this.updateRotate();
      }
      if (this.isPlaced) {
        ["impedanceLabel", "reactiveLabel"].forEach((k) =>
          this[k]?.keyPressed()
        );
      }
      // let the label commit prior to change
      if (keyCode === ENTER || keyCode === RETURN) {
        if (this.reactiveLabel.isCommit) {
          this.onChangedC();
          this.reactiveLabel.isCommit = false;
          simulate();
        }
        if (this.impedanceLabel.isCommit) {
          this.onChangedXC();
          this.impedanceLabel.isCommit = false;
          simulate();
        }
      }
      //if (key === "d") console.log(this, " has nothing to report");
    }
  };
