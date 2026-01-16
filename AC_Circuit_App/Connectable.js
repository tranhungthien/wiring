//=============================================
//              Wire Base Class
//      Alignable(Updateable(Connectable))
//=============================================
class Connectable {
  constructor() {
    this.vertices = []; // an array of vertices
    this.section = []; // an array of sections
    this.isPlaced = false;
    this.selected = false;
    this.sectionFlag = false;
    this.selectedSection = null;
    this._isProbe = false;
    this.u = null;
    this.v = null;
    this._id = null;
  }
  get id() {
    return this._id;
  }

  get probe() {
    return this._isProbe;
  }

  set id(id) {
    this._id = id;
  }

  set probe(isProbe) {
    this._isProbe = isProbe;
  }

  sectionClicked() {
    if (!this.probe) {
      let tx = relativeCoordinates().x; //snap(mouseX);
      let ty = relativeCoordinates().y; //snap(mouseY);

      // define boundary
      // tx = constrain(tx, 0, width);
      // ty = constrain(ty, 0, height);

      if (this.section.length < 1) return null;
      for (let s of this.section) {
        const yMin = Math.min(s.u.y, s.v.y);
        const yMax = Math.max(s.u.y, s.v.y);
        const xMin = Math.min(s.u.x, s.v.x);
        const xMax = Math.max(s.u.x, s.v.x);
        const vTest = abs(tx - s.u.x) == 0 && ty >= yMin && ty <= yMax;
        const hTest = abs(ty - s.u.y) == 0 && tx >= xMin && tx <= xMax;
        if (vTest || hTest) return s;
      }
      return null;
    }
  }
}
