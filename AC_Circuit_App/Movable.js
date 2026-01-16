//=============================================
//                 Base Class
//         IdealTransformer(Movable)
//=============================================
class Movable {
  constructor(x, y, N1, N2) {
    //Component(Draggable(Placeable));
    this.c = new Vertex(x, y);
    this.p = new Placeable(x - 20, y); // primary
    this.s = new Placeable(x + 20, y); // secondary
    this._n = 1; // N1/N2, Np/Ns

    this.selected = null;
    this.isPlaced = false;
    this.isSimulate = false;

    this._id = null;
    this._idLabel = null;
    this._isProbing = false;
    this.rotate = 1;

    this.primaryVoltageLabel = new Label(this.c, 0, "Vₚ", true);
    this.primaryCurrentLabel = new Label(this.c, 0, "Iₚ", true);
    this.secondaryVoltageLabel = new Label(this.c, 0, "Vₛ", true, false);
    this.secondaryCurrentLabel = new Label(this.c, 0, "Iₛ", true, false);
    this.primaryTurnsLabel = new Label(this.c, N1, "Nₚ", false);
    this.secondaryTurnsLabel = new Label(this.c, N2, "Nₛ", false);
  }

  get id() {
    return this._id;
  }

  get idLabel() {
    return this._idLabel;
  }

  get n() {
    const pt = this.primaryTurnsLabel.value;
    const st = this.secondaryTurnsLabel.value;
    this._n = pt / st;
    return this._n;
  }

  get pt() {
    return this.primaryTurnsLabel.value;
  }

  get st() {
    return this.secondaryTurnsLabel.value;
  }

  get probe() {
    return this._isProbing;
  }

  set id(id) {
    this._id = id;
  }

  set idLabel(label) {
    this._idLabel = label;
  }

  set probe(isProbing) {
    this._isProbing = isProbing;
  }

  set pt(pt) {
    this.primaryTurnsLabel.value = pt;
  }

  set st(st) {
    this.secondaryTurnsLabel.value = st;
  }

  updateMouseOver() {
    const cs = 50; // center size
    const ts = 20; // terminal size
    const mx = relativeCoordinates().x; //snap(mouseX);
    const my = relativeCoordinates().y; //snap(mouseY);
    this.p.c.x = this.c.x - 20;
    this.p.c.y = this.c.y;
    this.s.c.x = this.c.x + 20;
    this.s.c.y = this.c.y;
    if (
      mx > this.c.x - cs / 2 &&
      mx < this.c.x + cs / 2 &&
      my > this.c.y - cs / 2 &&
      my < this.c.y + cs / 2
    ) {
      this.selected = this.c;
    } else if (
      mx > this.p.u.x - ts / 2 &&
      mx < this.p.u.x + ts / 2 &&
      my > this.p.u.y - ts / 2 &&
      my < this.p.u.y + ts / 2
    ) {
      this.selected = this.p.u;
      activeTerminal = this.p.u;
    } else if (
      mx > this.p.v.x - ts / 2 &&
      mx < this.p.v.x + ts / 2 &&
      my > this.p.v.y - ts / 2 &&
      my < this.p.v.y + ts / 2
    ) {
      this.selected = this.p.v;
      activeTerminal = this.p.v;
    } else if (
      mx > this.s.u.x - ts / 2 &&
      mx < this.s.u.x + ts / 2 &&
      my > this.s.u.y - ts / 2 &&
      my < this.s.u.y + ts / 2
    ) {
      this.selected = this.s.u;
      activeTerminal = this.s.u;
    } else if (
      mx > this.s.v.x - ts / 2 &&
      mx < this.s.v.x + ts / 2 &&
      my > this.s.v.y - ts / 2 &&
      my < this.s.v.y + ts / 2
    ) {
      this.selected = this.s.v;
      activeTerminal = this.s.v;
    } else this.selected = null;
  }

  updateRotation() {
    if (!this.gnd) {
      if (this.rotate == 1) {
        this.p.u.x = this.c.x - 20;
        this.p.u.y = this.c.y - 60;
        this.p.v.x = this.c.x - 20;
        this.p.v.y = this.c.y + 60;

        this.s.u.x = this.c.x + 20;
        this.s.u.y = this.c.y - 60;
        this.s.v.x = this.c.x + 20;
        this.s.v.y = this.c.y + 60;

        // to keep consistency
        this.p.c.x = this.c.x - 20;
        this.s.c.x = this.c.x + 20;
        this.p.c.y = this.c.y;
        this.s.c.y = this.c.y;
      }

      //       if (this.rotate == 2) {
      //         this.u.x = this.c.x - 60;
      //         this.u.y = this.c.y;
      //         this.v.x = this.c.x + 60;
      //         this.v.y = this.c.y;
      //       }

      //       if (this.rotate == 3) {
      //         this.u.x = this.c.x;
      //         this.u.y = this.c.y + 60;
      //         this.v.x = this.c.x;
      //         this.v.y = this.c.y - 60;
      //       }

      //       if (this.rotate == 4) {
      //         this.u.x = this.c.x + 60;
      //         this.u.y = this.c.y;
      //         this.v.x = this.c.x - 60;
      //         this.v.y = this.c.y;
      //       }
    }
  }

  updateRotate() {
    if (!this.isPlaced || this.selected) this.rotate++;
    if (this.rotate > 4) this.rotate = 1;
  }

  simulate() {
    const z = math.complex(0, 0);
    const pu = this.p.u.id === "GND" ? z : this.p.u.voltage;
    const pv = this.p.v.id === "GND" ? z : this.p.v.voltage;
    const su = this.s.u.id === "GND" ? z : this.s.u.voltage;
    const sv = this.s.v.id === "GND" ? z : this.s.v.voltage;

    const vp = math.subtract(pu, pv);
    const vs = math.subtract(su, sv);

    this.primaryVoltageLabel.value = vp;
    this.secondaryVoltageLabel.value = vs;
  }

  reset() {
    const z = math.complex(0, 0);
    this.p.u.id = "";
    this.p.v.id = "";
    this.s.u.id = "";
    this.s.v.id = "";
    this.p.u.voltage = z;
    this.p.v.voltage = z;
    this.s.u.voltage = z;
    this.s.v.voltage = z;
    this.primaryVoltageLabel.value = z;
    this.primaryCurrentLabel.value = z;
    this.secondaryVoltageLabel.value = z;
    this.secondaryCurrentLabel.value = z;
  }
}
