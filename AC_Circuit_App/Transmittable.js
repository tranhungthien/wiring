//=============================================
//                   Mix in
//   IdealTransformer(Transmittable(Movable))
//=============================================
const Transmittable = (Base) =>
  class extends Base {
    constructor(...args) {
      super(...args);
      this.dragging = false;
      this.lockAxis = null; // "x", "y", or null
      this.dragOffsetX = 0;
      this.dragOffsetY = 0;
      this.start = null;
      this.end = null;

      this.isSyncing = false;
    }

    updateDragState() {
      if (this.selected == this.c) {
        this.dragOffsetX = relativeCoordinates().x - this.c.x;
        this.dragOffsetY = relativeCoordinates().y - this.c.y;
        this.lockAxis = null; // reset
        this.dragging = true;

        const x = this.c.x;
        const y = this.c.y;
        this.start = { x: x, y: y };
      }
    }

    onChangeInTurns() {
      const pt = this.primaryTurnsLabel.value;
      const st = this.secondaryTurnsLabel.value;
      this._n = pt / st;
    }

    onChangeN1() {
      if (this.isSyncing) return;
      this.isSyncing = true;
      this.onChangeInTurns();
      this.isSyncing = false;
    }

    onChangeN2() {
      if (this.isSyncing) return;
      this.isSyncing = true;
      this.onChangeInTurns();
      this.isSyncing = false;
    }
  };
