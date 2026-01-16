//=============================================
//               Component Mixin
//  Component(Rotatable(Draggable(Placeable)))
//=============================================
const Draggable = (Base) =>
  class extends Base {
    constructor(...args) {
      super(...args);
      this.dragging = false;
      this.lockAxis = null; // "x", "y", or null
      this.dragOffsetX = 0;
      this.dragOffsetY = 0;
      this.start = null;
      this.end = null;
    }

    updateMouseOver() {
      const cs = 50; // center size
      const ts = 20; // terminal size
      const mx = relativeCoordinates().x; //snap(mouseX);
      const my = relativeCoordinates().y; //snap(mouseY);
      if (
        mx > this.c.x - cs / 2 &&
        mx < this.c.x + cs / 2 &&
        my > this.c.y - cs / 2 &&
        my < this.c.y + cs / 2
      ) {
        this.selected = this.c;
      } else if (
        mx > this.u.x - ts / 2 &&
        mx < this.u.x + ts / 2 &&
        my > this.u.y - ts / 2 &&
        my < this.u.y + ts / 2
      ) {
        this.selected = this.u;
        activeTerminal = this.u;
      } else if (
        mx > this.v.x - ts / 2 &&
        mx < this.v.x + ts / 2 &&
        my > this.v.y - ts / 2 &&
        my < this.v.y + ts / 2
      ) {
        this.selected = this.v;
        activeTerminal = this.v;
      } else this.selected = null;
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

    mouseDragged() {
      if (!this.dragging) return;
      const threshold = 5;
      const dox = this.dragOffsetX;
      const doy = this.dragOffsetY;
      const dx = relativeCoordinates().x - (this.c.x + dox);
      const dy = relativeCoordinates().y - (this.c.y + doy);
      // decide which direction to lock
      if (this.lockAxis === null) {
        if (abs(dx) > threshold) this.lockAxis = "h";
        if (abs(dy) > threshold) this.lockAxis = "v";
      }
      // move the box based on locked axis
      if (this.lockAxis === "h") {
        this.c.x = snap(relativeCoordinates().x - dox);
      } else if (this.lockAxis === "v") {
        this.c.y = snap(relativeCoordinates().y - doy);
      }
      this.c.x = constrain(this.c.x, 0, width);
      this.c.y = constrain(this.c.y, 0, height);
    }

    mouseReleased() {
      this.dragging = false;
      this.lockAxis = null;

      const x = this.c.x;
      const y = this.c.y;
      this.end = { x: x, y: y };
      if (
        this.start == null ||
        (this.end.x == this.start.x && this.end.y == this.start.y)
      )
        return;
      const cmd = new DraggCMD(this, this.start, this.end);
      history.execute(cmd);
      //console.log(this.start, this.end);
      this.end = null;
      this.start = null;
    }
  };

// need another place for this
const DraggableClass = Draggable(Placeable);
