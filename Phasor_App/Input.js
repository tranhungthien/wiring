//=============================================
//              Label Base Class
//         Selectable(Editable(Input))
//=============================================
class Input {
  constructor(
    co,
    value,
    unit = "",
    leftTextAlignment = true,
    px = 17,
    colour = "black"
  ) {
    this.co = co;
    this.value = value;
    this.unit = unit;
    this.textSizePx = px;
    this.colour = colour;
    this.xOffset = 0;
    this.yOffset = 0;
    this.leftTextAlignment = leftTextAlignment;
  }

  // polarForm() {
  //   const mag = this.value;
  //   const sdeg = this.angle;
  //   const smag = toEngineering(math.round(mag, 3));
  //   return `${smag}∠${sdeg}°`;
  // }
}
