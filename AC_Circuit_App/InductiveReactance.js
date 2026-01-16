//==================================================================
//                         Component Mixin
//  InductiveReactance(Component(Rotatable(Draggable(Placeable))))
//==================================================================

const InductiveReactance = (Base) =>
  class extends Base {
    constructor(store, ...args) {
      super(...args);
      this.store = store;
      this.f = store.frequencyHz;
      this._unsub = store.subscribe((f) => {
        this.f = f;
        this.calculateOnChageInL();
      });
      this.calculateOnChageInL();
      this.isSyncing = false;
    }

    get value() {
      if (this.impedanceLabel) return this.impedanceLabel.value;
    }

    destroy() {
      this._unsub?.();
    }

    calculateOnChageInL() {
      this.impedanceLabel.value = math.round(
        TWO_PI * this.f * this.reactiveLabel.value,
        3
      );
    }

    calculateOnChageInXL() {
      this.reactiveLabel.value = math.round(
        this.impedanceLabel.value / (TWO_PI * this.f),
        3
      );
    }

    onChangedL() {
      if (this.isSyncing) return;
      this.isSyncing = true;
      this.calculateOnChageInL();
      this.isSyncing = false;
    }

    onChangedXL() {
      if (this.isSyncing) return;
      this.isSyncing = true;
      this.calculateOnChageInXL();
      this.isSyncing = false;
    }

    simulate() {
      //const u = this.u.voltage;
      //const v = this.v.voltage;
      const u = this.u.id === "GND" ? math.complex(0, 0) : this.u.voltage;
      const v = this.v.id === "GND" ? math.complex(0, 0) : this.v.voltage;

      this.uVoltageToGroundLabel.value = u;
      this.vVoltageToGroundLabel.value = v;

      const x = this.impedanceLabel.value;
      const X = math.complex(0, x);
      const V = math.subtract(u, v);
      this.voltageLabel.value = V;
      this.currentLabel.value = math.divide(V, X);
    }

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
          this.onChangedL();
          this.reactiveLabel.isCommit = false;
          simulate();
        }
        if (this.impedanceLabel.isCommit) {
          this.onChangedXL();
          this.impedanceLabel.isCommit = false;
          simulate();
        }
      }
      //if (key === "d") console.log(this, " has nothing to report");
    }
  };
