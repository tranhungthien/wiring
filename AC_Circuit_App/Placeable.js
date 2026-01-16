//=============================================
//            Component Base Class
//  Component(Rotatable(Draggable(Placeable)))
//=============================================
class Placeable {
  constructor(x, y, gnd = false) {
    this.c = new Vertex(x, y);
    this.u = null;
    this.v = null;
    this.selected = null;
    this.isPlaced = false;
    this.isSimulate = false;
    this.gnd = gnd;
    if (this.gnd) {
      this.u = new Vertex(x, y - 40);
      this.v = new Vertex(x, y);
    } else {
      this.u = new Vertex(x, y - 60);
      this.v = new Vertex(x, y + 60);
    }
  }
  simulate() {
    this.isSimulate = true;
  }
}
