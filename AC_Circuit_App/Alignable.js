//=============================================
//                 Wire Mixin
//      Alignable(Updateable(Connectable))
//=============================================
const Alignable = (Base) =>
  class extends Base {
    constructor() {
      super();
    }
    updateEnds() {
      if (this.isPlaced) {
        const l = this.section.length - 1;
        const m = this.vertices.length - 1;
        if (this.u && this.section[0]) {
          // const x = relativeCoordinates1(this.u).x;
          // const y = relativeCoordinates1(this.u).y;
          if (this.section[0].orientation == "v") {
            this.vertices[1].x = this.u.x;
          }
          if (this.section[0].orientation == "h") {
            this.vertices[1].y = this.u.y;
          }
        }
        if (this.v) {
          // const x = relativeCoordinates1(this.v).x;
          // const y = relativeCoordinates1(this.v).y;
          if (this.section[l].orientation == "v") {
            this.vertices[m - 1].x = this.v.x;
          }
          if (this.section[l].orientation == "h") {
            this.vertices[m - 1].y = this.v.y;
          }
        }
      }
    }

    mouseDragged() {
      if (this.selectedSection) {
        let mx = relativeCoordinates().x; //snap(mouseX);
        let my = relativeCoordinates().y; //snap(mouseY);
        // define boundary
        // mx = constrain(mx, 0, width);
        // my = constrain(my, 0, height);

        if (this.selectedSection.orientation == "v") {
          this.selectedSection.u.x = mx;
          this.selectedSection.v.x = mx;
        }
        if (this.selectedSection.orientation == "h") {
          this.selectedSection.u.y = my;
          this.selectedSection.v.y = my;
        }
      }
    }
  };
