//=============================================
//                   Mix in
//   IdealTransformer(Transmittable(Movable))
//=============================================
const IdealTransformer = (Base) =>
  class extends Base {
    constructor(...args) {
      super(...args);
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
      // console.log(this.start, this.end);
      history.execute(cmd);

      this.end = null;
      this.start = null;
    }

    mousePressed() {
      if (!this.isPlaced) {
        this.isPlaced = true;
      } else if (this.isPlaced) {
        this.updateMouseOver();
        this.updateDragState();
        ["primaryTurnsLabel", "secondaryTurnsLabel"].forEach((k) =>
          this[k]?.mousePressed()
        );
      } else this.selected = null;
    }

    doubleClicked() {}

    keyPressed() {
      // let the label commit prior to change
      if (this.isPlaced) {
        ["primaryTurnsLabel", "secondaryTurnsLabel"].forEach((k) =>
          this[k]?.keyPressed()
        );
      }
      if (keyCode === ENTER || keyCode === RETURN) {
        if (this.primaryTurnsLabel.isCommit) {
          this.onChangeN1();
          this.primaryTurnsLabel.isCommit = false;
          simulate();
        }
        if (this.secondaryTurnsLabel.isCommit) {
          this.onChangeN2();
          this.secondaryTurnsLabel.isCommit = false;
          simulate();
        }
      }
    }
  };
