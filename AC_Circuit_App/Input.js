//=============================================
//              Label Base Class
//         Selectable(Editable(Input))
//=============================================
class Input {
  constructor(
    co,
    value,
    unit,
    isPolar = false,
    leftTextAlignment = true,
    px = 17,
    colour = "black"
  ) {
    this.co = co;
    this._isPolar = isPolar;
    this.value = isPolar ? math.complex(value, 0) : value;
    this.unit = unit; // "V", "ohm", "angle", "H", "F"
    this.textSizePx = px;
    this.colour = colour;
    this.xOffset = 0;
    this.yOffset = 0;
    this.leftTextAlignment = leftTextAlignment;
  }
  get isPolar() {
    return this._isPolar;
  }
  set isPolar(isPolar) {
    this._isPolar = isPolar;
  }

  convertToPolar() {
    if (!(this.value instanceof math.Complex)) return false;

    const i = this.value.toPolar();
    const deg = math.unit(i.phi, "rad").toNumber("deg");
    const mag = i.r;
    const sdeg = math.round(deg, 3).toString();
    const smag = toEngineering(math.round(mag, 3));
    return `${smag}∠${sdeg}°`;
  }
}
