//=============================================
//                 Wire Mixin
//      Alignable(Updateable(Connectable))
//=============================================
const Updateable = (Base) =>
  class extends Base {
    constructor() {
      super();
    }
    reset() {
      if (this.u) this.u.id = "";
      if (this.v) this.v.id = "";
    }
    mousePressed() {
      if (!this.isPlaced) {
        const x = relativeCoordinates().x; //snap(mouseX);
        const y = relativeCoordinates().y; //snap(mouseY);
        this.vertices.push(new Vertex(x, y));
        let orientation = null;
        if (activeTerminal) {
          if (!this.u) {
            this.vertices.pop();
            this.u = activeTerminal;
            this.vertices.push(this.u);
            activeTerminal = null;
            return;
          }
          if (!this.v) {
            const idx = this.vertices.length;
            const prev = this.vertices[idx - 2];
            const curr = this.vertices[idx - 1];
            orientation = x === prev.x ? "v" : y === prev.y ? "h" : null;
            this.vertices.pop();
            if (orientation) {
              this.v = activeTerminal;
              this.vertices.push(this.v);
              this.section.push(new Section(prev, this.v, orientation));
              activeTerminal = null;
              this.isPlaced = true;
              return;
            }
            activeTerminal = null;
            return;
          }
        }
        const idx = this.vertices.length;
        if (idx > 1) {
          const prev = this.vertices[idx - 2];
          const curr = this.vertices[idx - 1];
          orientation = x === prev.x ? "v" : y === prev.y ? "h" : null;
          if (orientation) {
            this.section.push(new Section(prev, curr, orientation));
          } else this.vertices.pop();
        }
      }
      if (this.isPlaced) {
        this.selectedSection = this.sectionClicked();
        // console.log(this.vertices);
        // console.log(this.section);
      }
      this.selected = false;
    }
    mouseReleased() {
      if (this.u && this.v)
        if (this.section.length === 1) {
          const ax = this.vertices[0].x;
          const bx = this.vertices[1].x;
          const ay = this.vertices[0].y;
          const by = this.vertices[1].y;
          const o = this.section[0].orientation;
          const midx = (ax + bx) / 2;
          const midy = (ay + by) / 2;

          const roundToNearest20 = (x) =>
            math.multiply(20, math.round(math.divide(x, 20)));

          const x = roundToNearest20(midx);
          const y = roundToNearest20(midy);
          let orientation = null;
          // console.log("wire mid values: ", x, y);
          // console.log("wire end 1: ", this.vertices[0].x, this.vertices[0].y);
          // console.log("wire end 2: ", this.vertices[1].x, this.vertices[1].y);
          this.vertices.splice(1, 0, new Vertex(x, y));
          this.vertices.splice(2, 0, new Vertex(x, y));
          if (o == "h") orientation = "v";
          if (o == "v") orientation = "h";
          this.section.length = 0;
          this.section.push(new Section(this.u, this.vertices[1], o));
          this.section.push(
            new Section(this.vertices[1], this.vertices[2], orientation)
          );
          this.section.push(new Section(this.vertices[2], this.v, o));
        }
    }

    doubleClicked() {
      if (this.sectionClicked()) this.selected = true;
      else this.selected = false;
    }

    keyPressed() {
      if (key === "e") {
        if (!this.v) this.v = this.vertices[this.vertices.length - 1];
        this.isPlaced = true;
      }
    }
  };
