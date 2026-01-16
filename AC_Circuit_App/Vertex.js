class Vertex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this._id = "";
    this._voltage = math.complex(0, 0);
  }

  get id() {
    return this._id;
  }

  get voltage() {
    return this._voltage;
  }

  set id(id) {
    this._id = id;
  }

  set voltage(voltage) {
    this._voltage = voltage;
  }
}
