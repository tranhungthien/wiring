//=============================================
//               Component Mixin 
//  Component(Rotatable(Draggable(Placeable)))
//=============================================
const Rotatable = (Base) =>
  class extends Base {
    constructor(...args) {
      super(...args);
      this.rotate = 1;
    }

    updateRotation() {
      if (!this.gnd) {
        if (this.rotate == 1) {
          this.u.x = this.c.x;
          this.u.y = this.c.y - 60;
          this.v.x = this.c.x;
          this.v.y = this.c.y + 60;
        }

        if (this.rotate == 2) {
          this.u.x = this.c.x - 60;
          this.u.y = this.c.y;
          this.v.x = this.c.x + 60;
          this.v.y = this.c.y;
        }

        if (this.rotate == 3) {
          this.u.x = this.c.x;
          this.u.y = this.c.y + 60;
          this.v.x = this.c.x;
          this.v.y = this.c.y - 60;
        }

        if (this.rotate == 4) {
          this.u.x = this.c.x + 60;
          this.u.y = this.c.y;
          this.v.x = this.c.x - 60;
          this.v.y = this.c.y;
        }
      }
      if (this.gnd) {
        this.u.x = this.c.x;
        this.u.y = this.c.y - 40;
        this.v.x = this.c.x;
        this.v.y = this.c.y + 40;
      }
    }

    updateRotate() {
      if (!this.isPlaced || this.selected) this.rotate++;
      if (this.rotate > 4) this.rotate = 1;
    }
  };
