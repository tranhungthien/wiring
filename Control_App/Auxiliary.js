class Auxiliary extends Placeable {
  constructor(id, x, y) {
    super(x, y, 210, 110);
    this.relayCoil = null;
    this.baseBlock = null;
    this.contacts = null;
    // this.height = 210;
    // this.width = 110;
    this.id = id;
  }
}