//======================================================
//                   Component Mixin
//  Active(Component(Rotatable(Draggable(Placeable))))
//======================================================
const Earthing = (Base) =>
  class extends Base {
    constructor(...args) {
      super(...args);
    }
    get value() {
      return this.value;
    }

    set value(value) {
      this.value = value;
    }

    simulate() {
      return;
    }

    reset() {
      return;
    }

    mousePressed() {
      if (!this.isPlaced) {
        this.isPlaced = true;
      } else if (this.isPlaced) {
        this.updateMouseOver();
        this.updateDragState();
      } else this.selected = null;
    }

    doubleClicked() {}

    keyPressed() {}
  };
